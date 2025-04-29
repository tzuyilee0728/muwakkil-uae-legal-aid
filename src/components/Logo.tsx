
import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <div className="w-8 h-8 rounded-md bg-gradient-to-br from-muwakkil-purple to-purple-400 flex items-center justify-center text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3.34 17a10 10 0 1 1 17.32 0"></path>
          <path d="M3 21h18"></path>
          <path d="M12 7v4"></path>
          <path d="M12 15h.01"></path>
        </svg>
      </div>
      <span className="font-bold text-xl">Muwakkil</span>
    </Link>
  );
};

export default Logo;
