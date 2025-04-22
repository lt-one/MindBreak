import React, { useState } from 'react';

// 联系方式图标组件
const ContactIcons: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* 邮箱 */}
      <div className="flex items-start p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex-shrink-0 p-3 rounded-lg bg-indigo-600 text-white mr-3">
          <svg 
            className="w-5 h-5" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-1">邮箱</h3>
          <p className="text-gray-600 text-sm">1636678670@qq.com</p>
          <a 
            href="mailto:1636678670@qq.com" 
            className="inline-block mt-1 text-indigo-600 hover:text-indigo-800 text-xs font-medium"
          >
            发送邮件
          </a>
        </div>
      </div>
      
      {/* 电话 */}
      <div className="flex items-start p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex-shrink-0 p-3 rounded-lg bg-indigo-600 text-white mr-3">
          <svg 
            className="w-5 h-5" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-1">电话</h3>
          <p className="text-gray-600 text-sm">+86 17520218164</p>
          <a 
            href="tel:+8617520218164" 
            className="inline-block mt-1 text-indigo-600 hover:text-indigo-800 text-xs font-medium"
          >
            拨打电话
          </a>
        </div>
      </div>
      
      {/* 地址 */}
      <div className="flex items-start p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex-shrink-0 p-3 rounded-lg bg-indigo-600 text-white mr-3">
          <svg 
            className="w-5 h-5" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-1">地址</h3>
          <p className="text-gray-600 text-sm">广东省广州市天河区</p>
          <a 
            href="https://maps.google.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block mt-1 text-indigo-600 hover:text-indigo-800 text-xs font-medium"
          >
            查看地图
          </a>
        </div>
      </div>
      
      {/* 社交媒体 */}
      <div className="flex items-start p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex-shrink-0 p-3 rounded-lg bg-indigo-600 text-white mr-3">
          <svg 
            className="w-5 h-5" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-1">社交媒体</h3>
          <p className="text-gray-600 text-sm mb-1">在各大平台关注我</p>
          <div className="flex space-x-3">
            <a href="https://github.com/lt-one" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 transition-colors" title="GitHub">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm2.559 5.482l-2.443 2.396c-2.008 1.972-3.429 3.374-3.429 5.101 0 1.638 1.281 2.774 3.097 2.774.894 0 1.788-.402 2.434-.89l.812 1.337c-.644.521-1.864 1.101-3.278 1.101-2.615 0-4.599-1.802-4.599-4.365 0-2.214 1.708-4.108 4.608-7.003l1.154-1.135v-.037h-5.113v-2.038h8.747v1.764l-1.99 1.995z"/>
              </svg>
            </a>
            <a href="https://space.bilibili.com/51125264" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 transition-colors" title="哔哩哔哩">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906L17.813 4.653zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z" />
              </svg>
            </a>
            <a href="#" onClick={(e) => {e.preventDefault(); alert('微信号: a190191383 或 手机号: 17520218164');}} className="text-gray-500 hover:text-indigo-600 transition-colors" title="微信">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.328.328 0 0 0 .165-.054l1.9-1.106a.598.598 0 0 1 .5-.055 9.741 9.741 0 0 0 3.059.478c.079 0 .154-.012.232-.012-.502-.79-.793-1.72-.793-2.713 0-2.799 2.723-5.066 6.075-5.066.115 0 .226.012.34.019C13.737 6.157 11.55 4.03 8.691 4.03c-.176 0-.351.013-.527.025-.824.061-1.366.292-1.366.292-.18.07-.385.069-.553-.037-.168-.105-.289-.29-.313-.499l-.068-.578c-.035-.283.153-.551.424-.63.424-.126 1.259-.345 2.413-.369.182-.004.365-.006.546-.006 4.801 0 8.691 3.288 8.691 7.342 0 2.124-1.071 4.042-2.777 5.368.138.352.312.69.511 1.02 2.033-.589 4.323-2.156 5.095-4.939.055-.198.099-.4.138-.603.855-4.582-3.403-8.708-8.226-9.016a12.056 12.056 0 0 0-.823-.032zm4.827 8.687c-.599 0-1.084-.488-1.084-1.09 0-.602.485-1.09 1.084-1.09.598 0 1.084.488 1.084 1.09 0 .602-.486 1.09-1.084 1.09zm4.165 0c-.599 0-1.084-.488-1.084-1.09 0-.602.485-1.09 1.084-1.09.598 0 1.084.488 1.084 1.09 0 .602-.486 1.09-1.084 1.09z"/>
                <path d="M21.155 22.471c.093-.203.146-.421.155-.649l.016-.445a2.06 2.06 0 0 0-1.195-1.936 9.284 9.284 0 0 0-1.847-.609c-1.744 2.975-5.193 4.994-9.136 4.994a11.35 11.35 0 0 1-3.414-.524c-.374.504-.695.838-.695.838-.216.256-.536.351-.84.253s-.527-.395-.527-.722V22.4c-2.061-1.361-3.297-3.402-3.297-5.663 0-4.142 4.026-7.499 8.994-7.499s8.994 3.357 8.994 7.499c0 .58-.078 1.146-.225 1.688 2.32.66 3.586 1.491 3.586 3.256 0 .247-.024.49-.07.727a.52.52 0 0 1-.499.063zm-9.452-3.934c-.599 0-1.084-.488-1.084-1.09 0-.602.485-1.09 1.084-1.09.599 0 1.084.488 1.084 1.09 0 .602-.485 1.09-1.084 1.09zm-4.507 0c-.598 0-1.084-.488-1.084-1.09 0-.602.486-1.09 1.084-1.09.599 0 1.084.488 1.084 1.09 0 .602-.485 1.09-1.084 1.09z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// 订阅组件
const SubscribeSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<{
    submitted: boolean;
    success: boolean;
    message: string;
  }>({
    submitted: false,
    success: false,
    message: ''
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 模拟订阅提交
    setSubscribeStatus({
      submitted: true,
      success: true,
      message: '订阅成功！感谢您的关注。'
    });
    
    // 重置表单
    setEmail('');
    
    // 5秒后重置状态
    setTimeout(() => {
      setSubscribeStatus({
        submitted: false,
        success: false,
        message: ''
      });
    }, 5000);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">订阅我的更新</h3>
      <p className="text-gray-600 mb-4 text-sm">
        订阅我的邮件列表，获取最新文章、项目和技术分享。
      </p>
      
      {subscribeStatus.submitted && (
        <div 
          className={`p-4 mb-4 rounded-lg text-sm ${
            subscribeStatus.success ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {subscribeStatus.message}
        </div>
      )}
      
      <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="您的邮箱地址"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-sm"
          required
        />
        <button
          type="submit"
          className="w-full px-4 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition shadow-sm text-sm"
        >
          订阅
        </button>
      </form>
    </div>
  );
};

// 常见问题组件
const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  const faqItems = [
    {
      question: '您提供远程工作吗？',
      answer: '是的，我可以远程工作，也愿意考虑需要出差的项目。'
    },
    {
      question: '如何了解项目报价？',
      answer: '请通过表单或邮件提供项目详情，我会在24小时内回复报价。'
    },
    {
      question: '响应时间是多久？',
      answer: '我通常会在24小时内回复所有咨询，紧急情况可以通过电话联系。'
    },
    {
      question: '您使用哪些技术栈？',
      answer: '我主要使用React、Vue、TypeScript、Node.js等技术栈开发前端和全栈应用。后端则使用Express、NestJS等框架。'
    },
    {
      question: '是否提供源代码？',
      answer: '是的，所有项目完成后会提供完整的源代码和文档，并根据需要提供必要的技术支持。'
    },
    {
      question: '如何付款？',
      answer: '通常按项目分阶段付款，支持银行转账、支付宝、微信等多种付款方式。具体可根据项目情况商议。'
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">常见问题</h3>
      <div className="space-y-3">
        {faqItems.map((item, index) => (
          <div 
            key={index} 
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button 
              className={`w-full text-left p-4 flex justify-between items-center transition ${
                activeIndex === index ? 'bg-indigo-50' : 'bg-gray-50 hover:bg-gray-100'
              }`}
              onClick={() => toggleItem(index)}
            >
              <h4 className="font-medium text-gray-800 text-sm">{index + 1}. {item.question}</h4>
              <svg 
                className={`w-4 h-4 text-gray-600 transform transition-transform ${
                  activeIndex === index ? 'rotate-180' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ${
                activeIndex === index ? 'max-h-40' : 'max-h-0'
              }`}
            >
              <p className="text-gray-600 p-4 text-sm border-t border-gray-200">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 联系页面组件
const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<{
    submitted: boolean;
    success: boolean;
    message: string;
  }>({
    submitted: false,
    success: false,
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 模拟表单提交
    setFormStatus({
      submitted: true,
      success: true,
      message: '感谢您的留言！我会尽快回复您。'
    });
    
    // 重置表单
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // 5秒后重置状态
    setTimeout(() => {
      setFormStatus({
        submitted: false,
        success: false,
        message: ''
      });
    }, 5000);
  };

  return (
    <>
      {/* 顶部边框 */}
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 w-full"></div>
      
      {/* 页面标题 */}
      <div className="bg-indigo-50 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-3">联系方式</h1>
          <p className="text-base text-center text-gray-600 max-w-2xl mx-auto">无论您有任何问题或合作意向，都可以通过以下方式与我联系</p>
        </div>
      </div>
      
      {/* 联系信息卡片 */}
      <div className="py-10 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <ContactIcons />
        </div>
      </div>
      
      {/* 分割线 */}
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="h-px bg-gray-200"></div>
      </div>
      
      {/* 下半部分内容区域 */}
      <div className="py-10 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row md:space-x-6">
            {/* 左侧列：订阅和常见问题 */}
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <SubscribeSection />
              <FAQSection />
            </div>
            
            {/* 右侧列：留言表单 */}
            <div className="w-full md:w-2/3">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 h-full">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">发送留言</h2>
                
                {formStatus.submitted && (
                  <div 
                    className={`p-4 mb-4 rounded-lg text-sm ${
                      formStatus.success ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {formStatus.message}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="flex flex-col h-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-gray-700 font-medium text-sm">姓名</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-sm"
                        placeholder="您的姓名"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-gray-700 font-medium text-sm">邮箱</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-sm"
                        placeholder="yourname@gmail.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4 space-y-2">
                    <label htmlFor="subject" className="block text-gray-700 font-medium text-sm">主题</label>
                    <div className="relative">
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-sm appearance-none"
                        required
                      >
                        <option value="">请选择主题</option>
                        <option value="项目合作">项目合作</option>
                        <option value="咨询服务">咨询服务</option>
                        <option value="工作机会">工作机会</option>
                        <option value="一般咨询">一般咨询</option>
                        <option value="其他">其他</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* 附件上传 */}
                  <div className="mb-4 p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                    <div className="flex flex-col items-center justify-center">
                      <svg className="w-6 h-6 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <h5 className="text-sm font-medium text-gray-700 mb-1">添加附件</h5>
                      <p className="text-xs text-gray-500 mb-3 text-center">支持 JPG, PNG, PDF 格式，单文件不超过 5MB</p>
                      <label className="cursor-pointer bg-white px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition text-sm font-medium text-gray-700">
                        选择文件
                        <input type="file" className="hidden" />
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-2 flex-grow">
                    <label htmlFor="message" className="block text-gray-700 font-medium text-sm">留言内容</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={8}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-sm resize-none min-h-[180px]"
                      placeholder="请输入您的留言内容..."
                      required
                    ></textarea>
                    
                    <div className="border-t border-gray-200 my-8 pt-6 flex justify-end">
                      <button
                        type="submit"
                        className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition shadow-md text-sm flex items-center"
                      >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                        </svg>
                        发送留言
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 底部边框 */}
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 w-full"></div>
    </>
  );
};

export default Contact;
