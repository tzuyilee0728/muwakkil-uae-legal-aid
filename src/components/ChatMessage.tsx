
import React from 'react';
import UserMessage from './chat-message/UserMessage';
import AIMessage from './chat-message/AIMessage';

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    sender: 'user' | 'ai';
    timestamp?: string;
  };
  actionLogSteps?: Array<{
    text: string;
    source?: string;
    document?: string;
  }>;
  onBookmark?: (messageId: string) => void;
  onCopy?: () => void;
  onRegenerateResponse?: () => void;
  onFeedback?: (type: 'positive' | 'negative') => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  actionLogSteps = [],
  onBookmark,
  onCopy,
  onRegenerateResponse,
  onFeedback,
}) => {
  if (message.sender === 'user') {
    return <UserMessage content={message.content} />;
  }

  return (
    <AIMessage
      content={message.content}
      actionLogSteps={actionLogSteps}
      onBookmark={() => onBookmark && onBookmark(message.id)}
      onCopy={onCopy}
      onRegenerateResponse={onRegenerateResponse}
      onFeedback={onFeedback}
    />
  );
};

export default ChatMessage;
