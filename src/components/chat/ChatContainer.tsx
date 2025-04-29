
import React from 'react';
import ChatMessage from '../ChatMessage';
import { Message } from '@/hooks/useChat';

interface ActionLogStep {
  text: string;
  source?: string;
  document?: string;
}

interface ChatContainerProps {
  messages: Message[];
  loading: boolean;
  actionLogSteps?: ActionLogStep[];
}

const ChatContainer: React.FC<ChatContainerProps> = ({ 
  messages, 
  loading,
  actionLogSteps = []
}) => {
  return (
    <div className="flex-1 overflow-y-auto chat-container">
      {messages.map((message) => (
        <ChatMessage 
          key={message.id}
          message={message}
          actionLogSteps={message.sender === 'ai' ? actionLogSteps : []}
          onBookmark={() => console.log('Bookmark', message.id)}
          onCopy={() => console.log('Copy', message.id)}
          onRegenerateResponse={() => console.log('Regenerate', message.id)}
          onFeedback={(type) => console.log('Feedback', type, message.id)}
        />
      ))}
      
      {/* Placeholder for when messages are loading */}
      {loading && (
        <div className="py-6 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center space-x-2 text-muwakkil-purple">
              <span>Processing...</span>
              <div className="animate-pulse">●</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
