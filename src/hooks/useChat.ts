
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      id: uuidv4(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setLoading(true);
    setActionLogSteps([{ text: 'Analyzing your query...' }]);

    // Simulate AI response process with more detailed action logs
    setTimeout(() => {
      // First update - analyzing
      setActionLogSteps([
        { text: 'Analyzing your query...' },
        { text: 'Searching knowledge base...', source: 'Legal Database' }
      ]);
      
      // Second update after a bit - found documents
      setTimeout(() => {
        setActionLogSteps([
          { text: 'Analyzed query', source: 'Legal Database' },
          { text: 'Found relevant documents', document: 'UAE Corporate Tax Law 2023.pdf' },
          { text: 'Analyzing document contents...', document: 'UAE Corporate Tax Law 2023.pdf' }
        ]);
        
        // Final update - generating response
        setTimeout(() => {
          setActionLogSteps([
            { text: 'Analyzed query', source: 'Legal Database' },
            { text: 'Found relevant documents', document: 'UAE Corporate Tax Law 2023.pdf' },
            { text: 'Analyzed document contents', document: 'UAE Corporate Tax Law 2023.pdf' },
            { text: 'Generating response based on documents and legal knowledge...' }
          ]);
          
          // Finally, add the AI message
          setTimeout(() => {
            const aiResponse: Message = {
              id: uuidv4(),
              content: `Based on the UAE Corporate Tax Law of 2023, ${message.toLowerCase().includes('tax') ? 'businesses with taxable income over AED 375,000 are subject to a 9% corporate tax rate. Businesses with income below this threshold are subject to a 0% rate.' : 'I found some information that might be relevant to your query. How can I provide more specific assistance?'}`,
              sender: 'ai',
              timestamp: new Date(),
            };

            setMessages((prevMessages) => [...prevMessages, aiResponse]);
            setLoading(false);

            // Final action log
            setActionLogSteps([
              { text: 'Analyzed query', source: 'Legal Database' },
              { text: 'Found relevant documents', document: 'UAE Corporate Tax Law 2023.pdf' },
              { text: 'Analyzed document contents', document: 'UAE Corporate Tax Law 2023.pdf' },
              { text: 'Generated response based on legal knowledge', source: 'Legal Database' }
            ]);
          }, 800);
        }, 1000);
      }, 1500);
    }, 800);
  };

  const handleFileUpload = (file: File) => {
    const newMessage: Message = {
      id: uuidv4(),
      content: `Uploaded file: ${file.name}`,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    
    toast({
      title: "File Uploaded",
      description: `${file.name} has been uploaded successfully.`,
    });
  };

  const handleBookmark = (messageId: string) => {
    toast({
      title: "Bookmarked",
      description: "Message has been saved to your bookmarks.",
    });
  };

  const handleFeedback = (type: 'positive' | 'negative') => {
    toast({
      title: "Feedback Received",
      description: `Thank you for your ${type} feedback.`,
    });
  };

  return {
    messages,
    loading,
    handleSendMessage,
    handleFileUpload,
    handleBookmark,
    handleFeedback,
    actionLogSteps,
    chatTitle: chatId ? "Eligibility check for DIFC's government grants" : "New Chat"
  };
};
