
import React from 'react';

interface ChatHeaderProps {
  title: string;
  timestamp?: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ title, timestamp }) => {
  if (!title) return null;
  
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 p-4 bg-background dark:bg-background">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-xl font-medium text-foreground dark:text-foreground">{title}</h1>
        {timestamp && <p className="text-sm text-gray-500 dark:text-gray-400">{timestamp}</p>}
      </div>
    </div>
  );
};

export default ChatHeader;
