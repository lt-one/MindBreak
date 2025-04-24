import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface NavigationProps {
  onItemClick: (path: string) => void;
}

// 定义导航项类型
interface NavItem {
  name: string;
  path: string;
  icon: string;
  children?: {
    name: string;
    path: string;
    icon: string;
  }[];
}

const Navigation = ({ onItemClick }: NavigationProps) => {
  // 移动设备下拉菜单状态（移动设备不支持hover）
  const [mobileOpenMenu, setMobileOpenMenu] = useState<string | null>(null);
  // 检测是否为移动设备
  const [isMobile, setIsMobile] = useState(false);
  // 获取当前路径
  const location = useLocation();

  // 检测设备类型
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // 初始检测
    checkIsMobile();
    
    // 窗口大小变化时重新检测
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // 切换移动设备下拉菜单
  const toggleMobileMenu = (name: string) => {
    if (isMobile) {
      setMobileOpenMenu(mobileOpenMenu === name ? null : name);
    }
  };

  // 检查当前路径是否与导航项匹配
  const isPathActive = (path: string, currentPath: string): boolean => {
    if (path === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(path);
  };

  // 检查子菜单中是否有当前活动路径
  const hasActiveChild = (children: { path: string }[], currentPath: string): boolean => {
    return children.some(child => isPathActive(child.path, currentPath));
  };

  // 重组导航栏结构，将相关页面归类
  const navItems: NavItem[] = [
    { name: '首页', path: '/', icon: '🏠' },
    { name: '项目', path: '/projects', icon: '💻' },
    { name: '博客', path: '/blog', icon: '📝' },
    { 
      name: '美食', 
      path: '/food-atlas', 
      icon: '🍲'
    },
    { 
      name: '学习', 
      path: '#', 
      icon: '📚',
      children: [
        { name: '英语学习', path: '/english-training', icon: '📚' },
        { name: '中国哲学', path: '/chinese-philosophy', icon: '☯️' },
        { name: '智慧语录', path: '/quotes', icon: '💭' }
      ]
    },
    { name: '关于我', path: '/about', icon: '👤' },
    { name: '联系', path: '/contact', icon: '📞' },
  ];

  const currentPath = location.pathname;

  return (
    <nav className="w-full md:w-auto">
      <ul className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-1">
        {navItems.map((item) => (
          <li key={item.name} className={`relative ${!isMobile && item.children ? 'group' : ''}`}>
            {item.children ? (
              // 有子菜单的导航项 - 使用悬停效果（桌面端）或点击效果（移动端）
              <div className="relative">
                <div
                  onClick={() => toggleMobileMenu(item.name)}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-200 font-medium text-base
                    text-white hover:text-gray-200 hover:bg-secondary cursor-pointer
                    ${hasActiveChild(item.children, currentPath) ? 'bg-accent2/20 font-semibold' : ''}`}
                >
                  <span className="flex items-center justify-between">
                    <span className="flex items-center">
                      <span className="md:hidden mr-3">{item.icon}</span>
                      <span>{item.name}</span>
                      {hasActiveChild(item.children, currentPath) && (
                        <span className="inline-block w-1.5 h-1.5 bg-white rounded-full ml-2"></span>
                      )}
                    </span>
                    <svg 
                      className={`w-4 h-4 ml-1 transition-transform ${!isMobile ? 'group-hover:rotate-180' : mobileOpenMenu === item.name ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </div>
                {/* 下拉菜单 - 桌面端悬停显示，移动端点击显示 */}
                <ul className={`
                  ${!isMobile 
                    ? 'invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out' 
                    : mobileOpenMenu === item.name ? 'block' : 'hidden'
                  }
                  ${!isMobile ? 'absolute' : 'relative'} ${!isMobile ? 'top-full left-0' : ''}
                  mt-1 min-w-[180px] bg-gray-800 rounded-lg shadow-lg overflow-hidden z-10`}
                >
                  {item.children.map((child) => (
                    <li key={child.path}>
                      <NavLink
                        to={child.path}
                        onClick={() => {
                          onItemClick(child.path);
                          setMobileOpenMenu(null);
                        }}
                        className={({ isActive }) => `block px-3 py-2 transition-all duration-200 font-medium text-sm
                          ${isActive
                            ? 'bg-accent2/20 text-white' 
                            : 'text-gray-200 hover:text-white hover:bg-gray-700'
                          }`
                        }
                      >
                        <span className="flex items-center">
                          <span className="mr-2">{child.icon}</span>
                          <span>{child.name}</span>
                          {isPathActive(child.path, currentPath) && (
                            <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></span>
                          )}
                        </span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              // 没有子菜单的导航项
              <NavLink 
                to={item.path}
                onClick={() => {
                  onItemClick(item.path);
                  setMobileOpenMenu(null);
                }}
                className={({ isActive }) => `block px-3 py-2 rounded-lg transition-all duration-200 font-medium text-base
                  ${isActive
                    ? 'bg-accent2/10 text-white font-semibold' 
                    : 'text-white hover:text-gray-200 hover:bg-secondary'
                  }`
                }
              >
                <span className="flex items-center">
                  <span className="md:hidden mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                  {isPathActive(item.path, currentPath) && item.path !== '/' && (
                    <span className="inline-block w-1.5 h-1.5 bg-white rounded-full ml-2"></span>
                  )}
                </span>
              </NavLink>
            )}
          </li>
        ))}
        <li>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden md:flex items-center ml-4 text-white hover:text-gray-100 transition-colors duration-200"
            aria-label="GitHub"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation; 