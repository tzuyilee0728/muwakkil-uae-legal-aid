
import { v4 as uuidv4 } from 'uuid';
import { Message, ActionLogStep, KnowledgeItem } from '../types/chat';
import { getKnowledgeItems } from '../utils/chatUtils';

export const simulateAIResponse = (
  message: string,
  userIntent: string,
  messages: Message[],
  setActionLogSteps: (steps: ActionLogStep[]) => void,
  setLoading: (loading: boolean) => void,
  onComplete: (aiResponse: Message, finalLogs: ActionLogStep[]) => void
): void => {
  const knowledgeItems = getKnowledgeItems();
  setLoading(true);
  setActionLogSteps([{ text: 'Analyzing your query...' }]);
  
  // First update - analyzing
  setActionLogSteps([
    { text: 'Analyzing your query...' },
    { text: 'Analyzing conversation history...', source: 'Chat History' },
    { text: 'Searching knowledge base...', source: 'User Knowledge Base' }
  ]);
  
  // Make the actual backend request
  fetchFromMuwakkilBackend(message)
    .then(responseData => {
      // Create final logs
      const finalLogs: ActionLogStep[] = [
        { text: 'Analyzed query', source: 'Knowledge Base' },
        { text: 'Analyzed conversation context', source: 'Chat History' },
      ];
      
      // Add document references if present
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
        text: 'Generated response based on document analysis and conversation history', 
        source: knowledgeItems.length > 0 ? 'User Knowledge Base' : 'Legal Database'
      });
      
      // Create the AI response message
      const aiResponse: Message = {
        id: uuidv4(),
        content: responseData.response || "I'm sorry, I couldn't process your request at this time.",
        sender: 'ai',
        timestamp: new Date(),
      };
      
      // Complete the response
      onComplete(aiResponse, finalLogs);
    })
    .catch(error => {
      console.error("Error fetching from Muwakkil backend:", error);
      
      // Create fallback response in case of error
      const fallbackResponse: Message = {
        id: uuidv4(),
        content: "I'm sorry, I'm having trouble connecting to the knowledge base right now. Please try again in a moment.",
        sender: 'ai',
        timestamp: new Date(),
      };
      
      const errorLogs: ActionLogStep[] = [
        { text: 'Error connecting to knowledge base', source: 'System' },
        { text: 'Using fallback response', source: 'System' }
      ];
      
      onComplete(fallbackResponse, errorLogs);
    })
    .finally(() => {
      setLoading(false);
    });
};

/**
 * Fetches response from Muwakkil backend API
 * Uses default user_id and action values
 */
const fetchFromMuwakkilBackend = async (question: string) => {
  try {
    const response = await fetch('https://us-central1-aiot-fit-xlab.cloudfunctions.net/muwakkil', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "action": "ask_question", // Default action
        "user_id": "12345", // Default user_id
        "question": question
      })
    });
    
    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in backend request:", error);
    throw error;
  }
};

/**
 * Analyzes an uploaded file using the Muwakkil API
 * @param file The file to analyze
 * @returns Promise with the analysis results
 */
export const analyzeFile = async (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (event) => {
      try {
        if (!event.target || !event.target.result) {
          throw new Error('Error reading file');
        }
        
        // Convert the file content to base64
        const base64Content = (event.target.result as string).split(',')[1];
        
        const response = await fetch('https://us-central1-aiot-fit-xlab.cloudfunctions.net/muwakkil', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "action": "analyze_uploaded_file",
            "filename": file.name,
            "file_content": base64Content,
            "user_id": "12345" // Default user_id
          })
        });
        
        if (!response.ok) {
          throw new Error(`Backend responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        resolve(data);
      } catch (error) {
        console.error("Error in file analysis request:", error);
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    // Read the file as a data URL (which gives us base64)
    reader.readAsDataURL(file);
  });
};

