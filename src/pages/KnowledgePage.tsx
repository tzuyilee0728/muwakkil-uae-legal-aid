
import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface KnowledgeItem {
  id: string;
  name: string;
  filePath?: string;
}

const KnowledgePage: React.FC = () => {
  const [items, setItems] = useState<KnowledgeItem[]>([
    { 
      id: '1', 
      name: 'Nakhla\'s_company_document_Dubai.pdf',
      filePath: '/path/to/document.pdf'
    }
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [knowledgeText, setKnowledgeText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleAddKnowledge = () => {
    // In a real app, this would upload the file or save the text to the server
    if (selectedFile) {
      setItems([...items, { 
        id: Date.now().toString(), 
        name: selectedFile.name,
        filePath: URL.createObjectURL(selectedFile)
      }]);
    } else if (knowledgeText) {
      setItems([...items, { 
        id: Date.now().toString(), 
        name: `Knowledge ${items.length + 1}`,
      }]);
    }
    
    setShowAddModal(false);
    setKnowledgeText('');
    setSelectedFile(null);
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Knowledge</h1>
            <p className="text-gray-500">Knowledge help Waha understand the context of your question.</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-white border border-gray-200 rounded-full p-2 hover:bg-gray-50"
          >
            <Plus size={24} />
          </button>
        </div>

        {/* Knowledge items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between"
            >
              <div className="flex items-center">
                <div className="w-10 h-12 bg-gray-100 rounded flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <span>{item.name}</span>
              </div>
              <button
                onClick={() => handleDeleteItem(item.id)}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}

          {items.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No knowledge items added yet. Add your first document or note.
            </div>
          )}
        </div>
      </div>

      {/* Add Knowledge Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Add Knowledge</h2>
              
              <div className="mb-4">
                <textarea
                  value={knowledgeText}
                  onChange={(e) => setKnowledgeText(e.target.value)}
                  className="w-full h-40 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-muwakkil-purple"
                  placeholder="Add something..."
                ></textarea>
              </div>
              
              <div className="mb-6">
                <button 
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <span>Upload</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </button>
                {selectedFile && (
                  <div className="mt-2 text-sm text-gray-600">
                    Selected: {selectedFile.name}
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-2">
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddKnowledge}
                  className="px-4 py-2 bg-muwakkil-purple text-white rounded-md hover:bg-purple-600"
                  disabled={!selectedFile && !knowledgeText.trim()}
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
