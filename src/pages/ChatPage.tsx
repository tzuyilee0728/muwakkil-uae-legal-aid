
import React, { useEffect } from 'react';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import ChatInput from '../components/ChatInput';
import ChatContainer from '../components/chat/ChatContainer';
import ChatHeader from '../components/chat/ChatHeader';
import ChatPromptSuggestions from '../components/chat/ChatPromptSuggestions';
import { useChat } from '../hooks/useChat';

const ChatPage: React.FC = () => {
  // Use search parameters instead of path parameters
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get('id');
  const navigate = useNavigate();
  
  const { 
    messages, 
    loading, 
    handleSendMessage, 
    handleFileUpload, 
    handleBookmark,
    actionLogSteps,
    chatTitle,
    handleFeedback,
    createdAt,
    chatId: generatedChatId
  } = useChat(chatId);
  
  // Format timestamp if available
  const formattedTimestamp = createdAt 
    ? format(new Date(createdAt), 'MM/dd/yyyy HH:mm')
    : '';

  // If we have a new chat ID from useChat (i.e., a new chat was created), update the URL
  useEffect(() => {
    if (generatedChatId && !chatId) {
      navigate(`/app/chat?id=${generatedChatId}`, { replace: true });
    }
  }, [generatedChatId, chatId, navigate]);

  // Update the document title when the chat title changes
  useEffect(() => {
    document.title = chatTitle ? `${chatTitle} | Muwakkil` : 'Chat | Muwakkil';
  }, [chatTitle]);

  // If there are no messages, this is a new chat - show prompt suggestions
  const isNewChat = messages.length === 0;

  return (
    <div className="flex-1 flex flex-col relative h-full">
      {isNewChat ? (
        <>
          <ChatPromptSuggestions onSelectPrompt={handleSendMessage} />
          <div className="absolute bottom-0 left-0 right-0">
            <ChatInput onSendMessage={handleSendMessage} onFileUpload={handleFileUpload} />
          </div>
        </>
      ) : (
        <>
          {/* Chat title */}
          <ChatHeader 
            title={chatTitle || "New Chat"}
            timestamp={formattedTimestamp}
          />
          
          {/* Messages list */}
          <ChatContainer 
            messages={messages} 
            loading={loading} 
            actionLogSteps={actionLogSteps}
            onBookmark={handleBookmark}
            onFeedback={handleFeedback}
          />
          
          {/* Input area */}
          <ChatInput onSendMessage={handleSendMessage} onFileUpload={handleFileUpload} />
        </>
      )}
    </div>
  );
};

export default ChatPage;
