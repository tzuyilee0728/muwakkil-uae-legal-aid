
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, File } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface KnowledgeItem {
  id: string;
  name: string;
  filePath?: string;
  content?: string;
  type: 'text' | 'file';
}

const KnowledgePage: React.FC = () => {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [knowledgeText, setKnowledgeText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [knowledgeName, setKnowledgeName] = useState('');

  // Load items from localStorage on component mount
  useEffect(() => {
    const storedItems = localStorage.getItem('knowledgeItems');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  // Save items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('knowledgeItems', JSON.stringify(items));
  }, [items]);

  const handleAddKnowledge = () => {
    const itemName = knowledgeName.trim() || `Knowledge ${items.length + 1}`;

    if (selectedFile) {
      const newItem: KnowledgeItem = {
        id: Date.now().toString(),
        name: itemName,
        filePath: URL.createObjectURL(selectedFile),
        type: 'file'
      };
      setItems([...items, newItem]);
    } else if (knowledgeText) {
      const newItem: KnowledgeItem = {
        id: Date.now().toString(),
        name: itemName,
        content: knowledgeText,
        type: 'text'
      };
      setItems([...items, newItem]);
    }
    
    setShowAddModal(false);
    setKnowledgeText('');
    setSelectedFile(null);
    setKnowledgeName('');
  };

  const handleDeleteItem = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      // Use file name as default item name if no custom name is provided
      if (!knowledgeName) {
        setKnowledgeName(e.target.files[0].name);
      }
    }
  };

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-4xl mx-auto">
        {items.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-semibold">Knowledge</h1>
                <p className="text-gray-500 dark:text-gray-400">Knowledge help Waha understand the context of your question.</p>
              </div>
              <button 
                onClick={() => setShowAddModal(true)} 
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-2 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <Plus size={24} />
              </button>
            </div>

            {/* Knowledge items */}
            <div className="space-y-4">
              {items.map(item => (
                <Card key={item.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-12 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                      </div>
                      <span className="dark:text-gray-200 font-medium">{item.name}</span>
                    </div>
                    <button onClick={() => handleDeleteItem(item.id)} className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400">
                      <Trash2 size={20} />
                    </button>
                  </div>
                  
                  {/* Content preview */}
                  <div className="px-4 pb-4">
                    {item.type === 'text' && item.content && (
                      <ScrollArea className="h-40 rounded-md border p-2 bg-gray-50 dark:bg-gray-900">
                        <div className="p-2">
                          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                            {item.content}
                          </p>
                        </div>
                      </ScrollArea>
                    )}
                    
                    {item.type === 'file' && item.filePath && (
                      <div className="mt-2">
                        <div className="flex items-center gap-2 mb-2">
                          <File size={16} className="text-gray-500" />
                          <span className="text-sm text-gray-500">File preview</span>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-2 border">
                          {item.filePath.toLowerCase().endsWith('.pdf') ? (
                            <div className="flex items-center justify-center h-40 bg-gray-100 dark:bg-gray-800 rounded">
                              <p className="text-sm text-gray-500">PDF Document</p>
                            </div>
                          ) : item.filePath.match(/\.(jpeg|jpg|png|gif|webp)$/i) ? (
                            <div className="h-40">
                              <AspectRatio ratio={16/9} className="bg-gray-100 dark:bg-gray-800">
                                <img 
                                  src={item.filePath} 
                                  alt={`Preview of ${item.name}`}
                                  className="object-contain w-full h-full rounded"
                                />
                              </AspectRatio>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center h-40 bg-gray-100 dark:bg-gray-800 rounded">
                              <p className="text-sm text-gray-500">Document preview not available</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="mb-4 text-gray-500 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <h2 className="text-xl font-medium mb-2">No Knowledge Items Yet</h2>
            <p className="text-gray-500 dark:text-gray-400 text-center mb-6">Add documents to help Waha understand your context better</p>
            <button onClick={() => setShowAddModal(true)} className="flex items-center px-4 py-2 bg-muwakkil-purple text-white rounded-md hover:bg-purple-600">
              <Plus size={18} className="mr-2" />
              <span className="text-slate-50">Add Knowledge</span>
            </button>
          </div>
        )}
      </div>

      {/* Add Knowledge Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Add Knowledge</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name (Optional)</label>
                <input
                  type="text"
                  value={knowledgeName}
                  onChange={(e) => setKnowledgeName(e.target.value)}
                  placeholder="Enter a name for this knowledge item"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-muwakkil-purple dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              
              <Tabs defaultValue="text" className="mb-4">
                <TabsList className="mb-2 w-full">
                  <TabsTrigger value="text" className="flex-1">Add Text</TabsTrigger>
                  <TabsTrigger value="file" className="flex-1">Upload File</TabsTrigger>
                </TabsList>
                
                <TabsContent value="text">
                  <textarea 
                    value={knowledgeText} 
                    onChange={e => setKnowledgeText(e.target.value)} 
                    className="w-full h-40 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-muwakkil-purple dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                    placeholder="Add text content..."
                  ></textarea>
                </TabsContent>
                
                <TabsContent value="file">
                  <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                       onClick={() => document.getElementById('file-upload')?.click()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2 text-gray-500 dark:text-gray-400">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedFile ? selectedFile.name : "Click to select a file"}
                    </span>
                    <input 
                      id="file-upload" 
                      type="file" 
                      className="hidden" 
                      onChange={handleFileChange} 
                    />
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end space-x-2">
                <button 
                  onClick={() => setShowAddModal(false)} 
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddKnowledge} 
                  className="px-4 py-2 bg-muwakkil-purple text-white rounded-md hover:bg-purple-600" 
                  disabled={(!selectedFile && !knowledgeText.trim())}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgePage;
