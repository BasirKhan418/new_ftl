import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBars, 
  FaTimes, 
  FaFlask, 
  FaHome,
  FaInfoCircle,
  FaServicestack,
  FaCogs,
  FaUsers,
  FaGraduationCap,
  FaEnvelope,
  FaBlog
} from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home', icon: FaHome },
    { path: '/about', label: 'About', icon: FaInfoCircle },
    { path: '/services', label: 'Services', icon: FaServicestack },
    { path: '/equipment', label: 'Equipment', icon: FaCogs },
    { path: '/team', label: 'Team', icon: FaUsers },
    // { path: '/blog', label: 'Blog', icon: FaBlog },
    { path: '/contact', label: 'Contact', icon: FaEnvelope },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed w-full h-18 lg:h-20 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-green-900 shadow-lg' 
        : 'bg-green-900 shadow-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity duration-200">
            <div className="relative m-2">
             <img 
                src="/images/Logo.png" 
                alt="GTFTL Logo" 
                className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-18 lg:w-18 object-contain transition-all duration-300 drop-shadow-sm"
              />
              
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-sm sm:text-lg leading-none ${
                scrolled ? 'text-white' : 'text-white'
              }`}>
                GTFTL
              </span>
              <span className={`text-xs sm:text-sm leading-none ${
                scrolled ? 'text-green-200' : 'text-green-100'
              }`}>
                Food Testing Lab
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-baseline space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                      isActive(item.path)
                        ? scrolled
                          ? 'bg-green-100 text-green-800'
                          : 'bg-white bg-opacity-20 text-white'
                        : scrolled
                        ? 'text-gray-300 hover:text-green-400 hover:bg-green-50'
                        : 'text-gray-200 hover:text-white hover:bg-white hover:bg-opacity-10'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
            
            {/* Apply Internship Button */}
            <Link
              to="/internship"
              className={`ml-4 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center space-x-2 ${
                scrolled
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-white bg-opacity-20 text-white hover:bg-white hover:bg-opacity-30'
              }`}
            >
              <FaGraduationCap className="h-4 w-4" />
              <span>Apply Internship</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-colors duration-200 ${
                scrolled
                  ? 'text-gray-300 hover:text-green-400 hover:bg-green-50'
                  : 'text-white hover:text-green-200 hover:bg-white hover:bg-opacity-10'
              }`}
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-green-900 shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center space-x-2 ${
                      isActive(item.path)
                        ? 'bg-green-100 text-green-800'
                        : 'text-gray-300 hover:text-green-400 hover:bg-green-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* Apply Internship Button - Mobile */}
              <Link
                to="/internship"
                onClick={() => setIsOpen(false)}
                className="mt-2 block px-3 py-2 rounded-lg text-base font-semibold bg-green-500 text-white hover:bg-green-600 transition-colors duration-200 flex items-center space-x-2"
              >
                <FaGraduationCap className="h-5 w-5" />
                <span>Apply Internship</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
