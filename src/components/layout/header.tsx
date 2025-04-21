import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import Navigation from './navigation';
import MindBreakIcon from '../../Logo/MindBreakIcon';

interface HeaderProps {
  onNavigate?: (path: string) => void;
}

// // 面包屑导航路径映射
// const pathMap: Record<string, string> = {
//   '/': '首页',
//   '/projects': '项目',
//   '/blog': '博客',
//   '/food-finder': '美食探索',
//   '/food-atlas': '食物图鉴',
//   '/english-training': '英语学习',
//   '/chinese-philosophy': '中国哲学',
//   '/quotes': '智慧语录',
//   '/about': '关于我',
//   '/contact': '联系'
// };

const Header: React.FC<HeaderProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const location = useLocation();

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 控制移动端菜单打开时锁定背景滚动
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMobileMenuOpen]);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  // // 生成面包屑路径 - 移除此功能，但保留函数以防未来需要
  // const generateBreadcrumb = () => {
  //   return null; // 不再生成面包屑导航
  // };

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
          className="md:hidden text-white p-2 rounded-lg transition-colors duration-200 hover:bg-white/10"
          onClick={toggleMenu}
          aria-label={isMobileMenuOpen ? "关闭菜单" : "打开菜单"}
          aria-expanded={isMobileMenuOpen}
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
      
      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-white/50 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
      
      {/* Mobile Navigation */}
      <div 
        className={`md:hidden fixed left-0 right-0 top-[calc(var(--header-height,72px))] bottom-0 z-40 overflow-auto bg-black transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ 
          maxHeight: isMobileMenuOpen ? 'calc(100vh - var(--header-height,72px))' : '0',
          '--header-height': isScrolled ? '64px' : '72px'
        } as React.CSSProperties}
      >
        <div className="p-4 h-full overflow-auto">
          <Navigation onItemClick={closeMenu} />
          <div className="mt-8 pt-8 border-t border-gray-100">
            <div className="flex flex-wrap gap-4 justify-center">
              <a 
                href="https://github.com/lt-one" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm2.559 5.482l-2.443 2.396c-2.008 1.972-3.429 3.374-3.429 5.101 0 1.638 1.281 2.774 3.097 2.774.894 0 1.788-.402 2.434-.89l.812 1.337c-.644.521-1.864 1.101-3.278 1.101-2.615 0-4.599-1.802-4.599-4.365 0-2.214 1.708-4.108 4.608-7.003l1.154-1.135v-.037h-5.113v-2.038h8.747v1.764l-1.99 1.995z"/>
                </svg>
                GitHub
              </a>
              <a 
                href="https://space.bilibili.com/51125264" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906L17.813 4.653z" />
                </svg>
                哔哩哔哩
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;