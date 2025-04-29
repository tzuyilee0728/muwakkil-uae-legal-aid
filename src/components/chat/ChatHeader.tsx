
import React from 'react';

interface ChatHeaderProps {
  title: string;
  timestamp?: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ title, timestamp }) => {
  if (!title) return null;
  
  return (
    <div className="border-b border-gray-200 p-4 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-xl font-medium">{title}</h1>
        {timestamp && <p className="text-sm text-gray-500">{timestamp}</p>}
      </div>
    </div>
  );
};

export default ChatHeader;
