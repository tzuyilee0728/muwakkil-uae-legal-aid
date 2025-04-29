import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface ActionLogStep {
  text: string;
  source?: string;
  document?: string;
}

export const useChat = (chatId: string | null) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLogSteps, setActionLogSteps] = useState<ActionLogStep[]>([]);

  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      id: uuidv4(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setLoading(true);

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: uuidv4(),
        content: `AI response to: ${message}`,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, aiResponse]);
      setLoading(false);

      // Simulate action log steps
      setActionLogSteps([
        { text: 'Analyzed user query' },
        { text: 'Searched knowledge base', source: 'Knowledge Base' },
        { text: 'Generated response' },
      ]);
    }, 1500);
  };

  const handleFileUpload = (file: File) => {
    const newMessage: Message = {
      id: uuidv4(),
      content: `Uploaded file: ${file.name}`,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleBookmark = (messageId: string) => {
    alert(`Bookmarking message with ID: ${messageId}`);
  };

  const handleFeedback = (type: 'positive' | 'negative') => {
    alert(`Feedback: ${type}`);
  };

  return {
    messages,
    loading,
    handleSendMessage,
    handleFileUpload,
    handleBookmark,
    handleFeedback,
    actionLogSteps,
    chatTitle: chatId ? "Eligibility check for DIFC's government grants" : ""
  };
};
