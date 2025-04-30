
import React from 'react';
import ChatMessage from '../ChatMessage';
import { Message, ActionLogStep } from '../../types/chat';
import { TextShimmer } from '@/components/ui/text-shimmer';
import { ClockIcon } from 'lucide-react';

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
      
      {loading && (
        <div className="py-6 bg-transparent">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-x-3">
              <div className="p-2 rounded-full bg-muted flex items-center justify-center">
                <ClockIcon size={18} className="text-primary" />
              </div>
              <div className="flex flex-col space-y-2">
                <TextShimmer 
                  className="font-medium text-base text-foreground"
                  duration={1.5}
                >
                  Thinking and analyzing your request...
                </TextShimmer>
                <TextShimmer
                  className="text-sm text-muted-foreground"
                  duration={2}
                >
                  Searching through knowledge base and preparing a response
                </TextShimmer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>;
};

export default ChatContainer;
