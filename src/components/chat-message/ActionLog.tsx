
import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ActionLogStep {
  text: string;
  source?: string;
  document?: string;
}

interface ActionLogProps {
  steps: ActionLogStep[];
}

const ActionLog: React.FC<ActionLogProps> = ({ steps }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  if (steps.length === 0) return null;
  
  return (
    <div className="flex-shrink-0">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="rounded-md bg-gray-50 border"
      >
        <CollapsibleTrigger asChild>
          <button className="flex items-center space-x-2 py-1 px-3 text-sm text-gray-600 rounded hover:bg-gray-100">
            <span>Action Log</span>
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ScrollArea className="h-[200px] w-[250px]">
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
          </ScrollArea>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ActionLog;
