import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaLaptopCode, FaRegNewspaper, FaUser, FaEnvelope, FaBook, FaQuoteLeft, FaTasks } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { RiEnglishInput } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';
import { MdKeyboardArrowDown } from 'react-icons/md';

// 导航项接口
interface NavigationItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  children?: NavigationItem[];
}

// 添加组件props接口
interface NavigationProps {
  onItemClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onItemClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const location = useLocation();

  // 检测移动设备
  useEffect(() => {
    const checkIfMobile = () => {
      // 只在屏幕尺寸变化时关闭移动菜单，而不是设置它的状态
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, [isMobileMenuOpen]);

  // 关闭移动菜单
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // 子菜单切换
  const toggleSubmenu = (name: string) => {
    if (openSubmenu === name) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(name);
    }
  };

  // 检查当前路径是否活跃
  const isActivePath = (path: string): boolean => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // 检查子菜单项是否有活跃项
  const hasActiveChild = (items: NavigationItem[]): boolean => {
    return items.some(item => isActivePath(item.path));
  };

  // 导航项列表
  const navigationItems: NavigationItem[] = [
    {
      name: '首页',
      path: '/',
      icon: <FaHome className="text-xl" />,
    },
    {
      name: '项目',
      path: '/projects',
      icon: <FaLaptopCode className="text-xl" />,
    },
    {
      name: '博客',
      path: '/blog',
      icon: <FaRegNewspaper className="text-xl" />,
    },
    { 
      name: '学习', 
      path: '/learning',
      icon: <FaBook className="text-xl" />,
      children: [
        {
          name: '英语学习',
          path: '/english-training',
          icon: <RiEnglishInput className="text-xl" />,
        },
        {
          name: '中国哲学',
          path: '/chinese-philosophy',
          icon: <FaBook className="text-xl" />,
        },
        {
          name: '名人名言',
          path: '/quotes',
          icon: <FaQuoteLeft className="text-xl" />,
        }
      ]
    },
    {
      name: '待办事项',
      path: '/todo',
      icon: <FaTasks className="text-xl" />,
    },
    {
      name: '关于我',
      path: '/about',
      icon: <FaUser className="text-xl" />,
    },
    {
      name: '联系',
      path: '/contact',
      icon: <FaEnvelope className="text-xl" />,
    },
  ];

  // 移动菜单动画
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  // 子菜单动画
  const submenuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      <div className="flex items-center space-x-8">
        {navigationItems.map((item) => (
          <div key={item.name} className="relative group py-2">
            {item.children ? (
              <div className="flex items-center cursor-pointer relative">
                <span 
                  className={`flex items-center mr-1 font-display font-kai relative text-gray-300 hover:text-gray-100 transition-colors duration-200 ${hasActiveChild(item.children) ? 'font-semibold' : ''}`}
                >
                  {item.icon}
                  <span className="ml-1">{item.name}</span>
                  <MdKeyboardArrowDown className="ml-1" />
                  {hasActiveChild(item.children) && (
                    <span className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full"></span>
                  )}
                </span>
                
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      to={child.path}
                      className={`block px-4 py-3 text-sm text-gray-800 hover:bg-indigo-50 flex items-center font-display font-kai ${isActivePath(child.path) ? 'bg-indigo-50 text-indigo-600 font-semibold border-l-4 border-indigo-400' : ''}`}
                      onClick={onItemClick}
                    >
                      {child.icon}
                      <span className="ml-2">{child.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                to={item.path}
                className={`flex items-center font-display relative text-gray-300 hover:text-gray-100 transition-colors duration-200 ${isActivePath(item.path) ? 'font-semibold' : ''}`}
                onClick={onItemClick}
              >
                {item.icon}
                <span className="ml-1 font-kai">{item.name}</span>
                {isActivePath(item.path) && (
                  <span className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full"></span>
                )}
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* 移动导航菜单 */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="fixed top-0 right-0 w-4/5 h-full bg-gray-900 shadow-lg z-50 overflow-y-auto"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold font-display">菜单</h2>
              <button 
                onClick={closeMobileMenu}
                className="p-2 focus:outline-none"
                aria-label="关闭菜单"
              >
                <IoClose size={24} />
              </button>
            </div>
            <div className="p-6">
              {navigationItems.map((item) => (
                <div key={item.name} className="mb-4">
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => toggleSubmenu(item.name)}
                        className={`w-full text-left flex items-center justify-between p-2 rounded-md font-display relative ${hasActiveChild(item.children) ? 'bg-gray-800 font-semibold text-gray-100' : 'text-gray-300 hover:text-gray-100 hover:bg-gray-800'}`}
                      >
                        <span className="flex items-center">
                          {item.icon}
                          <span className="ml-2 font-kai">{item.name}</span>
                        </span>
                        <div className="flex items-center">
                          {hasActiveChild(item.children) && (
                            <span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span>
                          )}
                          <MdKeyboardArrowDown className={`transition-transform duration-300 ${openSubmenu === item.name ? 'rotate-180' : ''}`} />
                        </div>
                      </button>
                      <AnimatePresence>
                        {openSubmenu === item.name && (
                          <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={submenuVariants}
                            className="ml-4 mt-1 overflow-hidden"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.name}
                                to={child.path}
                                className={`flex items-center p-2 mt-1 rounded-md font-display relative ${isActivePath(child.path) ? 'bg-gray-700 font-semibold text-gray-100' : 'text-gray-300 hover:text-gray-100 hover:bg-gray-800'}`}
                                onClick={() => {
                                  closeMobileMenu();
                                  if (onItemClick) onItemClick();
                                }}
                              >
                                <span className="flex items-center flex-1">
                                  {child.icon}
                                  <span className="ml-2 font-kai">{child.name}</span>
                                </span>
                                {isActivePath(child.path) && (
                                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                )}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`flex items-center p-2 rounded-md font-display relative ${isActivePath(item.path) ? 'bg-gray-700 font-semibold text-gray-100' : 'text-gray-300 hover:text-gray-100 hover:bg-gray-800'}`}
                      onClick={() => {
                        closeMobileMenu();
                        if (onItemClick) onItemClick();
                      }}
                    >
                      <span className="flex items-center flex-1">
                        {item.icon}
                        <span className="ml-2 font-kai">{item.name}</span>
                      </span>
                      {isActivePath(item.path) && (
                        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation; 