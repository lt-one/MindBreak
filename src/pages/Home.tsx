import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/animations.css'; // 确保引入动画样式文件
import YinYangLogo from '../components/features/philosophy/YinYangLogo';
import RandomQuote from '../components/features/quotes/RandomQuote';
import { quoteDatabase } from '../data/quotes';

// 自定义SVG组件作为首页插图
const HeroIllustration = () => (
  <svg className="w-full max-w-md mx-auto" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4F46E5" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#1E293B" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>
    </defs>
    {/* 背景形状 */}
    <circle cx="300" cy="200" r="150" fill="#F9F9F9" stroke="#E5E7EB" strokeWidth="2" />
    <circle cx="300" cy="200" r="120" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1" />
    
    {/* 代码图标 */}
    <rect x="220" y="150" width="160" height="100" rx="10" fill="url(#gradient2)" />
    <text x="240" y="180" fill="#F9FAFB" fontFamily="monospace" fontSize="12">
      const hello = () =&gt; {'{'}
    </text>
    <text x="240" y="200" fill="#F9FAFB" fontFamily="monospace" fontSize="12">
      {'  '}console.log("你好!");
    </text>
    <text x="240" y="220" fill="#F9FAFB" fontFamily="monospace" fontSize="12">
      {'}'};
    </text>
    
    {/* 装饰元素 */}
    <circle cx="200" cy="100" r="15" fill="url(#gradient1)" />
    <circle cx="400" cy="300" r="20" fill="url(#gradient1)" opacity="0.8" />
    <circle cx="150" cy="250" r="10" fill="url(#gradient1)" opacity="0.6" />
    <circle cx="450" cy="120" r="12" fill="url(#gradient1)" opacity="0.7" />
  </svg>
);

// 爱好图标组件
const HobbyIcon: React.FC<{name: string}> = ({ name }) => {
  // 基于爱好名称返回不同的SVG图标
  const renderIcon = () => {
    switch(name) {
      case '阅读':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case '编程':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case '摄影':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case '旅行':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case '音乐':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        );
      case '打篮球':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4a8 8 0 100 16 8 8 0 000-16z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12a14 14 0 003 3m5-10a14 14 0 00-3 3m-1.5 1.5a14 14 0 01-3 3m7.5-7.5a14 14 0 013 3" />
          </svg>
        );
      case '健身':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 17V7m0 0v10M16 7v10m4-10v10m-9-7h2m-8 0h2m4 0h2" />
          </svg>
        );
      case '电影':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
        );
      case '游戏':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case '美食探索':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case '中国哲学':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
    }
  };

  return (
    <div className="bg-indigo-50 p-4 rounded-lg text-indigo-700 flex flex-col items-center">
      {renderIcon()}
      <span className="mt-2 text-sm font-medium">{name}</span>
    </div>
  );
};

// 项目SVG图标
const ProjectSvg = () => (
  <svg className="w-full h-48" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
    <rect x="40" y="40" width="220" height="120" rx="8" fill="#E0E7FF" stroke="#818CF8" strokeWidth="2" />
    <rect x="60" y="60" width="180" height="30" rx="4" fill="#818CF8" />
    <rect x="60" y="100" width="80" height="20" rx="4" fill="#C7D2FE" />
    <rect x="150" y="100" width="80" height="20" rx="4" fill="#C7D2FE" />
    <rect x="60" y="130" width="50" height="20" rx="4" fill="#818CF8" />
  </svg>
);

// 博客SVG图标
const BlogSvg = () => (
  <svg className="w-full h-48" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
    <rect x="40" y="30" width="220" height="140" rx="8" fill="#E0E7FF" stroke="#818CF8" strokeWidth="2" />
    <rect x="60" y="50" width="180" height="20" rx="4" fill="#818CF8" />
    <rect x="60" y="80" width="180" height="10" rx="2" fill="#C7D2FE" />
    <rect x="60" y="100" width="180" height="10" rx="2" fill="#C7D2FE" />
    <rect x="60" y="120" width="180" height="10" rx="2" fill="#C7D2FE" />
    <rect x="60" y="140" width="100" height="10" rx="2" fill="#C7D2FE" />
  </svg>
);

