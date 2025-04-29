
import React, { useState, useRef, useEffect } from 'react';
import { Upload, Mic, Send } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onFileUpload: (file: File) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, onFileUpload }) => {
  const [message, setMessage] = useState('');
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
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-background dark:bg-background fixed bottom-0 left-64 right-0 z-10">
      <div className="flex items-start bg-muted dark:bg-accent rounded-md max-w-4xl mx-auto relative">
        <label htmlFor="file-upload" className="p-3 hover:bg-gray-100 dark:hover:bg-muted rounded-l-md cursor-pointer">
          <Upload size={20} className="text-gray-500 dark:text-gray-400" />
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask anything..."
          className="flex-1 py-3 px-4 bg-transparent border-0 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[40px] overflow-y-auto"
          style={{ maxHeight: '500px' }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <div className="flex items-center self-end">
          <button 
            type="button"
            className="p-3 hover:bg-gray-100 dark:hover:bg-muted text-gray-500 dark:text-gray-400"
          >
            <Mic size={20} />
          </button>
          <button 
            type="submit"
            className="p-3 ml-1 text-purple-600 dark:text-primary hover:bg-gray-100 dark:hover:bg-muted rounded-r-md"
          >
            {message.trim() ? <Send size={20} /> : null}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
