import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Logo />
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-[#855ECB]">Home</a>
              <a href="#" className="text-gray-700 hover:text-[#855ECB]">Pricing</a>
              <a href="#" className="text-gray-700 hover:text-[#855ECB]">About</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-700 hover:text-[#855ECB]">Login</Link>
              <Link to="/signup" className="bg-[#855ECB] hover:bg-purple-600 text-white px-4 py-2 rounded-md">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            The UAE Legal Assistant <span className="text-muwakkil-purple">Startups Trust</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Muwakkil makes UAE mainland legal compliance simple with AI-powered document review, 
            generation, and expert legal advice.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/app" className="bg-muwakkil-purple hover:bg-purple-600 text-white px-8 py-4 rounded-md text-lg font-medium">
              Start for Free
            </Link>
            <a href="#features" className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-md text-lg font-medium">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">How Muwakkil Helps Your Business</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-muwakkil-light rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Conversational Legal Help</h3>
              <p className="text-gray-600">
                Ask any legal question about UAE business law and get instant, accurate responses 
                backed by Federal Law No. 32/2021 and DED regulations.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-muwakkil-light rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Smart Document Review</h3>
              <p className="text-gray-600">
                Upload contracts and legal documents to automatically flag non-compliant clauses 
                and receive guidance on how to fix them.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-muwakkil-light rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 11 12 14 22 4"></polyline>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Jurisdiction-Specific Templates</h3>
              <p className="text-gray-600">
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

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
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
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-white">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Disclaimer</a></li>
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
