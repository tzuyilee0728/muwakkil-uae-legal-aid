
import React from 'react';
import { useParams } from 'react-router-dom';
import ChatInput from '../components/ChatInput';
import ChatContainer from '../components/chat/ChatContainer';
import ChatHeader from '../components/chat/ChatHeader';
import ChatPromptSuggestions from '../components/chat/ChatPromptSuggestions';
import { useChat } from '../hooks/useChat';

const ChatPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    messages, 
    loading, 
    handleSendMessage, 
    handleFileUpload, 
    actionLogSteps,
    isNewChat 
  } = useChat(id);

  // If this is a new chat and we have no messages, show prompt suggestions
  if (isNewChat && messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <ChatPromptSuggestions onSelectPrompt={handleSendMessage} />
        <ChatInput onSendMessage={handleSendMessage} onFileUpload={handleFileUpload} />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Chat title */}
      <ChatHeader 
        title={id && id !== 'new' ? "Eligibility check for DIFC's government grants" : ""}
        timestamp={id && id !== 'new' ? "4/23/25 19:20" : ""}
      />
      
      {/* Messages list */}
      <ChatContainer 
        messages={messages} 
        loading={loading} 
        actionLogSteps={actionLogSteps}
      />
      
      {/* Input area */}
      <ChatInput onSendMessage={handleSendMessage} onFileUpload={handleFileUpload} />
    </div>
  );
};

export default ChatPage;
