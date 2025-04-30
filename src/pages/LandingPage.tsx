
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return <Navigate to="/home" replace />;
};

export default LandingPage;
