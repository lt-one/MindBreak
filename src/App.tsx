import React, { useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/layout/layout';
import { AnimatePresence, motion } from 'framer-motion';

// 使用React.lazy懒加载页面组件
const Home = React.lazy(() => import('./pages/Home'));
const EnglishTraining = React.lazy(() => import('./pages/EnglishTraining'));
const Projects = React.lazy(() => import('./pages/Projects'));
const Blog = React.lazy(() => import('./pages/Blog'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const WebsiteProject = React.lazy(() => import('./pages/WebsiteProject'));
const ChinesePhilosophy = React.lazy(() => import('./pages/ChinesePhilosophy'));
const QuoteGallery = React.lazy(() => import('./components/features/quotes/QuoteGallery'));
const Todo = React.lazy(() => import('./pages/Todo'));

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

// 加载中组件
const LoadingFallback = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-pulse flex flex-col items-center">
      <div className="w-16 h-16 border-t-4 border-b-4 border-accent2 rounded-full animate-spin"></div>
      <p className="mt-4 text-accent font-medium">正在加载中...</p>
    </div>
  </div>
);

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

  return (
    <Layout>
      <Suspense fallback={<LoadingFallback />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/english-training" element={<PageWrapper><EnglishTraining /></PageWrapper>} />
            <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
            <Route path="/website-project" element={<PageWrapper><WebsiteProject /></PageWrapper>} />
            <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
            <Route path="/chinese-philosophy" element={<PageWrapper><ChinesePhilosophy /></PageWrapper>} />
            <Route path="/quotes" element={<PageWrapper><QuoteGallery /></PageWrapper>} />
            <Route path="/todo" element={<PageWrapper><Todo /></PageWrapper>} />
            <Route path="*" element={<PageWrapper><Home /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </Suspense>
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