// Timeline组件
const Timeline: React.FC = () => {
  const milestones = [
    {
      year: '2020',
      title: '开始大学生活',
      description: '进入广东技术师范大学就读智能科学与技术专业，开启了我的技术之旅。',
      icon: '🎓'
    },
    {
      year: '2021',
      title: '探索技术领域',
      description: '参与多个科技项目，包括科技站宣传部工作，撰写科技赛事推文和设计创意海报。',
      icon: '🔬'
    },
    {
      year: '2023',
      title: '实践项目经验',
      description: '负责开发基于脑机接口的注意力灯光控制系统，探索AI与智能家居的结合应用。',
      icon: '💡'
    },
    {
      year: '2024',
      title: '数据分析师工作',
      description: '在广东数源智汇科技有限公司担任数据分析师，负责华为终端产品舆情监测与分析。',
      icon: '📊'
    },
    {
      year: '未来',
      title: '人生目标',
      description: '希望能环游世界，探索南极，登顶珠穆朗玛峰，体验地球的壮丽与多样。',
      icon: '🌏'
    }
  ];

  return (
    <div className="relative mx-auto max-w-3xl">
      {/* 垂直线 */}
      <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-indigo-200"></div>
      
      {milestones.map((milestone, index) => (
        <div key={index} className={`relative flex items-center gap-6 py-8 ${index % 2 === 0 ? 'flex-row-reverse text-right' : 'flex-row'}`}>
          {/* 图标 */}
          <div className="z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-2xl shadow-md">
            {milestone.icon}
          </div>
          
          {/* 内容 */}
          <div className={`slide-in-${index % 2 === 0 ? 'right' : 'left'}`} style={{animationDelay: `${index * 0.1 + 0.2}s`}}>
            <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
              {milestone.year}
            </span>
            <h3 className="mt-2 text-xl font-bold text-gray-900">{milestone.title}</h3>
            <p className="mt-1 text-base text-gray-600">{milestone.description}</p>
          </div>
          
          {/* 连接线 */}
          <div className="absolute left-1/2 top-1/2 h-0.5 w-8 -translate-x-1/2 -translate-y-1/2 bg-indigo-200"></div>
        </div>
      ))}
    </div>
  );
};

// 英雄区域背景装饰元素
const HeroBackgroundDecorations = () => (
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
    <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply opacity-20 animate-blob"></div>
    <div className="absolute top-0 -right-24 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply opacity-20 animate-blob animation-delay-2000"></div>
    <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply opacity-20 animate-blob animation-delay-4000"></div>
    <div className="absolute w-8 h-8 bg-accent2 rounded-full top-1/4 left-1/4 animate-ping" style={{ animationDuration: '3s' }}></div>
    <div className="absolute w-4 h-4 bg-accent rounded-full bottom-1/4 right-1/3 animate-ping" style={{ animationDuration: '2.5s' }}></div>
    <div className="hidden md:block absolute w-64 h-64 border-8 border-indigo-100 rounded-full top-1/2 -left-20 opacity-30"></div>
    <div className="hidden md:block absolute w-40 h-40 border-8 border-blue-100 rounded-full bottom-1/3 right-10 opacity-30"></div>
    
    {/* 添加中国哲学元素 */}
    <div className="absolute top-20 right-20 opacity-10 hidden md:block">
      <YinYangLogo size={120} />
    </div>
    <div className="absolute bottom-20 left-20 opacity-10 hidden md:block rotate-45">
      <YinYangLogo size={100} />
    </div>
  </div>
);

