
import React from 'react';
import { Link } from 'react-router-dom';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return <AuroraBackground className="min-h-screen flex items-center">
      <div className="max-w-5xl mx-auto text-center px-4 pt-24 z-10">
        <motion.h1 
          initial={{
            opacity: 0.0,
            y: 40
          }} 
          animate={{
            opacity: 1,
            y: 0
          }} 
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut"
          }} 
          className="text-4xl md:text-5xl font-bold mb-6 text-indigo-950 mx-0 px-0 lg:text-6xl"
        >
          Your super startup's legal assistant
        </motion.h1>
        
        <motion.p 
          initial={{
            opacity: 0,
            y: 20
          }} 
          animate={{
            opacity: 1,
            y: 0
          }} 
          transition={{
            delay: 1.0, // Added a longer delay so it appears after the H1
            duration: 0.6,
            ease: "easeOut"
          }} 
          className="text-xl mb-10 max-w-3xl mx-auto md:text-lg text-zinc-400"
        >
          Muwakkil makes legal compliance simple with AI-powered document review, generation, and expert legal advice anywhere in UAE.
        </motion.p>
        
        <motion.div 
          initial={{
            opacity: 0,
            y: 20
          }} 
          animate={{
            opacity: 1,
            y: 0
          }} 
          transition={{
            delay: 1.3, // Added even more delay for the buttons
            duration: 0.6,
            ease: "easeOut"
          }} 
          className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <Link to="/app" className="bg-muwakkil-purple hover:bg-purple-600 text-white px-8 py-4 rounded-md text-lg font-medium">
            Start for Free
          </Link>
          <a href="#features" className="border border-gray-300 bg-white dark:bg-transparent dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 px-8 py-4 rounded-md text-lg font-medium">
            Learn More
          </a>
        </motion.div>
      </div>
    </AuroraBackground>;
};

export default HeroSection;
