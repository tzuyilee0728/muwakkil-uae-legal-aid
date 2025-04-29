
import React from 'react';
import { Outlet } from 'react-router-dom';
import Logo from '../components/Logo';

const AuthLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Logo />
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
