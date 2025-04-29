
import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface ActionLogStep {
  text: string;
  source?: string;
  document?: string;
}

interface ActionLogProps {
  steps: ActionLogStep[];
}

const ActionLog: React.FC<ActionLogProps> = ({ steps }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="my-4 border rounded-md bg-gray-50">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full p-3 text-left"
      >
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-muwakkil-purple bg-opacity-10 flex items-center justify-center mr-2">
            <div className="w-4 h-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
          </div>
          <span className="font-medium">Action Log</span>
        </div>
        {expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>
      
      <div className={`action-log-content ${expanded ? 'expanded' : ''}`}>
        <div className="p-3 border-t">
          {steps.map((step, index) => (
            <div key={index} className="mb-3 last:mb-0">
              <div className="flex items-center mb-1">
                {step.document ? (
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center mr-2">
                    {index + 1}
                  </div>
                )}
                <p className="text-sm">{step.text}</p>
              </div>
              
              {step.source && (
                <div className="ml-7 text-xs text-gray-500">
                  {step.source}
                </div>
              )}
              
              {step.document && (
                <div className="ml-7 text-xs text-muwakkil-purple cursor-pointer">
                  {step.document}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActionLog;
