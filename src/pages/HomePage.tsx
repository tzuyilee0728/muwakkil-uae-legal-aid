
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/landing/Header';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import PricingSection from '../components/landing/PricingSection';
import Footer from '../components/landing/Footer';
import { Button } from '@/components/ui/button';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  
  // This would come from your authentication system
  // For now, we'll use the mock from App.tsx
  const isAuthenticated = false; // Will be replaced with actual auth state
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      
      {/* Add a call to action based on authentication status */}
      <div className="py-12 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {isAuthenticated ? t('home.welcome_back') : t('home.get_started')}
          </h2>
          <div className="flex justify-center">
            {isAuthenticated ? (
              <Link to="/app/chat">
                <Button className="bg-[#855ECB] hover:bg-[#7346b5] text-white">
                  {t('home.go_to_app')}
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button className="bg-[#855ECB] hover:bg-[#7346b5] text-white">
                  {t('common.login')}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HomePage;
