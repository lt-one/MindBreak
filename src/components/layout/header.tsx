import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './navigation';
import MindBreakIcon from '../../Logo/MindBreakIcon';

interface HeaderProps {
  onNavigate?: (path: string) => void;
}

const Header: React.FC<HeaderProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 处理导航点击


  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gradient-to-r from-white via-gray-800 to-black shadow-md py-3' 
          : 'bg-gradient-to-r from-white via-gray-800 to-black py-4'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
          <MindBreakIcon size={32} />
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900">见心光</span>
            <span className="text-xs text-gray-500">MindBreak</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <Navigation onItemClick={closeMenu} />
        </div>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={toggleMenu}
          aria-label={isMobileMenuOpen ? "关闭菜单" : "打开菜单"}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white ${
          isMobileMenuOpen ? 'max-h-96 shadow-md' : 'max-h-0'
        }`}
      >
        <div className="p-4">
          <Navigation onItemClick={closeMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;