import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// 此组件用于在路由变化时滚动到页面顶部
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop; 