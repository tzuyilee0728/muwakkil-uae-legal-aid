import React from 'react';
import { Link } from 'react-router-dom';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { motion } from 'framer-motion';
import { RainbowButton } from '@/components/ui/rainbow-button';
const HeroSection: React.FC = () => {
  return <AuroraBackground className="min-h-screen flex items-center">
      <div className="max-w-5xl mx-auto text-center px-4 pt-24 z-10">
        <motion.h1 initial={{
        opacity: 0.0,
        y: 40
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut"
      }} className="text-4xl md:text-5xl font-bold mb-6 text-indigo-950 mx-0 px-0 text-center lg:text-6xl">Empowering UAE Founders with Smart Legal Support</motion.h1>
        
        <motion.p initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 1.0,
        // Added a longer delay so it appears after the H1
        duration: 0.6,
        ease: "easeOut"
      }} className="text-xl mb-10 max-w-3xl mx-auto md:text-lg text-zinc-400">
          Muwakkil makes legal compliance simple with AI-powered document review, generation, and expert legal advice anywhere in UAE.
        </motion.p>
        
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 1.3,
        // Added even more delay for the button
        duration: 0.6,
        ease: "easeOut"
      }} className="flex justify-center">
          <Link to="/app">
            <RainbowButton>Start for Free</RainbowButton>
          </Link>
        </motion.div>
      </div>
    </AuroraBackground>;
};
export default HeroSection;