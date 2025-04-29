
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const AppLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-12 flex items-center justify-end px-4 border-b border-gray-200 dark:border-gray-800">
          {/* The theme toggle button has been moved to ChatHeader */}
        </div>
        <main className="flex-1 overflow-auto bg-white dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
