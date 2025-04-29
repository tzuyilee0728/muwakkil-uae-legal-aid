import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatInput from '../components/ChatInput';
import ActionLog from '../components/ActionLog';
import ChatMessage from '../components/ChatMessage';
import PromptSuggestion from '../components/PromptSuggestion';

const ChatPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock action log steps
  const actionLogSteps = [
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

  // Dummy data for the consultation prompts
  const consultationPrompts = [
    '"Is my company eligible for DIFC\'s government grants?"',
    '"When is the recent tax refund dates?"'
  ];
  
  const documentPrompts = [
    '"Check if [upload documents] are correct"',
    '"Tell me what should I change for [upload documents]"'
  ];
  
  const creationPrompts = [
    '"Create an NDA that apply to Dubai\'s law"',
    '"Fill a 2025 tax report document"'
  ];

  const handleSendMessage = (message: string) => {
    const newMessages = [...messages, { id: Date.now().toString(), content: message, sender: 'user' }];
    setMessages(newMessages);
    
    // Simulate AI response
    setLoading(true);
    setTimeout(() => {
      const responseContent = getResponseForMessage(message);
      setMessages([...newMessages, { 
        id: (Date.now() + 1).toString(), 
        content: responseContent, 
        sender: 'ai' 
      }]);
      setLoading(false);
    }, 2000);
  };

  const handleFileUpload = (file: File) => {
    // Simulate file upload and processing
    const newMessages = [...messages, { 
      id: Date.now().toString(), 
      content: `I've uploaded ${file.name} for analysis.`, 
      sender: 'user' 
    }];
    setMessages(newMessages);
    
    setLoading(true);
    setTimeout(() => {
      setMessages([...newMessages, { 
        id: (Date.now() + 1).toString(), 
        content: `I've analyzed ${file.name}. This document appears to be in compliance with UAE business regulations, but there are two sections that may need review:\n\n• Section 4.2: The non-compete clause duration exceeds the 2-year maximum limit allowed in Dubai.\n• Section 7.1: The governing law should explicitly specify UAE Federal Law rather than just mentioning "applicable laws".\n\nWould you like me to suggest specific revisions for these sections?`, 
        sender: 'ai' 
      }]);
      setLoading(false);
    }, 3000);
  };

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

  useEffect(() => {
    // If this is not a new chat, simulate fetching existing chat history
    if (id && id !== 'new') {
      setLoading(true);
      setTimeout(() => {
        setMessages([
          { id: '1', content: 'Is my company eligible for DIFC\'s government grants?', sender: 'user' },
          { 
            id: '2', 
            content: "Thank you for your inquiry. Before I can provide you with accurate information about your eligibility for DIFC's government grants, I'll need some specific details about your company. Could you please share the following information:\n\n1. Business Activity: What sector does your company operate in?\n2. Stage of Business: Is your company a startup, SME, or larger enterprise?\n3. Registration Status: Are you already registered within DIFC or planning to register?",
            sender: 'ai' 
          }
        ]);
        setLoading(false);
      }, 1000);
    }
  }, [id]);

  // If this is a new chat, show prompt suggestions
  if (id === 'new' && messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col justify-center max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <PromptSuggestion
                title="Professional Consultation"
                icon={
                  <div className="w-16 h-16 rounded-md bg-muwakkil-light flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                }
                examples={consultationPrompts}
                onSelect={handleSendMessage}
              />
              
              <PromptSuggestion
                title="Examine Documents"
                icon={
                  <div className="w-16 h-16 rounded-md bg-muwakkil-light flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <line x1="10" y1="9" x2="8" y2="9"></line>
                    </svg>
                  </div>
                }
                examples={documentPrompts}
                onSelect={handleSendMessage}
              />
              
              <PromptSuggestion
                title="Create Documents"
                icon={
                  <div className="w-16 h-16 rounded-md bg-muwakkil-light flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 11 12 14 22 4"></polyline>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                  </div>
                }
                examples={creationPrompts}
                onSelect={handleSendMessage}
              />
            </div>
          </div>
        </div>
        <ChatInput onSendMessage={handleSendMessage} onFileUpload={handleFileUpload} />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Chat title */}
      {id && id !== 'new' && (
        <div className="border-b border-gray-200 p-4 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-xl font-medium">Eligibility check for DIFC's government grants</h1>
            <p className="text-sm text-gray-500">4/23/25 19:20</p>
          </div>
        </div>
      )}
      
      {/* Messages list */}
      <div className="flex-1 overflow-y-auto chat-container">
        {messages.map((message) => (
          <ChatMessage 
            key={message.id}
            message={message}
            onBookmark={() => console.log('Bookmark', message.id)}
            onCopy={() => console.log('Copy', message.id)}
            onRegenerateResponse={() => console.log('Regenerate', message.id)}
            onFeedback={(type) => console.log('Feedback', type, message.id)}
          />
        ))}
        
        {/* Placeholder for when messages are loading */}
        {loading && (
          <div className="py-6 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <div className="flex items-center space-x-2 text-muwakkil-purple">
                <span>Processing...</span>
                <div className="animate-pulse">●</div>
              </div>
            </div>
          </div>
        )}
        
        {/* Show action log if there are AI messages */}
        {messages.some(m => m.sender === 'ai') && !loading && (
          <div className="max-w-4xl mx-auto px-4">
            <ActionLog steps={actionLogSteps} />
          </div>
        )}
      </div>
      
      {/* Input area */}
      <ChatInput onSendMessage={handleSendMessage} onFileUpload={handleFileUpload} />
    </div>
  );
};

export default ChatPage;
