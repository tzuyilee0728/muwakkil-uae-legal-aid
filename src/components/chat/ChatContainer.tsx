
import React from 'react';
import ChatMessage from '../ChatMessage';
import { Message, ActionLogStep } from '../../hooks/useChat';

interface ChatContainerProps {
  messages: Message[];
  loading?: boolean;
  actionLogSteps?: ActionLogStep[];
  onBookmark?: (messageId: string) => void;
  onFeedback?: (type: 'positive' | 'negative') => void;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  loading = false,
  actionLogSteps = [],
  onBookmark,
  onFeedback
}) => {
  return <div className="flex-1 overflow-y-auto pb-24">
      {messages.map(message => <ChatMessage key={message.id} message={message} actionLogSteps={message.sender === 'ai' ? actionLogSteps : []} onBookmark={onBookmark} onFeedback={onFeedback} />)}
      
      {loading && <div className="py-6 bg-transparent">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-start gap-x-3">
              <div className="flex flex-col space-y-2 animate-pulse">
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                <div className="h-4 w-60 bg-gray-200 rounded"></div>
                <div className="h-4 w-40 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};

export default ChatContainer;
