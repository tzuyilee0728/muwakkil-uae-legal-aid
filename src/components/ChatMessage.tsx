
import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, RefreshCcw, Copy, Bookmark } from 'lucide-react';

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    sender: 'user' | 'ai';
    timestamp?: string;
  };
  onBookmark?: () => void;
  onCopy?: () => void;
  onRegenerateResponse?: () => void;
  onFeedback?: (type: 'positive' | 'negative') => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  onBookmark,
  onCopy,
  onRegenerateResponse,
  onFeedback,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    if (onCopy) onCopy();
  };

  // Formatting message content with links and lists
  const formattedContent = message.content.split('\n').map((line, i) => {
    if (line.startsWith('•') || line.startsWith('*')) {
      return <li key={i} className="ml-6 list-disc">{line.substring(1).trim()}</li>;
    } else if (line.match(/^\d+\.\s/)) {
      return <li key={i} className="ml-6 list-decimal">{line.substring(line.indexOf('.') + 1).trim()}</li>;
    } else if (line.trim().startsWith('DIFC')) {
      return <a key={i} href="#" className="text-muwakkil-purple underline">{line}</a>;
    } else {
      return <p key={i} className={`${line.trim() === '' ? 'h-4' : ''}`}>{line}</p>;
    }
  });

  return (
    <div className={`py-6 ${message.sender === 'user' ? 'bg-white' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4">
        {message.sender === 'ai' ? (
          <div className="flex space-x-3">
            <div className="flex-shrink-0 mt-1">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-muwakkil-purple to-purple-400 flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3.34 17a10 10 0 1 1 17.32 0"></path>
                  <path d="M3 21h18"></path>
                  <path d="M12 7v4"></path>
                  <path d="M12 15h.01"></path>
                </svg>
              </div>
            </div>
            <div className="flex-grow">
              <div className="prose prose-sm max-w-none">
                {formattedContent}
              </div>
              
              <div className="mt-4 flex items-center space-x-4 text-gray-500">
                <button 
                  onClick={handleCopy} 
                  className="p-2 hover:bg-gray-200 rounded-md"
                  aria-label="Copy"
                  title="Copy"
                >
                  <Copy size={18} strokeWidth={1.5} />
                </button>
                <button 
                  onClick={() => onFeedback && onFeedback('positive')} 
                  className="p-2 hover:bg-gray-200 rounded-md"
                  aria-label="Like"
                  title="Like"
                >
                  <ThumbsUp size={18} strokeWidth={1.5} />
                </button>
                <button 
                  onClick={() => onFeedback && onFeedback('negative')} 
                  className="p-2 hover:bg-gray-200 rounded-md"
                  aria-label="Dislike"
                  title="Dislike"
                >
                  <ThumbsDown size={18} strokeWidth={1.5} />
                </button>
                <button 
                  onClick={() => onRegenerateResponse && onRegenerateResponse()} 
                  className="p-2 hover:bg-gray-200 rounded-md"
                  aria-label="Regenerate"
                  title="Regenerate"
                >
                  <RefreshCcw size={18} strokeWidth={1.5} />
                </button>
                <button 
                  onClick={() => onBookmark && onBookmark()} 
                  className="p-2 hover:bg-gray-200 rounded-md"
                  aria-label="Bookmark"
                  title="Bookmark"
                >
                  <Bookmark size={18} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-start space-x-3">
            <div className="rounded-full w-8 h-8 bg-gray-200 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className="flex-grow">
              <p>{message.content}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
