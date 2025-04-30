
import React from 'react';
import { Link } from 'react-router-dom';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <AuroraBackground className="min-h-screen flex items-center">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="max-w-5xl mx-auto text-center px-4 pt-24 z-10"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Your super startups' legal assistant
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
          Muwakkil makes UAE mainland legal compliance simple with AI-powered document review, 
          generation, and expert legal advice.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/app" className="bg-muwakkil-purple hover:bg-purple-600 text-white px-8 py-4 rounded-md text-lg font-medium">
            Start for Free
          </Link>
          <a href="#features" className="border border-gray-300 bg-white dark:bg-transparent dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 px-8 py-4 rounded-md text-lg font-medium">
            Learn More
          </a>
        </div>
      </motion.div>
    </AuroraBackground>
  );
};

export default HeroSection;
