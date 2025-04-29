
import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, RefreshCcw, Copy, Bookmark, Check, BookmarkCheck } from 'lucide-react';
import { cn } from "@/lib/utils";
import { HoverButton } from "@/components/ui/hover-button";
import { useToast } from "@/hooks/use-toast";
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
  isBookmarked?: boolean;
}

const MessageActions: React.FC<MessageActionsProps> = ({
  onBookmark,
  onCopy,
  onRegenerateResponse,
  onFeedback,
  content,
  isBookmarked = false
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    if (onCopy) onCopy();
    
    toast({
      title: "Copied",
      description: "Content copied to clipboard",
    });
    
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleBookmark = () => {
    setBookmarked(true);
    if (onBookmark) onBookmark();
    
    toast({
      title: "Bookmarked",
      description: "This message has been saved to your bookmarks.",
    });
  };

  return (
    <div className="mt-4 flex items-center space-x-4 text-gray-500 dark:text-gray-400">
      <TooltipProvider delayDuration={0}>
        {/* Copy button - Fixed positioning issue */}
        <Tooltip>
          <TooltipTrigger asChild>
            <HoverButton
              variant="outline"
              size="icon"
              className="relative disabled:opacity-100 border-0 w-8 h-8"
              onClick={handleCopy}
              aria-label={isCopied ? "Copied" : "Copy to clipboard"}
              disabled={isCopied}
            >
              {isCopied ? (
                <Check className="stroke-emerald-500 absolute inset-0 m-auto" size={16} strokeWidth={1.5} aria-hidden="true" />
              ) : (
                <Copy className="absolute inset-0 m-auto" size={16} strokeWidth={1.5} aria-hidden="true" />
              )}
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
              className="border-0"
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
              className="border-0"
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
              className="border-0"
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
              className="border-0"
              onClick={handleBookmark}
              aria-label="Bookmark"
              disabled={bookmarked}
            >
              {bookmarked ? (
                <BookmarkCheck size={16} strokeWidth={1.5} className="text-muwakkil-purple dark:text-primary" />
              ) : (
                <Bookmark size={16} strokeWidth={1.5} />
              )}
            </HoverButton>
          </TooltipTrigger>
          <TooltipContent className="px-2 py-1 text-xs">
            {bookmarked ? "Bookmarked" : "Bookmark this response"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default MessageActions;
