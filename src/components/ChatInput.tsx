
import React, { useState, useRef, useEffect } from 'react';
import { Upload, Paperclip, Send, X } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onFileUpload: (file: File) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, onFileUpload }) => {
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto-resize logic for the textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = 'auto';
    
    // Set the height to match content (with max of 500px handled by CSS)
    textarea.style.height = `${Math.min(textarea.scrollHeight, 500)}px`;
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // If there's a file selected, upload it
    if (selectedFile) {
      onFileUpload(selectedFile);
      setSelectedFile(null);
    }
    
    // If there's a message, send it
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      // Reset height after sending
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const removeSelectedFile = () => {
    setSelectedFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-background dark:bg-background fixed bottom-0 left-64 right-0 z-10">
      <div className="flex items-start bg-muted dark:bg-accent rounded-md max-w-4xl mx-auto relative">
        {/* File upload button */}
        <label htmlFor="file-upload" className="p-3 hover:bg-gray-100 dark:hover:bg-muted rounded-l-md cursor-pointer self-end">
          <Paperclip size={20} className="text-gray-500 dark:text-gray-400" />
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
        
        {/* Text input area */}
        <div className="flex-1 flex flex-col py-3 px-4">
          {/* Show selected file if any */}
          {selectedFile && (
            <div className="flex items-center bg-white dark:bg-gray-700 rounded px-3 py-2 mb-2">
              <div className="flex-1 truncate text-sm">
                {selectedFile.name}
              </div>
              <button 
                type="button" 
                onClick={removeSelectedFile}
                className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={16} />
              </button>
            </div>
          )}
          
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask anything..."
            className="bg-transparent border-0 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[40px] overflow-y-auto p-0"
            style={{ maxHeight: '500px' }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
        </div>
        
        {/* Mic and send buttons */}
        <div className="flex items-center self-end">
          <button 
            type="submit"
            className="p-3 ml-1 text-purple-600 dark:text-primary hover:bg-gray-100 dark:hover:bg-muted rounded-r-md"
          >
            {selectedFile || message.trim() ? <Send size={20} /> : null}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
