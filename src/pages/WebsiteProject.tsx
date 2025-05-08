import React from 'react';
import { Link } from 'react-router-dom';

// 技术图标组件
const TechIcon: React.FC<{ name: string }> = ({ name }) => {
  // 根据技术名称获取适当的颜色类
  const getColorClass = () => {
    const colors: {[key: string]: string} = {
      'React': 'bg-blue-100 text-blue-700',
      'TypeScript': 'bg-blue-900 text-blue-50',
      'Tailwind CSS': 'bg-cyan-100 text-cyan-800',
      'Vite': 'bg-purple-100 text-purple-800',
      'React Router': 'bg-red-100 text-red-700',
      'Leaflet': 'bg-green-100 text-green-800',
      'Git': 'bg-orange-100 text-orange-700',
      'npm': 'bg-red-50 text-red-600',
      'ESLint': 'bg-violet-100 text-violet-800',
      'PostCSS': 'bg-fuchsia-100 text-fuchsia-800'
    };
    return colors[name] || 'bg-gray-100 text-gray-800';
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-md text-sm font-medium ${getColorClass()}`}>
      {name}
    </span>
  );
};

// 工作流程步骤组件
const ProcessStep: React.FC<{
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
}> = ({ number, title, description, isLast = false }) => (
  <div className="relative">
    <div className="flex items-start">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 text-white font-bold text-lg shrink-0 z-10">
        {number}
      </div>
      <div className="ml-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-8">{description}</p>
      </div>
    </div>
    {!isLast && (
      <div className="absolute top-0 left-6 h-full w-0.5 bg-indigo-100 transform -translate-x-1/2 z-0"></div>
    )}
  </div>
);

// 功能项组件
const FeatureItem: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
}> = ({ title, description, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="text-indigo-600 text-3xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

// 示例代码组件
const CodeSnippet: React.FC<{ code: string; language: string; title: string }> = ({ code, language, title }) => (
  <div className="mb-8 overflow-hidden rounded-lg border border-gray-200">
    <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center">
      <div className="flex space-x-2 mr-4">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <span className="text-sm font-medium text-gray-600">{title}</span>
    </div>
    <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto text-sm">
      <code className={`language-${language}`}>
        {code}
      </code>
    </pre>
  </div>
);

// 开发统计卡组件
const StatCard: React.FC<{
  value: string;
  label: string;
  icon: React.ReactNode;
}> = ({ value, label, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
    <div className="flex items-center">
      <div className="text-indigo-600 text-3xl mr-4">{icon}</div>
      <div>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </div>
  </div>
);

const WebsiteProject: React.FC = () => {
  // 示例代码
  const reactComponentCode = `const NavigationComponent: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // 检查当前路径是否活跃
  const isActivePath = (path: string): boolean => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };
  
  return (
    <nav className="flex justify-between items-center w-full py-4 px-6">
      <div className="flex items-center">
        <Link to="/" className="text-xl font-bold">我的个人网站</Link>
      </div>
      
      <div className="hidden lg:flex space-x-6">
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={\`flex items-center \${isActivePath(item.path) ? 'text-primary-600 font-semibold' : ''}\`}
          >
            {item.icon}
            <span className="ml-1">{item.name}</span>
          </Link>
        ))}
      </div>
      
      {/* 移动导航按钮 */}
      <div className="lg:hidden">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? '关闭' : '菜单'}
        </button>
      </div>
    </nav>
  );
};`;

  const tailwindCode = `// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          // ... 其他色阶
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}`;

  return (
    <>
      {/* 页面头部 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-indigo-100 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block bg-indigo-100 text-indigo-800 text-sm font-semibold px-4 py-2 rounded-full uppercase tracking-wide mb-4">
                前端开发 | 2024年项目
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                个人品牌网站开发 - MindBreak
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                使用现代前端技术栈打造专业的数据分析师个人品牌展示网站，结合专业技能展示与项目展示功能
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <TechIcon name="React" />
                <TechIcon name="TypeScript" />
                <TechIcon name="Tailwind CSS" />
                <TechIcon name="Vite" />
                <TechIcon name="React Router" />
                <TechIcon name="Leaflet" />
              </div>
              <div className="flex justify-center gap-4">
                <a 
                  href="#overview" 
                  className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition shadow-sm"
                >
                  查看项目详情
                </a>
                <Link 
                  to="/" 
                  className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-lg border border-indigo-600 hover:bg-indigo-50 transition"
                >
                  访问网站
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 项目概述 */}
      <section id="overview" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">项目概述</h2>
            <div className="bg-gray-50 rounded-xl p-8 mb-12">
              <div className="prose prose-lg max-w-none">
                <p className="mb-4">
                  MindBreak是我为展示个人数据分析能力和技术背景而开发的个人品牌网站。这个项目不仅展示了我的专业技能和项目经验，同时也是我前端开发能力的体现。
                </p>
                <p className="mb-4">
                  在设计与开发过程中，我采用了以用户体验为中心的设计思路，确保网站在各种设备上都能提供流畅、直观的浏览体验。项目运用了现代前端技术栈，包括React、TypeScript和Tailwind CSS，结合Vite构建工具提升了开发效率。
                </p>
                <p>
                  网站实现了响应式设计、组件化开发、路由管理和数据可视化等核心功能，完美展示了我作为数据分析师的职业形象和技术能力。
                </p>
              </div>
            </div>

            {/* 设计理念与网站结构 - 新增部分 */}
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">设计理念与网站结构</h2>
            <div className="bg-indigo-50 rounded-xl p-8 mb-12">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">设计理念</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-indigo-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>极简主义美学：采用简洁干净的布局，突出内容本身，减少视觉干扰</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-indigo-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>数据可视化导向：设计元素融入数据可视化图表风格，呼应数据分析师身份</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-indigo-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>渐变色调：使用从深蓝到紫色的渐变色系，传达专业、创新和技术感</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-indigo-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>微动效设计：添加微妙的页面过渡动画和交互反馈，提升用户体验</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">网站结构</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-indigo-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>主页：个人简介和专业技能概览，引导访问者了解核心优势</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-indigo-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>项目集：展示数据分析和开发项目，分类展示并提供详细介绍</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-indigo-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>交互式演示：包含美食发现和英语学习等功能性页面，展示实际应用</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-indigo-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>关于我和联系方式：个人背景详情和联系表单，便于潜在合作洽谈</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 项目统计数据 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <StatCard 
                value="15+" 
                label="组件" 
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>} 
              />
              <StatCard 
                value="8+" 
                label="页面" 
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} 
              />
              <StatCard 
                value="95%" 
                label="代码质量" 
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>} 
              />
              <StatCard 
                value="100%" 
                label="响应式" 
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>} 
              />
            </div>

            {/* 开发过程 */}
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">开发流程</h2>
            <div className="mb-16">
              <ProcessStep 
                number={1} 
                title="需求分析与设计" 
                description="根据数据分析师职业特点，确定网站的核心功能和内容结构，设计整体风格和用户体验流程，确保能有效展示专业能力和项目经验。" 
              />
              <ProcessStep 
                number={2} 
                title="技术选型与环境搭建" 
                description="选择React与TypeScript作为核心框架，Tailwind CSS实现UI设计，使用Vite作为构建工具提升开发效率，配置ESLint等工具确保代码质量。" 
              />
              <ProcessStep 
                number={3} 
                title="组件开发与页面实现" 
                description="基于组件化思想，先开发通用组件如导航栏、页脚、项目卡片等，再组装实现主页、项目展示、关于我等核心页面，确保代码复用性和可维护性。" 
              />
              <ProcessStep 
                number={4} 
                title="功能整合与性能优化" 
                description="整合Leaflet地图组件实现位置可视化，实现响应式设计适配各类设备，优化资源加载提升性能，确保用户体验流畅。" 
                isLast 
              />
            </div>

            {/* 核心技术 */}
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">核心技术与实现</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <FeatureItem 
                title="React组件化开发" 
                description="采用函数式组件和Hooks设计模式，将UI拆分为可复用组件，提高代码维护性和开发效率。通过自定义Hook管理复杂状态逻辑，实现了优雅的代码组织。" 
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>} 
              />
              <FeatureItem 
                title="TypeScript类型安全" 
                description="使用TypeScript实现代码的类型检查，提前捕获潜在错误，增强代码稳定性和开发体验。定义了清晰的接口和类型，确保数据流转的一致性。" 
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>} 
              />
              <FeatureItem 
                title="Tailwind CSS响应式设计" 
                description="基于Tailwind实现细粒度的样式控制和响应式布局，确保在各种设备上都有良好的显示效果。自定义了主题配置，实现品牌一致性的色彩和排版系统。" 
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>} 
              />
              <FeatureItem 
                title="React Router导航管理" 
                description="实现单页应用的路由管理，提供无刷新的页面切换体验，同时支持URL参数和查询字符串处理。整合了路由守卫和动态路由加载，优化了导航体验。" 
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>} 
              />
            </div>

            {/* 新增特色功能详解 */}
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">特色功能详解</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-3">交互式地图组件</h3>
                <div className="mb-4 text-indigo-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-4">
                  集成Leaflet地图库实现了交互式地图功能，用于餐厅定位和展示。解决了React组件生命周期与地图实例管理的挑战，实现了自定义图标、点击交互和动态中心点更新。
                </p>
                <p className="text-gray-600">
                  技术难点：处理了地图组件在React中的正确卸载和重新渲染问题，避免了内存泄漏；实现了高性能的标记聚合，优化了多标记点的显示效果。
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-3">自适应主题系统</h3>
                <div className="mb-4 text-indigo-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-4">
                  设计了完整的主题变量系统，包括颜色、间距、字体和阴影等，实现了视觉风格的一致性和灵活调整。通过CSS变量和Tailwind配置相结合，实现了高度复用的设计体系。
                </p>
                <p className="text-gray-600">
                  技术难点：构建了Tailwind与CSS变量的桥接层，实现了主题切换功能而无需重新编译样式；优化了样式加载策略，减少了首屏加载时间。
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-3">数据可视化模块</h3>
                <div className="mb-4 text-indigo-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-4">
                  开发了可复用的数据图表组件，用于展示个人技能分布、项目经验和工作履历等信息。采用声明式配置，使图表组件易于维护和扩展，同时保持了视觉一致性。
                </p>
                <p className="text-gray-600">
                  技术难点：实现了图表组件的响应式布局和动态数据更新；开发了自定义动画和交互效果，增强了用户体验；针对不同设备优化了图表的渲染性能。
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-3">高性能路由系统</h3>
                <div className="mb-4 text-indigo-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-4">
                  基于React Router 7实现了现代化的路由系统，支持路由懒加载、代码分割和预加载策略。优化了页面导航体验，实现了平滑的页面过渡效果和路由状态管理。
                </p>
                <p className="text-gray-600">
                  技术难点：实现了路由级别的页面缓存机制，避免了频繁导航时的重复渲染；开发了自定义的路由守卫系统，实现了基于权限的路由控制；优化了路由切换时的数据预取策略。
                </p>
              </div>
            </div>

            {/* 挑战与解决方案 - 新增部分 */}
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">开发挑战与解决方案</h2>
            <div className="bg-gray-50 rounded-xl p-8 mb-16">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">版本兼容性问题</h3>
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">挑战：</span> React-Leaflet v5要求React 19，而项目基于React 18.3.1构建，导致版本冲突。
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">解决方案：</span> 降级使用React-Leaflet v4.2.1，并重写地图组件，自定义图标处理逻辑，解决了_getIconUrl属性缺失问题。通过创建MapCenterUpdater组件解决了地图中心点无法动态更新的问题。
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">构建性能优化</h3>
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">挑战：</span> 初始构建速度慢，热更新延迟高，影响开发效率。
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">解决方案：</span> 配置Vite优化选项，启用依赖预构建缓存；实施模块懒加载策略；优化Tailwind配置，减少生成的CSS体积；使用esbuild替代babel进行TypeScript转译，显著提升了构建速度。
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">响应式设计一致性</h3>
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">挑战：</span> 在不同设备上保持设计一致性，特别是复杂组件的布局和交互。
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">解决方案：</span> 建立设计令牌系统，统一管理各种尺寸断点；开发适配器组件处理布局变化；使用容器查询替代媒体查询，实现更精确的响应式控制；建立严格的组件测试流程，在多种设备尺寸下验证UI表现。
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">PowerShell执行策略限制</h3>
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">挑战：</span> Windows环境下PowerShell执行策略限制npm脚本运行，导致构建命令失败。
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">解决方案：</span> 使用Set-ExecutionPolicy命令临时调整执行策略级别；为开发环境创建专用的PowerShell配置文件；修改npm脚本使用相对路径而非全局命令，避免权限问题；编写跨平台兼容的命令，确保在不同操作系统下均可正常运行。
                  </p>
                </div>
              </div>
            </div>

            {/* 代码示例 */}
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">关键代码示例</h2>
            <div className="mb-16">
              <p className="text-gray-600 mb-6 text-center">
                以下是项目中的两个关键代码片段，展示了React组件开发和Tailwind配置的核心实现
              </p>

              <CodeSnippet 
                title="NavigationComponent.tsx" 
                language="typescript" 
                code={reactComponentCode} 
              />
              
              <CodeSnippet 
                title="tailwind.config.js" 
                language="javascript" 
                code={tailwindCode} 
              />
            </div>

            {/* 项目总结 */}
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">项目总结</h2>
            <div className="bg-indigo-50 rounded-xl p-8 mb-12">
              <div className="prose prose-lg max-w-none">
                <p className="mb-4">
                  通过此项目，我不仅成功展示了自己作为数据分析师的专业背景和技能，同时也证明了我具备出色的前端开发能力。项目整合了多种现代前端技术，实现了响应式设计、组件复用和用户友好的交互体验。
                </p>
                <p className="mb-4">
                  在开发过程中，我特别注重代码质量和性能优化，采用了组件化设计、类型检查和现代化构建工具，确保了网站的稳定性和可维护性。
                </p>
                <p>
                  这个项目不仅是我专业能力的展示窗口，也是我技术能力的具体体现，展示了我解决问题和创造价值的综合能力。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 联系区域 */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">对我的开发能力感兴趣？</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            我可以为您的项目提供数据分析与前端开发解决方案，结合专业分析能力和技术实现
          </p>
          <Link 
            to="/contact" 
            className="inline-block bg-white text-indigo-700 font-medium py-3 px-8 rounded-lg shadow-md hover:bg-indigo-50 transition-colors"
          >
            联系我
          </Link>
        </div>
      </section>
    </>
  );
};

export default WebsiteProject; 