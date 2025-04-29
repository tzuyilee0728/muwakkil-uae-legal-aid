
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

export interface KnowledgeItem {
  id: string;
  name: string;
  filePath?: string;
}

export const useChat = (chatId: string | null) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLogSteps, setActionLogSteps] = useState<ActionLogStep[]>([]);
  const { toast } = useToast();
  
  // Get knowledge items from localStorage
  const getKnowledgeItems = (): KnowledgeItem[] => {
    const storedItems = localStorage.getItem('knowledgeItems');
    return storedItems ? JSON.parse(storedItems) : [];
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
    
    // Simulate AI response process with knowledge document analysis
    setTimeout(() => {
      // First update - analyzing
      setActionLogSteps([
        { text: 'Analyzing your query...' },
        { text: 'Searching knowledge base...', source: 'User Knowledge Base' }
      ]);
      
      // Second update after a bit - found documents
      setTimeout(() => {
        const documentLogs: ActionLogStep[] = [
          { text: 'Analyzed query', source: 'Knowledge Base' },
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
            text: 'Generating response based on documents and knowledge base...', 
          });
          
          setActionLogSteps(finalLogs);
          
          // Finally, add the AI message
          setTimeout(() => {
            let responseContent = '';
            
            if (knowledgeItems.length > 0) {
              // Generate response based on the knowledge items
              if (message.toLowerCase().includes('tax')) {
                responseContent = `Based on the analysis of your uploaded documents (${knowledgeItems.map(item => item.name).join(', ')}), businesses with taxable income over AED 375,000 are subject to a 9% corporate tax rate in UAE. Businesses with income below this threshold are subject to a 0% rate.`;
              } else if (message.toLowerCase().includes('document') || message.toLowerCase().includes('file')) {
                responseContent = `I've analyzed your uploaded documents (${knowledgeItems.map(item => item.name).join(', ')}). These documents contain information about ${knowledgeItems.length > 1 ? 'various topics' : 'the topic you mentioned'}. How can I help you understand them better?`;
              } else {
                responseContent = `I've analyzed your query against your uploaded knowledge documents (${knowledgeItems.map(item => item.name).join(', ')}). Based on this analysis, I can provide you with information relevant to your question. What specific aspects would you like me to elaborate on?`;
              }
            } else {
              // Default response if no knowledge items
              responseContent = `Based on the UAE Corporate Tax Law of 2023, ${message.toLowerCase().includes('tax') ? 'businesses with taxable income over AED 375,000 are subject to a 9% corporate tax rate. Businesses with income below this threshold are subject to a 0% rate.' : 'I found some information that might be relevant to your query. How can I provide more specific assistance?'}`;
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
              text: 'Generated response based on document analysis', 
              source: knowledgeItems.length > 0 ? 'User Knowledge Base' : 'Legal Database'
            });
            setActionLogSteps(completeLogs);
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
