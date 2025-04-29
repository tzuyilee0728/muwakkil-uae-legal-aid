
import React from 'react';
import { Outlet } from 'react-router-dom';
import Logo from '../components/Logo';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon } from 'lucide-react';

const AuthLayout: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center relative">
            <Logo />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              className="absolute right-0 top-0"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
