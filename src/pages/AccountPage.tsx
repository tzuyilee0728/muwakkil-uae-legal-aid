
import React from 'react';
import { User, Settings, LogOut, Bell, Shield } from 'lucide-react';

const AccountPage: React.FC = () => {
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Account</h1>
        
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Profile Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-muwakkil-purple bg-opacity-20 flex items-center justify-center text-muwakkil-purple">
                <User size={28} />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium">Ahmed Al Nakhla</h2>
                <p className="text-gray-600">ahmed@nakhlatechnologies.com</p>
              </div>
              <button className="ml-auto px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                Edit Profile
              </button>
            </div>
          </div>
          
          {/* Subscription Section */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium mb-4">Your Plan</h3>
            
            <div className="flex items-center justify-between p-4 bg-muwakkil-light rounded-md">
              <div>
                <span className="font-medium">Free Trial</span>
                <p className="text-sm text-gray-600 mt-1">7 days left in your trial</p>
              </div>
              <button className="px-4 py-2 bg-muwakkil-purple text-white rounded-md hover:bg-purple-600">
                Upgrade to Pro
              </button>
            </div>
          </div>
          
          {/* Settings Links */}
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Settings</h3>
            
            <nav>
              <ul className="space-y-1">
                <li>
                  <a href="#" className="flex items-center px-4 py-3 rounded-md hover:bg-gray-100">
                    <Bell size={20} className="text-gray-600 mr-3" />
                    <span>Notifications</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center px-4 py-3 rounded-md hover:bg-gray-100">
                    <Shield size={20} className="text-gray-600 mr-3" />
                    <span>Privacy & Security</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center px-4 py-3 rounded-md hover:bg-gray-100">
                    <Settings size={20} className="text-gray-600 mr-3" />
                    <span>Preferences</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center px-4 py-3 text-red-600 rounded-md hover:bg-red-50">
                    <LogOut size={20} className="mr-3" />
                    <span>Sign Out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
