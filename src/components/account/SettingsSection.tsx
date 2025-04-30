
import React from 'react';
import { Bell, Shield, Settings } from 'lucide-react';

const SettingsSection: React.FC = () => {
  return (
    <div className="p-6">
      <h3 className="text-lg font-medium mb-4 dark:text-white">Settings</h3>
      
      <nav>
        <ul className="space-y-1">
          <li>
            <a href="#" className="flex items-center px-4 py-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200">
              <Bell size={20} className="text-gray-600 mr-3 dark:text-gray-400" />
              <span>Notifications</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200">
              <Shield size={20} className="text-gray-600 mr-3 dark:text-gray-400" />
              <span>Privacy & Security</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200">
              <Settings size={20} className="text-gray-600 mr-3 dark:text-gray-400" />
              <span>Preferences</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SettingsSection;
