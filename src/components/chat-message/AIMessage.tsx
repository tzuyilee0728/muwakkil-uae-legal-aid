
import React from 'react';
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import ActionLog from './ActionLog';
import FormattedContent from './FormattedContent';
import MessageActions from './MessageActions';

interface ActionLogStep {
  text: string;
  source?: string;
  document?: string;
}

interface AIMessageProps {
  content: string;
  actionLogSteps: ActionLogStep[];
  onBookmark?: () => void;
  onCopy?: () => void;
  onRegenerateResponse?: () => void;
  onFeedback?: (type: 'positive' | 'negative') => void;
}

const AIMessage: React.FC<AIMessageProps> = ({
  content,
  actionLogSteps,
  onBookmark,
  onCopy,
  onRegenerateResponse,
  onFeedback
}) => {
  return (
    <div className="py-6 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex space-x-3">
          <div className="flex-shrink-0 mt-1">
            <Avatar className="h-8 w-8 bg-muwakkil-purple">
              <AvatarImage
                src="/lovable-uploads/8d2bf5c3-e087-4c59-92c2-869320739b49.png"
                alt="Muwakkil Logo"
                className="h-full w-full p-1.5"
              />
            </Avatar>
          </div>
          
          {/* Action Log component */}
          {actionLogSteps.length > 0 && <ActionLog steps={actionLogSteps} />}
          
          <div className="flex-grow">
            <FormattedContent content={content} />
            
            <MessageActions 
              content={content}
              onBookmark={onBookmark}
              onCopy={onCopy}
              onRegenerateResponse={onRegenerateResponse}
              onFeedback={onFeedback}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMessage;
