
import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, RefreshCcw, Copy, Bookmark, Check } from 'lucide-react';
import { cn } from "@/lib/utils";
import { HoverButton } from "@/components/ui/hover-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    sender: 'user' | 'ai';
    timestamp?: string;
  };
  onBookmark?: () => void;
  onCopy?: () => void;
  onRegenerateResponse?: () => void;
  onFeedback?: (type: 'positive' | 'negative') => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  onBookmark,
  onCopy,
  onRegenerateResponse,
  onFeedback,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    if (onCopy) onCopy();
  };

  // Formatting message content with links and lists
  const formattedContent = message.content.split('\n').map((line, i) => {
    if (line.startsWith('•') || line.startsWith('*')) {
      return <li key={i} className="ml-6 list-disc">{line.substring(1).trim()}</li>;
    } else if (line.match(/^\d+\.\s/)) {
      return <li key={i} className="ml-6 list-decimal">{line.substring(line.indexOf('.') + 1).trim()}</li>;
    } else if (line.trim().startsWith('DIFC')) {
      return <a key={i} href="#" className="text-muwakkil-purple underline">{line}</a>;
    } else {
      return <p key={i} className={`${line.trim() === '' ? 'h-4' : ''}`}>{line}</p>;
    }
  });

  return (
    <div className={`py-6 ${message.sender === 'user' ? 'bg-white' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4">
        {message.sender === 'ai' ? (
          <div className="flex space-x-3">
            <div className="flex-shrink-0 mt-1">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-muwakkil-purple to-purple-400 flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3.34 17a10 10 0 1 1 17.32 0"></path>
                  <path d="M3 21h18"></path>
                  <path d="M12 7v4"></path>
                  <path d="M12 15h.01"></path>
                </svg>
              </div>
            </div>
            <div className="flex-grow">
              <div className="prose prose-sm max-w-none">
                {formattedContent}
              </div>
              
              <div className="mt-4 flex items-center space-x-4 text-gray-500">
                <TooltipProvider delayDuration={0}>
                  {/* Copy button */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HoverButton
                        variant="outline"
                        size="icon"
                        className="disabled:opacity-100"
                        onClick={handleCopy}
                        aria-label={isCopied ? "Copied" : "Copy to clipboard"}
                        disabled={isCopied}
                      >
                        <div
                          className={cn(
                            "transition-all",
                            isCopied ? "scale-100 opacity-100" : "scale-0 opacity-0",
                          )}
                        >
                          <Check className="stroke-emerald-500" size={16} strokeWidth={1.5} aria-hidden="true" />
                        </div>
                        <div
                          className={cn(
                            "absolute transition-all",
                            isCopied ? "scale-0 opacity-0" : "scale-100 opacity-100",
                          )}
                        >
                          <Copy size={16} strokeWidth={1.5} aria-hidden="true" />
                        </div>
                      </HoverButton>
                    </TooltipTrigger>
                    <TooltipContent className="px-2 py-1 text-xs">Copy message</TooltipContent>
                  </Tooltip>

                  {/* Like button */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HoverButton
                        variant="outline"
                        size="icon"
                        onClick={() => onFeedback && onFeedback('positive')}
                        aria-label="Like"
                      >
                        <ThumbsUp size={16} strokeWidth={1.5} />
                      </HoverButton>
                    </TooltipTrigger>
                    <TooltipContent className="px-2 py-1 text-xs">Like response</TooltipContent>
                  </Tooltip>

                  {/* Dislike button */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HoverButton
                        variant="outline"
                        size="icon"
                        onClick={() => onFeedback && onFeedback('negative')}
                        aria-label="Dislike"
                      >
                        <ThumbsDown size={16} strokeWidth={1.5} />
                      </HoverButton>
                    </TooltipTrigger>
                    <TooltipContent className="px-2 py-1 text-xs">Dislike response</TooltipContent>
                  </Tooltip>

                  {/* Regenerate button */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HoverButton
                        variant="outline"
                        size="icon"
                        onClick={() => onRegenerateResponse && onRegenerateResponse()}
                        aria-label="Regenerate"
                      >
                        <RefreshCcw size={16} strokeWidth={1.5} />
                      </HoverButton>
                    </TooltipTrigger>
                    <TooltipContent className="px-2 py-1 text-xs">Regenerate response</TooltipContent>
                  </Tooltip>

                  {/* Bookmark button */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HoverButton
                        variant="outline"
                        size="icon"
                        onClick={() => onBookmark && onBookmark()}
                        aria-label="Bookmark"
                      >
                        <Bookmark size={16} strokeWidth={1.5} />
                      </HoverButton>
                    </TooltipTrigger>
                    <TooltipContent className="px-2 py-1 text-xs">Bookmark this response</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-start space-x-3">
            <div className="rounded-full w-8 h-8 bg-gray-200 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className="flex-grow">
              <p>{message.content}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
