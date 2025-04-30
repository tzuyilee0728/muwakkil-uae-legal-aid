
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/landing/Header';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import PricingSection from '../components/landing/PricingSection';
import Footer from '../components/landing/Footer';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the app's main page on component mount
    navigate('/app/chat');
  }, [navigate]);
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* These components won't render because of the redirect */}
      <Header />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
