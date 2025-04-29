
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { 
  BookOpen, Bookmark, User, Scale, MessageSquare, 
} from 'lucide-react';

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
  
  // Main navigation items
  const navItems: NavItem[] = [
    { name: 'Knowledge', icon: <BookOpen size={20} />, path: '/knowledge' },
    { name: 'Bookmarks', icon: <Bookmark size={20} />, path: '/bookmarks' },
    { name: 'Account', icon: <User size={20} />, path: '/account' },
    { name: 'Find a lawyer', icon: <Scale size={20} />, path: '/find-lawyer', badge: 'Pro' },
  ];

  // Sample previous chat items
  const recentChats: ChatItem[] = [
    { id: '1', title: 'File a NDA for all free zon...', path: '/chat/1' },
    { id: '2', title: 'Filing tax in UAE', path: '/chat/2' },
    { id: '3', title: 'Generate TODO list for st...', path: '/chat/3' },
  ];

  return (
    <div className="w-64 h-screen border-r border-gray-200 bg-white flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <Logo />
      </div>
      
      <nav className="flex-1 px-4 pt-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link 
                to={item.path} 
                className={`flex items-center px-2 py-2 rounded-md text-sm ${
                  location.pathname === item.path 
                    ? 'text-muwakkil-purple bg-muwakkil-light font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
                {item.badge && (
                  <span className="ml-auto px-2 py-0.5 text-xs bg-muwakkil-purple text-white rounded border border-muwakkil-purple">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 border-t border-gray-200 pt-4">
          {recentChats.map((chat) => (
            <Link
              key={chat.id}
              to={chat.path}
              className={`flex items-center mb-2 px-2 py-2 rounded-md text-sm ${
                location.pathname === chat.path 
                  ? 'text-muwakkil-purple bg-muwakkil-light font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <MessageSquare size={18} className="mr-3" />
              <span className="truncate">{chat.title}</span>
            </Link>
          ))}
        </div>
      </nav>
      
      <div className="p-4">
        <Link
          to="/chat/new"
          className="w-full flex items-center justify-center px-4 py-3 bg-muwakkil-purple hover:bg-purple-600 text-white rounded-md transition-colors"
        >
          <span className="mr-2">+</span>
          New chat
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
