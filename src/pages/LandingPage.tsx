import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { motion } from 'framer-motion';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';

const LandingPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Logo />
            <div className="hidden md:flex items-center space-x-6">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-gray-700 hover:text-muwakkil-purple dark:text-gray-300 dark:hover:text-muwakkil-purple">Solutions</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid grid-cols-2 gap-3 p-4 w-[400px]">
                        <div className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">
                          <h5 className="font-medium text-gray-900 dark:text-white">Document Review</h5>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Get your legal documents analyzed</p>
                        </div>
                        <div className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">
                          <h5 className="font-medium text-gray-900 dark:text-white">Legal Compliance</h5>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Stay compliant with UAE regulations</p>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-gray-700 hover:text-muwakkil-purple dark:text-gray-300 dark:hover:text-muwakkil-purple">Resources</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid grid-cols-1 gap-3 p-4 w-[200px]">
                        <div className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">
                          <h5 className="font-medium text-gray-900 dark:text-white">Knowledge Base</h5>
                        </div>
                        <div className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">
                          <h5 className="font-medium text-gray-900 dark:text-white">Legal Templates</h5>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="#pricing" className="text-gray-700 hover:text-muwakkil-purple dark:text-gray-300 dark:hover:text-muwakkil-purple px-3 py-2">
                      Pricing
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <Link to="/login" className="text-gray-700 hover:text-muwakkil-purple dark:text-gray-300 dark:hover:text-muwakkil-purple">Login</Link>
              <Link to="/signup" className="bg-muwakkil-purple hover:bg-purple-600 text-white px-4 py-2 rounded-md">
                Sign Up
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleTheme} 
                className="mr-2"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <SunIcon className="h-5 w-5" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
              </Button>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleTheme} 
                className="mr-2"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <SunIcon className="h-5 w-5" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
              </Button>
              <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Aurora Background */}
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

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 dark:text-white">How Muwakkil Helps Your Business</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-muwakkil-light rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 dark:text-white">Conversational Legal Help</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Ask any legal question about UAE business law and get instant, accurate responses 
                backed by Federal Law No. 32/2021 and DED regulations.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-muwakkil-light rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 dark:text-white">Smart Document Review</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Upload contracts and legal documents to automatically flag non-compliant clauses 
                and receive guidance on how to fix them.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-muwakkil-light rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 11 12 14 22 4"></polyline>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 dark:text-white">Jurisdiction-Specific Templates</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Generate legally compliant documents tailored to your specific business needs 
                in Dubai Mainland, DIFC, or UAE Free Zones.
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link to="/app" className="bg-muwakkil-purple hover:bg-purple-600 text-white px-6 py-3 rounded-md text-lg font-medium">
              Start Using Muwakkil Today
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 dark:text-white">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg">
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                "Muwakkil has been a game-changer for our startup. We've saved thousands of dirhams in legal fees while ensuring our contracts are fully compliant."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-medium dark:text-white">Sarah Al Mansouri</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">CEO, TechStart UAE</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg">
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                "The document review feature caught several non-compliant clauses that could have caused us problems later. Highly recommend for any business in UAE."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-medium dark:text-white">Ahmed Hassan</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Legal Director, GrowFast</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg">
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                "As someone new to UAE business laws, Muwakkil has been my go-to resource. The AI assistant answers my questions accurately and in plain language."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-medium dark:text-white">Emma Parker</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Founder, ExpatsConnect</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 dark:text-white">Simple, Transparent Pricing</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-2 dark:text-white">Starter</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Perfect for exploring</p>
              <div className="mb-6">
                <span className="text-4xl font-bold dark:text-white">Free</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  10 legal questions per month
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  3 document reviews
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Basic templates
                </li>
              </ul>
              <Link to="/signup" className="block text-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-6 py-3 rounded-md text-lg font-medium">
                Get Started
              </Link>
            </div>
            
            {/* Pro Plan */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border-2 border-muwakkil-purple relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-muwakkil-purple text-white px-4 py-1 rounded-full text-sm">
                Most Popular
              </div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">Professional</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">For growing businesses</p>
              <div className="mb-6">
                <span className="text-4xl font-bold dark:text-white">199 AED</span>
                <span className="text-gray-500 dark:text-gray-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Unlimited legal questions
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  25 document reviews
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  All templates
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Priority support
                </li>
              </ul>
              <Link to="/signup" className="block text-center bg-muwakkil-purple hover:bg-purple-600 text-white px-6 py-3 rounded-md text-lg font-medium">
                Subscribe Now
              </Link>
            </div>
            
            {/* Enterprise Plan */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-2 dark:text-white">Enterprise</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">For larger organizations</p>
              <div className="mb-6">
                <span className="text-4xl font-bold dark:text-white">Custom</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Everything in Professional
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Dedicated account manager
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  API access
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Custom integration
                </li>
              </ul>
              <Link to="/contact" className="block text-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-6 py-3 rounded-md text-lg font-medium">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/806d53db-5eca-4dde-8bc0-159233621293.png"
                alt="Muwakkil Logo"
                className="h-8 w-auto bg-white rounded-md p-1"
              />
              <span className="ml-2 font-bold text-lg">Muwakkil</span>
            </div>
            <p className="text-gray-400">
              AI-powered legal assistant for UAE startups and businesses.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Knowledge Base</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Templates</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Disclaimer</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2025 Muwakkil. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
