import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import FoodFinder from './pages/FoodFinder';
import EnglishTraining from './pages/EnglishTraining';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import Layout from './components/layout/layout';
import L from 'leaflet';
import WebsiteProject from './pages/WebsiteProject';
import ChinesePhilosophy from './pages/ChinesePhilosophy';
import QuoteGallery from './components/features/quotes/QuoteGallery';
import 'leaflet/dist/leaflet.css';
import { AnimatePresence, motion } from 'framer-motion';
import FoodAtlas from './pages/FoodAtlas';

// 页面过渡动画配置
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98
  }
};

const pageTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  duration: 0.4
};

// 页面包装组件 - 添加过渡动画
const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="exit"
    variants={pageVariants}
    transition={pageTransition}
    className="w-full"
  >
    {children}
  </motion.div>
);

// 核心路由组件 - 处理导航和内容渲染
const AppRoutes = () => {
  const location = useLocation();
  
  // 监听路径变化，滚动到页面顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // 修复Leaflet图标问题
  useEffect(() => {
    // 确保Leaflet默认图标能正确加载
    const fixLeafletIcon = () => {
      // @ts-ignore: Leaflet的内部属性不是公开的类型
      delete L.Icon.Default.prototype._getIconUrl;
      
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    };
    
    fixLeafletIcon();
  }, []);

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/food-finder" element={<PageWrapper><FoodFinder /></PageWrapper>} />
          <Route path="/food-atlas" element={<PageWrapper><FoodAtlas /></PageWrapper>} />
          <Route path="/english-training" element={<PageWrapper><EnglishTraining /></PageWrapper>} />
          <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
          <Route path="/website-project" element={<PageWrapper><WebsiteProject /></PageWrapper>} />
          <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path="/chinese-philosophy" element={<PageWrapper><ChinesePhilosophy /></PageWrapper>} />
          <Route path="/quotes" element={<PageWrapper><QuoteGallery /></PageWrapper>} />
          <Route path="*" element={<PageWrapper><Home /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
};

// 主应用组件
function App() {
  return (
    <div className="react-router-wrapper">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App; 