
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link to="/" className="flex justify-center items-center">
            <div className="w-12 h-12 rounded-md bg-gradient-to-br from-muwakkil-purple to-purple-400 flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3.34 17a10 10 0 1 1 17.32 0"></path>
                <path d="M3 21h18"></path>
                <path d="M12 7v4"></path>
                <path d="M12 15h.01"></path>
              </svg>
            </div>
          </Link>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