const Home: React.FC = () => {
  // 项目成就数据
  interface Achievement {
    icon: string;
    count: string;
    title: string;
    description: string;
    color: string;
  }

  const achievements: Achievement[] = [
    { 
      icon: '📊', 
      count: '5000+', 
      title: '日均数据处理', 
      description: '品牌相关舆情监测数据',
      color: 'from-blue-500 to-indigo-600' 
    },
    { 
      icon: '📑', 
      count: '100+', 
      title: '分析报告', 
      description: '产品日报/周报/月报',
      color: 'from-indigo-500 to-purple-600' 
    },
    { 
      icon: '⚡', 
      count: '95%', 
      title: '预警响应率', 
      description: '重大舆情信息预警',
      color: 'from-purple-500 to-pink-600' 
    },
    { 
      icon: '⏱️', 
      count: '60%', 
      title: '效率提升', 
      description: '热点事件汇总流程优化',
      color: 'from-pink-500 to-rose-600' 
    },
  ];
  
  // 兴趣爱好
  const hobbies = [
    '打篮球', 
    '健身', 
    '电影', 
    '编程', 
    '美食探索',
    '游戏',
    '旅行',
    '中国哲学',
    '阅读'
  ];
  
  // 中国哲学名言
  const philosophyQuotes = [
    {
      text: "知行合一",
      author: "王阳明",
      explanation: "真知必须落实于行动，行动才能体现真知。"
    },
    {
      text: "上善若水",
      author: "老子",
      explanation: "水善利万物而不争，处众人之所恶，故几于道。"
    },
    {
      text: "致良知",
      author: "王阳明",
      explanation: "每个人心中都有是非善恶的本能判断，要发掘并遵循这种良知。"
    },
    {
      text: "道法自然",
      author: "老子",
      explanation: "顺应自然规律，不强为，不妄为。"
    }
  ];
  
  return (
    <>
      {/* 英雄区域 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-white py-16 md:py-24">
        {/* 背景装饰元素 */}
        <HeroBackgroundDecorations />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8">
              <span className="text-indigo-600 font-medium text-lg fade-in">你好 👋</span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 my-4 fade-in fade-in-delay-1">
                我是<span className="text-indigo-600">Leo</span>，
                <br />一位热爱创造的开发者
              </h1>
              <p className="text-xl text-gray-600 mb-8 fade-in fade-in-delay-2">
                欢迎来到MindBreak，这里展示了我个人的一些项目、技能和思考。
              </p>
              <div className="flex gap-4 fade-in fade-in-delay-3">
                <Link to="/projects" className="btn-primary group relative overflow-hidden">
                  <span className="absolute inset-0 w-0 bg-indigo-700 transition-all duration-500 ease-out group-hover:w-full"></span>
                  <span className="relative">查看我的项目</span>
                </Link>
                <Link to="/contact" className="btn-secondary group">
                  <span className="group-hover:translate-x-1 inline-block transition-transform">联系我</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0 zoom-in zoom-in-delay-1 relative">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-indigo-100 rounded-full animate-pulse opacity-70"></div>
              <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-blue-100 rounded-full animate-pulse opacity-70" style={{ animationDelay: '1s' }}></div>
              <HeroIllustration />
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gradient-to-r from-accent2/10 to-accent2/30 p-3 rounded-lg backdrop-blur-sm fade-in fade-in-delay-4">
                <div className="text-sm font-mono text-accent">
                  <span className="text-accent2">function</span> <span className="text-accent">createImpact</span>() {'{'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 个人简介 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 slide-in-bottom">关于我</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6 slide-in-bottom" style={{animationDelay: "0.1s"}}>
              你好！我是一名充满好奇心的软件开发者，热衷于探索新技术和创造用户友好的数字体验。
              我喜欢将复杂的问题简化，并通过代码和创意找到优雅的解决方案。
            </p>
            <p className="text-lg text-gray-600 leading-relaxed slide-in-bottom" style={{animationDelay: "0.2s"}}>
              在工作中，我主要负责华为手机、智能手表等终端产品的舆情监测与分析，通过多维度的数据分析，为产品优化和市场策略提供数据支持。
              我热爱数据分析工作，善于发现数据背后的规律和趋势，通过数据驱动决策，提升产品体验和业务表现。
            </p>
          </div>
        </div>
      </section>

      {/* 项目成就数据 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center float-up">项目成就</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => (
              <div 
                key={achievement.title} 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all text-center bounce-in overflow-hidden relative group"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <div className={`text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300`}>{achievement.icon}</div>
                  <div className="text-2xl font-bold text-indigo-600 mb-2">{achievement.count}</div>
                  <div className="text-gray-800 font-medium mb-2">{achievement.title}</div>
                  <div className="text-gray-600 text-sm">{achievement.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 东方智慧部分 */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center mb-12 gap-8">
              <div className="md:w-1/4 flex justify-center">
                <YinYangLogo size={150} className="float-up animate-breath pause-on-hover" />
              </div>
              <div className="md:w-3/4">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 float-up">东方智慧</h2>
                <p className="text-gray-700 leading-relaxed mb-4 float-up" style={{animationDelay: "0.1s"}}>
                  探索中国传统哲学的精髓，感受王阳明心学与道家思想在现代生活中的应用价值。
                  这些古老的智慧为我们提供了理解世界与自我的独特视角。
                </p>
                <div className="float-up" style={{animationDelay: "0.2s"}}>
                  <Link to="/chinese-philosophy" className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-700">
                    探索更多
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* 每日语录 */}
            <div className="mb-8 slide-in-bottom">
              <RandomQuote 
                quotes={quoteDatabase} 
                title="每日语录精选" 
                refreshInterval={86400000} // 24小时刷新一次
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {philosophyQuotes.map((quote, index) => (
                <div 
                  key={quote.text} 
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all bounce-in"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex items-center mb-3">
                    <div className="text-2xl text-indigo-600 font-serif mr-3">{quote.text}</div>
                    <div className="text-sm text-gray-500">—— {quote.author}</div>
                  </div>
                  <p className="text-gray-700">{quote.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 兴趣爱好 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center float-up">兴趣爱好</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {hobbies.map((hobby, index) => (
              <div key={hobby} className="bounce-in" style={{animationDelay: `${index * 0.1}s`}}>
                <HobbyIcon name={hobby} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 人生目标 */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center float-up">人生目标</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-40 bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">环球旅行</h3>
                  <p className="text-gray-600 mb-4">
                    走遍世界各地，感受不同文化与自然风光的魅力。特别想要体验一次登上雪山、探索海底世界的壮丽。
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-40 bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">极限挑战</h3>
                  <p className="text-gray-600 mb-4">
                    挑战自我极限，想要探索南极、登顶珠穆朗玛峰，体验地球上最壮观的景象，留下人生的深刻印记。
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow slide-in-bottom">
              <div className="h-40 bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">美食环游</h3>
                <p className="text-gray-600 mb-4">
                  品尝中国各地乃至世界各国的特色美食，感受不同地方的饮食文化。希望能够将中国的所有地区和世界知名的美食全部体验一遍，通过味蕾感受世界的多样性。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 我的成长历程 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center float-up">我的成长历程</h2>
          <Timeline />
        </div>
      </section>

      {/* 网站设计与技术实现 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center float-up">网站设计与技术实现</h2>
            
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100">
              <div className="flex flex-col md:flex-row gap-8 items-center mb-6">
                <div className="md:w-1/3">
                  <div className="p-4 bg-indigo-600 text-white rounded-lg text-center">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                    <h3 className="text-xl font-bold">现代设计理念</h3>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <p className="text-gray-700 leading-relaxed">
                    本网站采用极简主义设计风格，专注于内容展示与用户体验。设计元素融入了数据可视化图表风格，从深蓝到紫色的渐变色系传达专业与创新，微妙的动画效果提升了交互体验。整体设计遵循响应式原则，确保在各种设备上呈现一致的体验。
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3 md:order-2">
                  <div className="p-4 bg-indigo-600 text-white rounded-lg text-center">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    <h3 className="text-xl font-bold">前沿技术栈</h3>
                  </div>
                </div>
                <div className="md:w-2/3 md:order-1">
                  <p className="text-gray-700 leading-relaxed">
                    本网站基于React 18与TypeScript构建，结合Tailwind CSS实现精确的设计控制与响应式布局。使用Vite构建工具大幅提升了开发效率，React Router提供无缝的页面导航体验。整合了Leaflet地图组件实现位置可视化，并采用了组件化与模块化的开发方式，确保代码的可维护性与扩展性。
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center mt-8 pt-8 border-t border-gray-100">
                <div className="md:w-1/3">
                  <div className="p-4 bg-indigo-600 text-white rounded-lg text-center">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                    </svg>
                    <h3 className="text-xl font-bold">文化融合</h3>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <p className="text-gray-700 leading-relaxed">
                    本网站融合了中国传统哲学元素与现代设计美学，通过王阳明心学和道家思想的精髓，创造出兼具东方韵味与现代感的用户体验。
                    设计中注重"简"与"意"的和谐统一，追求"道法自然"的视觉表达，让用户在浏览过程中既能感受科技的现代感，也能体会东方哲学的深邃与宁静。
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
                <span className="inline-flex justify-center items-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full mb-4 mx-auto">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <h3 className="text-lg font-bold text-gray-800 mb-2">100% 响应式</h3>
                <p className="text-gray-600 text-sm">
                  完美适配从手机到桌面的各种设备尺寸，提供一致的用户体验
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
                <span className="inline-flex justify-center items-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full mb-4 mx-auto">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </span>
                <h3 className="text-lg font-bold text-gray-800 mb-2">高性能加载</h3>
                <p className="text-gray-600 text-sm">
                  优化的资源加载与代码分割策略，确保快速的页面加载与平滑的导航
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
                <span className="inline-flex justify-center items-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full mb-4 mx-auto">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </span>
                <h3 className="text-lg font-bold text-gray-800 mb-2">组件化架构</h3>
                <p className="text-gray-600 text-sm">
                  15+可复用组件构建，确保代码的一致性与可维护性
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 最近项目 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center float-up">最近项目</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow hover-lift slide-in-left">
              <ProjectSvg />
              <div className="p-6">
                <span className="inline-block bg-indigo-100 text-indigo-600 text-xs px-2 py-1 rounded-full mb-3">数据分析</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">华为终端产品舆情监测及分析</h3>
                <p className="text-gray-600 mb-4">针对华为手机、平板等终端设备的市场舆情进行监测和分析，通过多维度数据挖掘发现用户反馈趋势，提供产品优化建议。</p>
                <Link to="/projects/search-optimization" className="text-indigo-600 font-medium hover:text-indigo-700">
                  查看详情 →
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow hover-lift slide-in-right">
              <ProjectSvg />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">英语学习工具</h3>
                <p className="text-gray-600 mb-4">为学习者打造的英语训练应用，包含词汇记忆、语法练习和发音指导。</p>
                <Link to="/projects/english-training" className="text-indigo-600 font-medium hover:text-indigo-700">
                  查看详情 →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 博客预览 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center float-up">最新文章</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow hover-lift slide-in-left">
              <BlogSvg />
              <div className="p-6">
                <span className="inline-block bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded mb-3">前端开发</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">React Hooks 的最佳实践</h3>
                <p className="text-gray-600 mb-4">探讨如何在实际项目中有效使用 React Hooks，以及常见的陷阱和解决方案。</p>
                <Link to="/blog/react-hooks-best-practices" className="text-indigo-600 font-medium hover:text-indigo-700">
                  阅读全文 →
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow hover-lift slide-in-right">
              <BlogSvg />
              <div className="p-6">
                <span className="inline-block bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded mb-3">学习笔记</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">TypeScript 高级类型技巧</h3>
                <p className="text-gray-600 mb-4">学习如何使用 TypeScript 的高级类型功能，提高代码的类型安全性和可维护性。</p>
                <Link to="/blog/typescript-advanced-types" className="text-indigo-600 font-medium hover:text-indigo-700">
                  阅读全文 →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 联系区域 */}
      <section className="py-10 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-500/10 via-indigo-600/10 to-purple-500/10 rounded-2xl overflow-hidden shadow-sm">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">有合作意向?</h2>
                <p className="text-gray-600 mb-6">如果你对我的工作感兴趣，或者有任何问题，欢迎随时联系我</p>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-2 bg-indigo-600 text-white font-medium py-2.5 px-5 rounded-lg shadow-sm hover:bg-indigo-700 transition-colors"
                >
                  <span>联系我</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
              <div className="hidden md:block md:w-1/2 p-6">
                <div className="relative">
                  <svg className="w-full h-auto text-indigo-600/20" viewBox="0 0 134 134" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M67 134C104.003 134 134 104.003 134 67C134 29.9969 104.003 0 67 0C29.9969 0 0 29.9969 0 67C0 104.003 29.9969 134 67 134Z"/>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-20 h-20 text-indigo-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;