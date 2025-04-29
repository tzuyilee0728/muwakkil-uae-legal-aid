
import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface ChatBotButtonProps {
  isAuthenticated?: boolean;
}

const ChatBotButton: React.FC<ChatBotButtonProps> = ({ isAuthenticated = false }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChatClick = () => {
    if (isAuthenticated) {
      navigate('/chat');
    } else {
      toast({
        title: "Authentication Required",
        description: "Please sign in to start a chat and save your history",
        action: (
          <Button 
            variant="default" 
            onClick={() => navigate('/login')}
            className="bg-muwakkil-purple hover:bg-muwakkil-purple/90"
          >
            Sign In
          </Button>
        )
      });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleChatClick}
        className="rounded-full w-14 h-14 bg-muwakkil-purple hover:bg-muwakkil-purple/90 shadow-lg flex items-center justify-center p-0 text-white"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default ChatBotButton;
