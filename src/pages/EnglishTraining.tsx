import React from 'react';

// SVG图标组件
const LearningIllustration: React.FC = () => (
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
    <rect width="600" height="400" fill="#F9F9F9" rx="20" />
    <rect x="50" y="50" width="500" height="300" fill="#F3F4F6" rx="15" stroke="#E5E7EB" strokeWidth="1" />
    
    {/* 书本 */}
    <rect x="100" y="100" width="240" height="180" rx="5" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
    <rect x="100" y="100" width="120" height="180" rx="5" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
    <line x1="220" y1="100" x2="220" y2="280" stroke="#E5E7EB" strokeWidth="2" />
    
    {/* 文字内容 */}
    <rect x="130" y="130" width="60" height="5" rx="2" fill="#818CF8" />
    <rect x="130" y="145" width="70" height="5" rx="2" fill="#818CF8" />
    <rect x="130" y="160" width="50" height="5" rx="2" fill="#818CF8" />
    <rect x="130" y="190" width="65" height="5" rx="2" fill="#818CF8" />
    <rect x="130" y="205" width="75" height="5" rx="2" fill="#818CF8" />
    <rect x="130" y="220" width="55" height="5" rx="2" fill="#818CF8" />
    
    {/* 右侧页面内容 */}
    <rect x="240" y="130" width="80" height="5" rx="2" fill="#C7D2FE" />
    <rect x="240" y="145" width="70" height="5" rx="2" fill="#C7D2FE" />
    <rect x="240" y="160" width="90" height="5" rx="2" fill="#C7D2FE" />
    <rect x="240" y="175" width="75" height="5" rx="2" fill="#C7D2FE" />
    <rect x="240" y="190" width="85" height="5" rx="2" fill="#C7D2FE" />
    <rect x="240" y="205" width="65" height="5" rx="2" fill="#C7D2FE" />
    <rect x="240" y="220" width="80" height="5" rx="2" fill="#C7D2FE" />
    <rect x="240" y="235" width="70" height="5" rx="2" fill="#C7D2FE" />
    
    {/* 装饰元素 */}
    <circle cx="400" cy="150" r="50" fill="url(#gradient1)" opacity="0.1" />
    <circle cx="450" cy="230" r="30" fill="url(#gradient1)" opacity="0.1" />
    <circle cx="380" cy="280" r="20" fill="url(#gradient1)" opacity="0.1" />
  </svg>
);

// 特性卡片组件
const FeatureCard: React.FC<{title: string, description: string, icon: React.ReactNode}> = ({
  title,
  description,
  icon
}) => (
  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
    <div className="rounded-full w-12 h-12 flex items-center justify-center bg-indigo-100 text-indigo-600 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const EnglishTraining: React.FC = () => {
  // 功能特性数据
  const features = [
    {
      title: '阅读理解',
      description: '通过多样化的文章和互动式练习，提高英语阅读理解能力和词汇量。',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: '词汇建设',
      description: '系统化的词汇学习方法和记忆技巧，帮助高效掌握常用词汇和专业术语。',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      )
    },
    {
      title: '语法指导',
      description: '简明易懂的语法解析和丰富的例句，清晰梳理英语语法结构和用法。',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      title: '发音练习',
      description: '专业的发音指导和互动式练习，纠正发音问题，提升口语表达能力。',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      )
    },
    {
      title: '学习资源',
      description: '精选优质学习材料和资源推荐，为不同阶段的英语学习者提供有针对性的指导。',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      )
    },
    {
      title: '进度追踪',
      description: '个性化学习进度跟踪和数据分析，帮助掌握学习状态和提升效率。',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  return (
    <>
      {/* 页面头部 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                英语学习平台
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                通过互动式学习提升您的英语水平，从初学者到高级水平的全面培训。
              </p>
              <div className="bg-indigo-100 text-indigo-700 rounded-lg p-4 inline-block">
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="font-medium">即将推出，敬请期待！</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <LearningIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* 功能特性 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">主要功能</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 课程介绍 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">学习路径</h2>
            
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 flex justify-center">
                  <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">1</div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">基础入门</h3>
                  <p className="text-gray-600 mb-4">
                    适合英语初学者，从基础发音、常用词汇和简单语法开始，建立英语学习的坚实基础。
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>音标和发音基础</li>
                    <li>日常生活必备词汇</li>
                    <li>基本句型和语法结构</li>
                    <li>简单对话和表达</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 flex justify-center">
                  <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">2</div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">进阶提升</h3>
                  <p className="text-gray-600 mb-4">
                    扩展词汇量，深入学习语法和表达方式，提高阅读理解能力和写作技巧。
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>中级词汇和常用短语</li>
                    <li>复杂语法结构和时态</li>
                    <li>进阶阅读理解训练</li>
                    <li>简单写作技巧和范例</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 flex justify-center">
                  <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">3</div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">高级精通</h3>
                  <p className="text-gray-600 mb-4">
                    掌握高级表达和写作技巧，学习地道口语和专业用语，达到流利使用英语的水平。
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>高级词汇和表达方式</li>
                    <li>地道口语表达和习语</li>
                    <li>高级写作技巧和风格</li>
                    <li>专业领域英语和术语</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 注册提醒 */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">准备好开始学习了吗？</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 opacity-90">
            留下您的邮箱，我们将在平台正式上线时第一时间通知您，并提供专属优惠。
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="您的邮箱地址" 
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button 
              className="px-6 py-3 bg-white text-indigo-700 font-medium rounded-lg hover:bg-indigo-50 transition-colors"
            >
              通知我
            </button>
          </div>
          <p className="text-sm opacity-80 mt-4">
            我们尊重您的隐私，不会向您发送垃圾邮件或共享您的信息
          </p>
        </div>
      </section>
    </>
  );
};

export default EnglishTraining; 