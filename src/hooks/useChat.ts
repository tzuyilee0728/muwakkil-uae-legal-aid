
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { useBookmarkStore } from '../services/bookmarkService';
import { Message, ActionLogStep } from '../types/chat';
import { analyzeUserIntent } from '../utils/chatUtils';
import { 
  loadChatHistory, 
  loadSpecificChat,
  saveChatHistory 
} from '../services/chatHistoryService';
import { simulateAIResponse } from '../services/messageResponseService';
import { ChatHistory } from '../types/chat';

export const useChat = (chatId: string | null) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLogSteps, setActionLogSteps] = useState<ActionLogStep[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [localChatId, setLocalChatId] = useState<string | null>(chatId);
  const { toast } = useToast();
  const { addBookmark } = useBookmarkStore();
  
  // Load chat history on mount
  useEffect(() => {
    const history = loadChatHistory();
    setChatHistory(history);
    
    // If we have a chatId, try to load this specific chat
    if (chatId) {
      const currentChat = history.find(chat => chat.id === chatId);
      const currentChatMessages = loadSpecificChat(chatId);
      
      if (currentChatMessages.length > 0) {
        setMessages(currentChatMessages);
      }
      
      if (currentChat?.createdAt) {
        setCreatedAt(currentChat.createdAt);
      }
      
      setLocalChatId(chatId);
    } else {
      // Reset everything for a new chat
      setMessages([]);
      setActionLogSteps([]);
      setCreatedAt(null);
      setLocalChatId(null);
    }
  }, [chatId]);
  
  // Save chat history when messages change
  useEffect(() => {
    if (messages.length === 0) return;
    
    // Generate a new chat ID if we don't have one yet
    const currentChatId = localChatId || uuidv4();
    if (!localChatId && messages.length > 0) {
      setLocalChatId(currentChatId);
    }
    
    const now = new Date().toISOString();
    let chatCreatedAt = createdAt;
    
    if (!chatCreatedAt) {
      chatCreatedAt = now;
      setCreatedAt(now);
    }
    
    const updatedHistory = saveChatHistory(messages, currentChatId, chatHistory, chatCreatedAt);
    setChatHistory(updatedHistory);
  }, [messages]);

  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      id: uuidv4(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    
    // Analyze user intent based on message history
    const userIntent = analyzeUserIntent(message, messages);
    
    // Set loading state
    setLoading(true);
    
    simulateAIResponse(
      message,
      userIntent,
      messages,
      setActionLogSteps,
      setLoading,
      (aiResponse, finalLogs) => {
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
        setLoading(false);
        setActionLogSteps(finalLogs);
      }
    );
  };

  const handleFileUpload = (files: File[]) => {
    if (files.length === 0) return;
    
    const fileNames = files.map(file => file.name).join(", ");
    const fileCountText = files.length === 1 
      ? t('chat.uploadedFile') 
      : t('chat.uploadedFiles', { count: files.length });
    
    // We don't add a message here since it's handled by the analysis process
    
    toast({
      title: t('chat.filesUploaded'),
      description: t('chat.filesUploadedDesc', { count: files.length }),
    });
  };

  const handleBookmark = (messageId: string) => {
    // Find the message with the given ID
    const messageToBookmark = messages.find(msg => msg.id === messageId);
    
    if (messageToBookmark) {
      // Format the date for display
      const formattedDate = new Date(messageToBookmark.timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      
      // Add the message to bookmarks
      addBookmark({
        id: messageToBookmark.id,
        title: currentChatTitle,
        date: formattedDate,
        content: messageToBookmark.content
      });
      
      toast({
        title: t('chat.bookmarked'),
        description: t('chat.bookmarkedDesc'),
      });
    }
  };

  const handleFeedback = (type: 'positive' | 'negative') => {
    toast({
      title: t('chat.feedbackReceived'),
      description: t('chat.feedbackReceivedDesc', { type }),
    });
  };

  // Generate a chat title based on the first user message
  const generateChatTitle = (): string => {
    if (messages.length === 0) return t('sidebar.newChat');
    
    const userMessages = messages.filter(m => m.sender === 'user');
    if (userMessages.length === 0) return t('sidebar.newChat');
    
    // Get the first message content
    const firstMessage = userMessages[0].content;
    
    // Limit to first 30 characters and add ellipsis if needed
    const maxLength = 40;
    const title = firstMessage.length > maxLength 
      ? `${firstMessage.substring(0, maxLength)}...` 
      : firstMessage;
      
    return title;
  };
  
  // Compute the current chat title
  const currentChatHistory = chatHistory.find(chat => chat.id === localChatId);
  const currentChatTitle = currentChatHistory?.title || generateChatTitle();

  return {
    messages,
    loading,
    handleSendMessage,
    handleFileUpload,
    handleBookmark,
    handleFeedback,
    actionLogSteps,
    chatTitle: currentChatTitle,
    createdAt,
    chatId: localChatId
  };
};
