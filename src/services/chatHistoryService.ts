
import { v4 as uuidv4 } from 'uuid';
import { Message, ChatHistory } from '../types/chat';

export const loadChatHistory = (): ChatHistory[] => {
  const storedHistory = localStorage.getItem('chatHistory');
  const history = storedHistory ? JSON.parse(storedHistory) : [];
  
  // Sort by newest first based on createdAt date
  return history.sort((a: ChatHistory, b: ChatHistory) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  });
};

export const loadSpecificChat = (chatId: string): Message[] => {
  const storedHistory = localStorage.getItem('chatHistory');
  if (storedHistory) {
    const history = JSON.parse(storedHistory) as ChatHistory[];
    const currentChat = history.find(chat => chat.id === chatId);
    if (currentChat && currentChat.messages) {
      return currentChat.messages;
    }
  }
  return [];
};

export const saveChatHistory = (
  messages: Message[], 
  chatId: string | null, 
  existingHistory: ChatHistory[],
  createdAt: string | null = null
): ChatHistory[] => {
  if (messages.length === 0) return existingHistory;
  
  const currentChatId = chatId || uuidv4();
  const updatedHistory = [...existingHistory];
  
  const existingChatIndex = updatedHistory.findIndex(chat => chat.id === currentChatId);
  
  // Generate title from first user message
  const userMessages = messages.filter(m => m.sender === 'user');
  let title = "New Chat";
  
  if (userMessages.length > 0) {
    const firstMessage = userMessages[0].content;
    // Limit to first 40 characters and add ellipsis if needed
    const maxLength = 40;
    title = firstMessage.length > maxLength 
      ? `${firstMessage.substring(0, maxLength)}...` 
      : firstMessage;
  }
  
  if (existingChatIndex >= 0) {
    updatedHistory[existingChatIndex].messages = messages;
    updatedHistory[existingChatIndex].title = title;
    
    // Only update createdAt if it doesn't exist
    if (createdAt && !updatedHistory[existingChatIndex].createdAt) {
      updatedHistory[existingChatIndex].createdAt = createdAt;
    }
  } else {
    updatedHistory.unshift({
      id: currentChatId,
      messages: messages,
      title: title,
      createdAt: createdAt || new Date().toISOString()
    });
  }
  
  localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
  return updatedHistory;
};
