import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/layout';

// 服务数据
const servicesData = [
  {
    id: 1,
    title: "前端开发",
    description: "使用React、Vue等现代前端技术栈，开发高性能、响应式的Web应用和用户界面",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
      </svg>
    ),
    features: [
      "React/Vue/Angular单页应用",
      "响应式UI界面和交互设计",
      "第三方API集成",
      "性能优化和代码重构",
      "PWA渐进式Web应用"
    ]
  },
  {
    id: 2,
    title: "后端开发",
    description: "构建安全、可扩展的后端服务和API接口，为前端应用提供数据支持",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
      </svg>
    ),
    features: [
      "RESTful API和GraphQL设计",
      "Node.js/Express后端框架",
      "数据库设计和优化",
      "身份验证和授权",
      "服务器配置和部署"
    ]
  },
  {
    id: 3,
    title: "全栈应用开发",
    description: "从需求分析到部署上线，提供全流程的应用开发服务",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
      </svg>
    ),
    features: [
      "需求分析和技术选型",
      "前后端一体化开发",
      "数据库设计和实现",
      "用户身份验证和权限控制",
      "应用部署和持续集成"
    ]
  },
  {
    id: 4,
    title: "技术咨询",
    description: "针对Web项目的技术难题提供解决方案和指导",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    ),
    features: [
      "技术栈选型咨询",
      "代码审核和优化",
      "性能瓶颈分析",
      "安全漏洞评估",
      "系统架构设计"
    ]
  }
];

const ServiceFeatures = ({ features }: { features: string[] }) => (
  <ul className="mt-4 space-y-2">
    {features.map((feature, index) => (
      <li key={index} className="flex items-center">
        <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span className="text-gray-700">{feature}</span>
      </li>
    ))}
  </ul>
);

const Services: React.FC = () => {
  return (
    <Layout>
      {/* 头部区域 */}
      <section className="relative bg-gradient-to-br from-indigo-50 to-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">我的专业服务</h1>
            <p className="text-xl text-gray-600 mb-8">为您提供全方位的Web开发和技术解决方案</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#services" className="btn-primary">
                查看服务内容
              </a>
              <Link to="/projects" className="btn-secondary">
                浏览项目案例
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* 服务列表 */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">提供的服务</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {servicesData.map(service => (
                <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 transition-transform hover:shadow-md">
                  <div className="text-indigo-600 mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ServiceFeatures features={service.features} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* 咨询服务 */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">准备开始您的项目了吗？</h2>
            <p className="text-xl opacity-90 mb-8">
              无论您是有具体的项目需求，还是想要技术咨询，
              都欢迎随时联系我，讨论如何帮助您实现目标。
            </p>
            <div className="text-center">
              <Link to="/contact" className="inline-block bg-white text-indigo-600 font-medium py-3 px-8 rounded-lg shadow-md hover:bg-indigo-50 transition-colors">
                咨询服务
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services; 