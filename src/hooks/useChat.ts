
import { useState, useEffect } from 'react';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
}

export interface ActionLogStep {
  text: string;
  source?: string;
  document?: string;
}

export const useChat = (chatId?: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Mock action log steps
  const actionLogSteps: ActionLogStep[] = [
    { 
      text: 'I am looking into the DIFC\'s law for startup grants.', 
      source: 'Searching DIFC Innovation Hub Official Website' 
    },
    { 
      text: 'I have scanned the your document and extract the information.', 
      document: 'Nakhla\'s_company_document_Dubai.pdf' 
    },
    { 
      text: 'I have matched your company for the criteria.', 
      document: 'Nakhla\'s_company_document_Dubai.pdf' 
    },
  ];

  // Load chat history if chatId is provided
  useEffect(() => {
    if (chatId && chatId !== 'new') {
      setLoading(true);
      
      // Simulate fetching existing chat history
      setTimeout(() => {
        setMessages([
          { id: '1', content: 'Is my company eligible for DIFC\'s government grants?', sender: 'user' as const },
          { 
            id: '2', 
            content: "Thank you for your inquiry. Before I can provide you with accurate information about your eligibility for DIFC's government grants, I'll need some specific details about your company. Could you please share the following information:\n\n1. Business Activity: What sector does your company operate in?\n2. Stage of Business: Is your company a startup, SME, or larger enterprise?\n3. Registration Status: Are you already registered within DIFC or planning to register?",
            sender: 'ai' as const 
          }
        ]);
        setLoading(false);
      }, 1000);
    }
  }, [chatId]);

  const handleSendMessage = (message: string) => {
    const newMessages = [...messages, { id: Date.now().toString(), content: message, sender: 'user' as const }];
    setMessages(newMessages);
    
    // Simulate AI response
    setLoading(true);
    setTimeout(() => {
      const responseContent = getResponseForMessage(message);
      setMessages([...newMessages, { 
        id: (Date.now() + 1).toString(), 
        content: responseContent, 
        sender: 'ai' as const 
      }]);
      setLoading(false);
    }, 2000);
  };

  const handleFileUpload = (file: File) => {
    // Simulate file upload and processing
    const newMessages = [...messages, { 
      id: Date.now().toString(), 
      content: `I've uploaded ${file.name} for analysis.`, 
      sender: 'user' as const 
    }];
    setMessages(newMessages);
    
    setLoading(true);
    setTimeout(() => {
      setMessages([...newMessages, { 
        id: (Date.now() + 1).toString(), 
        content: `I've analyzed ${file.name}. This document appears to be in compliance with UAE business regulations, but there are two sections that may need review:\n\n• Section 4.2: The non-compete clause duration exceeds the 2-year maximum limit allowed in Dubai.\n• Section 7.1: The governing law should explicitly specify UAE Federal Law rather than just mentioning "applicable laws".\n\nWould you like me to suggest specific revisions for these sections?`, 
        sender: 'ai' as const 
      }]);
      setLoading(false);
    }, 3000);
  };

  return {
    messages,
    loading,
    handleSendMessage,
    handleFileUpload,
    actionLogSteps,
    isNewChat: !chatId || chatId === 'new',
  };
};

// Helper function to generate AI responses
const getResponseForMessage = (message: string) => {
  if (message.toLowerCase().includes('grant') || message.toLowerCase().includes('eligible')) {
    return "Thank you for providing the necessary information.\n\nAfter reviewing your company's profile, I am pleased to confirm that your startup appears to meet the general eligibility criteria for DIFC government grants and innovation support programs.\n\nSpecifically:\n• Industry Alignment: Your company operates within a priority sector recognized by DIFC (e.g., FinTech, LegalTech, HealthTech, etc.).\n• Business Stage: Your company's growth stage and innovation profile align well with DIFC's target demographic for grants and startup support.\n• Registration Status: You either maintain an existing presence within the DIFC or are in the process of formal registration, fulfilling a key prerequisite for grant consideration.\n• Compliance Readiness: Based on the information provided, your company is positioned to meet DIFC's regulatory compliance requirements, including data protection, governance standards, and beneficial ownership disclosure.\n\nNext Recommended Actions:\n1. Formal Grant Application: Proceed with submitting a formal application for the specific DIFC grant program(s) aligned with your sector and business objectives.\n2. Supporting Documents Preparation: Ensure you have a complete package of required documentation, including a detailed business plan, financial projections, a company profile, and proof of DIFC registration or licensing application.\n3. Engagement with DIFC Innovation Hub: I recommend contacting the DIFC Innovation Hub directly or applying through the DIFC Innovation Hub Portal to initiate the process.\n\nImportant Note:\nFinal eligibility and grant approval are subject to DIFC's internal review processes, and additional documentation or interviews may be required during evaluation.\nIf you would like, I can also assist you in preparing a tailored checklist of documents and a draft application package to maximize your success.";
  } else if (message.toLowerCase().includes('tax') || message.toLowerCase().includes('refund')) {
    return "Based on the latest UAE tax regulations for 2025, important tax refund dates to note are:\n\n• VAT Refund Filing Deadline: April 28, 2025\n• Corporate Tax Provisional Payment Refund: September 15, 2025\n• Foreign Business VAT Refund Application: October 31, 2025\n• Tourist Tax Refund Claims: Within 90 days of purchase date\n\nPlease note that for the 2025 fiscal year, the Federal Tax Authority (FTA) has implemented a new digital refund processing system that promises faster processing times (5-15 business days vs. the previous 25-40 days).\n\nWould you like me to provide specific documentation requirements for any of these refund applications?";
  } else if (message.toLowerCase().includes('nda') || message.toLowerCase().includes('agreement')) {
    return "I'd be happy to create an NDA tailored to Dubai's legal requirements. To generate a comprehensive NDA that complies with Dubai law, I'll need some specific information:\n\n1. Parties involved:\n   • Full legal name of your company\n   • Full legal name of the other party\n   • Jurisdiction of incorporation for both parties\n\n2. Scope of confidentiality:\n   • What specific information will be protected?\n   • Will the confidentiality be mutual or one-way?\n\n3. Duration:\n   • How long should the confidentiality obligations last? (Note: Under UAE law, restrictive covenants typically shouldn't exceed 2 years)\n\n4. Special provisions:\n   • Any specific industry regulations to consider\n   • Special handling requirements for the confidential information\n\nOnce you provide this information, I can generate a Dubai-compliant NDA that aligns with UAE Federal Law No. 8 of 1980 (Labor Law) and relevant DIFC or Dubai Mainland regulations depending on your specific jurisdiction.";
  } else {
    return "I understand your question. To provide you with the most accurate information about legal matters in the UAE, could you please provide some additional context or specific details about your situation? This will help me tailor my response to your exact needs.";
  }
};
