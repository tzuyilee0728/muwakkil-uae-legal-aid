import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { useBookmarkStore } from '../services/bookmarkService';

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

export interface KnowledgeItem {
  id: string;
  name: string;
  filePath?: string;
}

export interface ChatHistory {
  id: string;
  messages: Message[];
  title?: string;
}

export const useChat = (chatId: string | null) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLogSteps, setActionLogSteps] = useState<ActionLogStep[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const { toast } = useToast();
  const { addBookmark } = useBookmarkStore();
  
  // Load chat history on mount
  useEffect(() => {
    const storedHistory = localStorage.getItem('chatHistory');
    if (storedHistory) {
      setChatHistory(JSON.parse(storedHistory));
    }
    
    // If we have a chatId, try to load this specific chat
    if (chatId) {
      const storedHistory = localStorage.getItem('chatHistory');
      if (storedHistory) {
        const history = JSON.parse(storedHistory) as ChatHistory[];
        const currentChat = history.find(chat => chat.id === chatId);
        if (currentChat && currentChat.messages) {
          setMessages(currentChat.messages);
        }
      }
    }
  }, [chatId]);
  
  // Save chat history when messages change
  useEffect(() => {
    if (messages.length > 0) {
      const currentChatId = chatId || uuidv4();
      const updatedHistory = [...chatHistory];
      
      const existingChatIndex = updatedHistory.findIndex(chat => chat.id === currentChatId);
      
      if (existingChatIndex >= 0) {
        updatedHistory[existingChatIndex].messages = messages;
      } else {
        updatedHistory.push({
          id: currentChatId,
          messages: messages,
          title: "New Chat"
        });
      }
      
      setChatHistory(updatedHistory);
      localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
    }
  }, [messages]);
  
  // Get knowledge items from localStorage
  const getKnowledgeItems = (): KnowledgeItem[] => {
    const storedItems = localStorage.getItem('knowledgeItems');
    return storedItems ? JSON.parse(storedItems) : [];
  };
  
  // Analyze user's intent based on previous messages
  const analyzeUserIntent = (newMessage: string): string => {
    const userMessages = messages
      .filter(msg => msg.sender === 'user')
      .map(msg => msg.content);
    
    // Add the new message to analyze the full context
    userMessages.push(newMessage);
    
    // Logic to determine user intent based on message history
    let intent = "general";
    
    // Check for follow-up questions
    if (messages.length > 0 && userMessages.length > 1) {
      const prevMessage = userMessages[userMessages.length - 2].toLowerCase();
      const currentMessage = newMessage.toLowerCase();
      
      // Check if user is asking for more details about previous topic
      if (currentMessage.includes("more") || 
          currentMessage.includes("elaborate") ||
          currentMessage.includes("explain") ||
          currentMessage.includes("details")) {
        intent = "follow-up";
      }
      
      // Check if user is asking about specific tax topics
      else if (prevMessage.includes("tax") && currentMessage.includes("rate")) {
        intent = "tax-rate";
      }
      
      // Check if user is asking about documents
      else if (prevMessage.includes("document") || currentMessage.includes("document")) {
        intent = "document";
      }
    }
    
    if (newMessage.toLowerCase().includes("tax")) {
      intent = "tax";
    } else if (newMessage.toLowerCase().includes("document") || newMessage.toLowerCase().includes("file")) {
      intent = "document";
    }
    
    return intent;
  };

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

    // Get knowledge items to analyze
    const knowledgeItems = getKnowledgeItems();
    
    // Analyze user intent based on message history
    const userIntent = analyzeUserIntent(message);
    
    // Simulate AI response process with knowledge document analysis
    setTimeout(() => {
      // First update - analyzing
      setActionLogSteps([
        { text: 'Analyzing your query...' },
        { text: 'Analyzing conversation history...', source: 'Chat History' },
        { text: 'Searching knowledge base...', source: 'User Knowledge Base' }
      ]);
      
      // Second update after a bit - found documents
      setTimeout(() => {
        const documentLogs: ActionLogStep[] = [
          { text: 'Analyzed query', source: 'Knowledge Base' },
          { text: 'Analyzed conversation context', source: 'Chat History' },
        ];
        
        // Add each knowledge document to the action log
        if (knowledgeItems.length > 0) {
          knowledgeItems.forEach(item => {
            documentLogs.push({ 
              text: 'Found relevant document', 
              document: item.name 
            });
          });
          
          documentLogs.push({ 
            text: 'Analyzing document contents...', 
            document: knowledgeItems.map(item => item.name).join(', ') 
          });
        } else {
          documentLogs.push({ 
            text: 'Found relevant documents', 
            document: 'UAE Corporate Tax Law 2023.pdf' 
          });
          documentLogs.push({ 
            text: 'Analyzing document contents...', 
            document: 'UAE Corporate Tax Law 2023.pdf' 
          });
        }
        
        setActionLogSteps(documentLogs);
        
        // Final update - generating response
        setTimeout(() => {
          const finalLogs: ActionLogStep[] = [
            { text: 'Analyzed query', source: 'Knowledge Base' },
            { text: 'Analyzed conversation context', source: 'Chat History' },
          ];
          
          // Add each knowledge document to the final action log
          if (knowledgeItems.length > 0) {
            knowledgeItems.forEach(item => {
              finalLogs.push({ 
                text: 'Found relevant document', 
                document: item.name 
              });
            });
            
            finalLogs.push({ 
              text: 'Analyzed document contents', 
              document: knowledgeItems.map(item => item.name).join(', ') 
            });
          } else {
            finalLogs.push({ 
              text: 'Found relevant documents', 
              document: 'UAE Corporate Tax Law 2023.pdf' 
            });
            finalLogs.push({ 
              text: 'Analyzed document contents', 
              document: 'UAE Corporate Tax Law 2023.pdf' 
            });
          }
          
          finalLogs.push({ 
            text: 'Generating response based on documents, knowledge base, and conversation history...', 
          });
          
          setActionLogSteps(finalLogs);
          
          // Finally, add the AI message
          setTimeout(() => {
            let responseContent = '';
            
            // Generate response based on user intent and knowledge items
            if (userIntent === 'follow-up' && messages.length > 0) {
              // This is a follow-up question, reference previous content
              responseContent = `Based on our previous conversation and your follow-up question, I can provide more details. ${getFollowUpResponse(message, knowledgeItems)}`;
            } else if (userIntent === 'tax') {
              if (knowledgeItems.length > 0) {
                responseContent = `Based on the analysis of your uploaded documents (${knowledgeItems.map(item => item.name).join(', ')}) and our conversation history, businesses with taxable income over AED 375,000 are subject to a 9% corporate tax rate in UAE. Businesses with income below this threshold are subject to a 0% rate.`;
              } else {
                responseContent = `Based on the UAE Corporate Tax Law of 2023, businesses with taxable income over AED 375,000 are subject to a 9% corporate tax rate. Businesses with income below this threshold are subject to a 0% rate. Your previous questions help me understand you're interested in specific tax implications.`;
              }
            } else if (userIntent === 'tax-rate') {
              responseContent = `Following up on our previous tax discussion, the standard corporate tax rate in the UAE is 9% for businesses with taxable income above AED 375,000. Small businesses and startups with income below this threshold benefit from a 0% rate. There are also specific provisions for free zone businesses that meet certain conditions.`;
            } else if (userIntent === 'document') {
              if (knowledgeItems.length > 0) {
                responseContent = `I've analyzed your uploaded documents (${knowledgeItems.map(item => item.name).join(', ')}) in the context of our ongoing conversation. These documents contain information about ${knowledgeItems.length > 1 ? 'various topics' : 'the topic you mentioned'}. Would you like me to elaborate on any specific aspect from these documents?`;
              } else {
                responseContent = `Based on our conversation history, I understand you're interested in document analysis. To provide you with the most accurate information, I recommend uploading the relevant documents to your knowledge base. This will allow me to analyze them directly.`;
              }
            } else {
              // Default response for general queries
              if (knowledgeItems.length > 0) {
                responseContent = `I've analyzed your query against your uploaded knowledge documents (${knowledgeItems.map(item => item.name).join(', ')}) and considered our previous conversation. Based on this comprehensive analysis, I can provide you with information relevant to your question. What specific aspects would you like me to elaborate on?`;
              } else {
                responseContent = `Based on our conversation history and available information, ${message.toLowerCase().includes('tax') ? 'businesses with taxable income over AED 375,000 are subject to a 9% corporate tax rate. Businesses with income below this threshold are subject to a 0% rate.' : 'I found some information that might be relevant to your query. How can I provide more specific assistance?'}`;
              }
            }
            
            const aiResponse: Message = {
              id: uuidv4(),
              content: responseContent,
              sender: 'ai',
              timestamp: new Date(),
            };

            setMessages((prevMessages) => [...prevMessages, aiResponse]);
            setLoading(false);

            // Final action log
            const completeLogs = [...finalLogs];
            completeLogs.push({ 
              text: 'Generated response based on document analysis and conversation history', 
              source: knowledgeItems.length > 0 ? 'User Knowledge Base' : 'Legal Database'
            });
            setActionLogSteps(completeLogs);
          }, 800);
        }, 1000);
      }, 1500);
    }, 800);
  };

  // Helper function to generate follow-up responses
  const getFollowUpResponse = (message: string, knowledgeItems: KnowledgeItem[]): string => {
    if (message.toLowerCase().includes('tax')) {
      return `Regarding the tax aspects, UAE's corporate tax framework was established in 2022 and implemented in 2023. It features a standard rate of 9% for businesses earning above AED 375,000, with qualifying free zone businesses potentially eligible for 0% rates subject to specific conditions.`;
    } else if (message.toLowerCase().includes('document') || message.toLowerCase().includes('file')) {
      return `Let me provide more insights from ${knowledgeItems.length > 0 ? 'your uploaded documents' : 'the reference documents'}. The key provisions relevant to your inquiry include regulatory frameworks, compliance requirements, and specific provisions applicable to your situation.`;
    } else {
      return `Looking at the broader context of our discussion, I can elaborate further on the relevant aspects. The regulatory framework in UAE provides specific guidelines that would apply to your situation, considering all factors we've discussed.`;
    }
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
        title: chatTitle || "New Chat",
        date: formattedDate,
        content: messageToBookmark.content
      });
      
      toast({
        title: "Bookmarked",
        description: "Message has been saved to your bookmarks.",
      });
    }
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
