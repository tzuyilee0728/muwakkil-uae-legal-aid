
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
import { Avatar } from "@/components/ui/avatar";

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

  if (message.sender === 'user') {
    return (
      <div className="py-6 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-end">
            <div className="bg-muwakkil-light rounded-2xl rounded-tr-none px-6 py-4 max-w-[80%]">
              <p>{message.content}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex space-x-3">
          <div className="flex-shrink-0 mt-1">
            <Avatar className="h-8 w-8">
              <img
                src="/lovable-uploads/8d2bf5c3-e087-4c59-92c2-869320739b49.png"
                alt="Muwakkil Logo"
                className="h-8 w-8"
              />
            </Avatar>
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
      </div>
    </div>
  );
};

export default ChatMessage;
