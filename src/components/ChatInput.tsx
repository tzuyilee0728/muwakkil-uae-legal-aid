
import React, { useState } from 'react';
import { Upload, Mic } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onFileUpload: (file: File) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, onFileUpload }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 bg-white">
      <div className="flex items-center bg-gray-50 rounded-md border border-gray-200">
        <label htmlFor="file-upload" className="p-3 hover:bg-gray-100 rounded-l-md cursor-pointer">
          <Upload size={20} className="text-gray-500" />
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask anything..."
          className="flex-1 py-3 px-4 bg-transparent outline-none"
        />
        <button 
          type="button"
          className="p-3 hover:bg-gray-100 text-gray-500"
        >
          <Mic size={20} />
        </button>
        <button 
          type="submit"
          className="p-3 ml-1 text-purple-600 hover:bg-gray-100"
        >
          {message.trim() ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13"></path>
              <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
            </svg>
          ) : null}
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
