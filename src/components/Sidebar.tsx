
import React from 'react';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { BookOpen, Bookmark, User, Scale, MessageSquare, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NavItem {
  name: string;
  icon: React.ReactNode;
  path: string;
  badge?: string;
}

interface ChatItem {
  id: string;
  title: string;
  path: string;
}

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentChatId = searchParams.get('id');

  // Main navigation items
  const navItems: NavItem[] = [{
    name: 'Knowledge',
    icon: <BookOpen size={20} />,
    path: '/knowledge'
  }, {
    name: 'Bookmarks',
    icon: <Bookmark size={20} />,
    path: '/bookmarks'
  }, {
    name: 'Account',
    icon: <User size={20} />,
    path: '/account'
  }, {
    name: 'Find a lawyer',
    icon: <Scale size={20} />,
    path: '/find-lawyer',
    badge: 'Pro'
  }];

  // Sample previous chat items
  const recentChats: ChatItem[] = [{
    id: '1',
    title: 'File a NDA for all free zon...',
    path: '/chat?id=1'
  }, {
    id: '2',
    title: 'Filing tax in UAE',
    path: '/chat?id=2'
  }, {
    id: '3',
    title: 'Generate TODO list for st...',
    path: '/chat?id=3'
  }];

  // Check if the current path is a chat with a specific ID
  const isActiveChatPath = (path: string) => {
    return location.pathname === '/chat' && 
           searchParams.get('id') === path.split('=')[1];
  };

  const handleNewChat = () => {
    // Clear any existing chat ID by navigating to /chat without params
    navigate('/chat');
    
    toast({
      title: "New Chat",
      description: "Started a new chat session",
    });
  };

  const handleSignOut = () => {
    // In a real app, you would call your auth service's logout method here
    toast({
      title: "Signed Out",
      description: "You have been signed out successfully",
    });
    
    // Navigate to home page after signing out
    navigate('/');
  };

  return (
    <div className="w-64 h-screen border-r border-gray-200 bg-white flex flex-col dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <Logo />
      </div>
      
      <nav className="flex-1 px-4 pt-4">
        <ul className="space-y-2">
          {navItems.map(item => (
            <li key={item.name}>
              <Link 
                to={item.path} 
                className={`flex items-center px-2 py-2 rounded-md text-sm ${
                  location.pathname === item.path ? 'text-[#855ECB] bg-muwakkil-light font-medium dark:bg-gray-700 dark:text-muwakkil-purple' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
                {item.badge && (
                  <span className="ml-auto px-2 py-0.5 text-xs text-[#855ECB] rounded border border-[#855ECB]">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-4">
          {recentChats.map(chat => (
            <Link 
              key={chat.id} 
              to={chat.path} 
              className={`flex items-center mb-2 px-2 py-2 rounded-md text-sm ${
                isActiveChatPath(chat.path) ? 'text-[#855ECB] bg-muwakkil-light font-medium dark:bg-gray-700 dark:text-muwakkil-purple' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <MessageSquare size={18} className="mr-3" />
              <span className="truncate">{chat.title}</span>
            </Link>
          ))}
        </div>
      </nav>
      
      <div className="p-4 space-y-3">
        <button 
          onClick={handleNewChat}
          className="w-full flex items-center justify-center px-4 bg-[#855ECB] hover:bg-[#7346b5] text-white rounded-md transition-colors py-[8px] dark:bg-muwakkil-purple dark:hover:bg-muwakkil-purple/80"
        >
          <span className="mr-2">+</span>
          New chat
        </button>
        
        <button 
          onClick={handleSignOut}
          className="w-full flex items-center justify-center px-4 text-red-600 hover:bg-red-50 rounded-md transition-colors py-[8px] border border-red-200 dark:hover:bg-red-900/20 dark:border-red-800"
        >
          <LogOut size={18} className="mr-2" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
