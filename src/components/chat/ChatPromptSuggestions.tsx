
import React from 'react';
import PromptSuggestion from '../PromptSuggestion';
import { TextShimmer } from '../ui/text-shimmer';

interface ChatPromptSuggestionsProps {
  onSelectPrompt: (message: string) => void;
}

const ChatPromptSuggestions: React.FC<ChatPromptSuggestionsProps> = ({ onSelectPrompt }) => {
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

  return (
    <div className="flex-1 overflow-hidden">
      <div className="h-full flex flex-col justify-center max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <TextShimmer
            as="h1"
            className="text-4xl font-bold [--base-color:theme(colors.red.500)] [--base-gradient-color:theme(colors.red.300)] dark:[--base-color:theme(colors.red.500)] dark:[--base-gradient-color:theme(colors.red.300)]"
            duration={1.5}
          >
            Hey, How are you?
          </TextShimmer>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <PromptSuggestion
            title="Professional Consultation"
            icon={
              <div className="w-16 h-16 rounded-md bg-muwakkil-light dark:bg-sidebar-accent flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
            }
            examples={consultationPrompts}
            onSelect={onSelectPrompt}
          />
          
          <PromptSuggestion
            title="Examine Documents"
            icon={
              <div className="w-16 h-16 rounded-md bg-muwakkil-light dark:bg-sidebar-accent flex items-center justify-center">
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
            onSelect={onSelectPrompt}
          />
          
          <PromptSuggestion
            title="Create Documents"
            icon={
              <div className="w-16 h-16 rounded-md bg-muwakkil-light dark:bg-sidebar-accent flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 11 12 14 22 4"></polyline>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
              </div>
            }
            examples={creationPrompts}
            onSelect={onSelectPrompt}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPromptSuggestions;
