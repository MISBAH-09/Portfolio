
import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Misbah Sehar
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="relative text-gray-700 hover:text-blue-600 transition-colors duration-300 group"
              >
                {item.name}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </button>
            ))}
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="https://www.linkedin.com/in/misbah-sahar-898825282/" target="_blank" rel="noopener noreferrer" 
               className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-300">
              <Linkedin size={20} />
            </a>
            <a href="https://github.com/MISBAH-09" target="_blank" rel="noopener noreferrer"
               className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-300">
              <Github size={20} />
            </a>
            <a
              href="mailto:saharmisbah69@gmail.com"
              className="p-2 text-gray-600 hover:text-red-500 transition-colors duration-300 inline-flex items-center"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              {hover ? (
                <span className="text-sm select-none">saharmisbah69@gmail.com</span>
              ) : (
                <Mail size={20} />
              )}
            </a>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors duration-300"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-300"
              >
                {item.name}
              </button>
            ))}
            <div className="flex items-center justify-center space-x-4 pt-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                 className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-300">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                 className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-300">
                <Github size={20} />
              </a>
              <a href="mailto:sahrmisbah69@gmail.com"
                 className="p-2 text-gray-600 hover:text-red-500 transition-colors duration-300">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
