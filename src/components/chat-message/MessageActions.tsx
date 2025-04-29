
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

interface MessageActionsProps {
  onBookmark?: () => void;
  onCopy?: () => void;
  onRegenerateResponse?: () => void;
  onFeedback?: (type: 'positive' | 'negative') => void;
  content: string;
}

const MessageActions: React.FC<MessageActionsProps> = ({
  onBookmark,
  onCopy,
  onRegenerateResponse,
  onFeedback,
  content
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    if (onCopy) onCopy();
  };

  return (
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
  );
};

export default MessageActions;
