import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// 装饰元素组件
const DecorativeElement = () => (
  <div className="absolute top-0 right-0 -mr-10 w-80 h-80 opacity-10 z-0 overflow-hidden hidden lg:block">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#4F46E5"
        d="M37.5,-48.5C52.3,-38.6,70.3,-32,74.8,-20.5C79.3,-9,70.4,7.4,63.7,22.6C57,37.8,52.6,51.7,42.3,59.9C32,68.1,16,70.5,0.4,69.9C-15.1,69.4,-30.2,65.9,-41.9,57.4C-53.5,49,-61.8,35.6,-65.2,21.5C-68.5,7.3,-67,-7.7,-60.7,-19.6C-54.4,-31.4,-43.5,-40.2,-32,-47.1C-20.5,-53.9,-8.5,-58.7,1.7,-61.1C11.9,-63.4,22.7,-58.4,37.5,-48.5Z"
        transform="translate(100 100)"
      />
    </svg>
  </div>
);

// 项目接口类型
interface Project {
  id: number;
  title: string;
  description: string;
  shortDesc: string;
  technologies: string[];
  imageUrl: string;
  category: string;
  link: string;
  featured: boolean;
  year: string;
}

// 项目分类
type Category = '全部' | '前端开发' | '全栈应用' | '移动端' | 'UI/UX' | '小工具';

// 项目详情组件
const ProjectDetails: React.FC<{
  project: Project;
  onClose: () => void;
}> = ({ project, onClose }) => {
  const detailsRef = useRef<HTMLDivElement>(null);
  
  // 确保图片URL有效，如果无效则使用备用图片
  const imageUrl = project.imageUrl.startsWith('http') 
    ? project.imageUrl 
    : `https://placehold.co/1200x800/${getRandomColor()}/${getRandomColor(true)}?text=${encodeURIComponent(project.title)}`;
  
  // 点击外部区域关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (detailsRef.current && !detailsRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8">
      <div
        ref={detailsRef}
        className="bg-white max-w-5xl w-full max-h-[90vh] overflow-auto"
      >
        <div className="relative">
          <div className="h-72 md:h-96 relative overflow-hidden img-placeholder">
            <img 
              src={imageUrl} 
              alt={project.title} 
              loading="lazy"
              width="1200"
              height="800"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null; // 防止无限循环
                target.src = `https://placehold.co/1200x800/${getRandomColor()}/${getRandomColor(true)}?text=${encodeURIComponent(project.title)}`;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
              <span className="text-sm text-white/70 font-medium uppercase tracking-wider mb-2 block">
                {project.category} • {project.year}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">{project.title}</h2>
            </div>
          </div>
          
          <div className="p-6 md:p-10">
            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 text-xs font-medium rounded-none border border-gray-200 text-gray-700"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="prose prose-lg max-w-none mb-10">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">{project.description}</p>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">项目亮点</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>创新的用户界面设计，提供直观友好的交互体验</li>
                <li>采用最新技术栈，确保应用性能和可扩展性</li>
                <li>响应式设计，完美适配各种设备尺寸</li>
                <li>优化的性能和加载速度，提升用户体验</li>
              </ul>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                返回
              </button>
              
              <a
                href={project.link}
                target={project.link.startsWith('http') ? "_blank" : undefined}
                rel={project.link.startsWith('http') ? "noopener noreferrer" : undefined}
                className="px-6 py-3 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors flex items-center"
              >
                查看项目
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 项目卡片组件
const ProjectCard: React.FC<{
  project: Project;
  onClick: () => void;
  index: number;
}> = ({ project, onClick, index }) => {
  // 确保图片URL有效，如果无效则使用备用图片
  const imageUrl = project.imageUrl.startsWith('http') 
    ? project.imageUrl 
    : `https://placehold.co/600x400/${getRandomColor()}/${getRandomColor(true)}?text=${encodeURIComponent(project.title)}`;

  return (
    <div
      className="group cursor-pointer hover-lift"
      onClick={onClick}
      style={{ 
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden mb-6 img-placeholder">
        <img 
          src={imageUrl} 
          alt={project.title} 
          loading="lazy"
          width="600"
          height="400"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null; // 防止无限循环
            target.src = `https://placehold.co/600x400/${getRandomColor()}/${getRandomColor(true)}?text=${encodeURIComponent(project.title)}`;
          }}
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs uppercase tracking-wider text-gray-500">{project.category}</span>
          <span className="text-xs text-gray-500">{project.year}</span>
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-gray-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-600 line-clamp-2">{project.shortDesc}</p>
      </div>
    </div>
  );
};

// 生成随机颜色代码
function getRandomColor(isLight: boolean = false): string {
  const colors = isLight 
    ? ['ffffff', 'f8fafc', 'f1f5f9', 'f3f4f6', 'fafafa'] 
    : ['4f46e5', '7c3aed', '3b82f6', '22c55e', 'e4a11b', 'ec4899', '8b5cf6', 'f59e0b'];
  return colors[Math.floor(Math.random() * colors.length)];
}

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('全部');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // 模拟获取项目数据
  useEffect(() => {
    setLoading(true);
    // 使用更短的延迟以加快加载速度
    setTimeout(() => {
      const projects: Project[] = [
        {
          id: 1,
          title: '个人品牌网站 - MindBreak',
          shortDesc: '专业的数据分析师个人品牌网站',
          description: '这是我使用现代前端技术栈设计开发的个人品牌网站，展示了我作为数据分析师的专业能力、项目经验和技术背景。该项目采用了React 18与TypeScript作为核心框架，结合Tailwind CSS实现了响应式设计与现代化UI，使用Vite作为构建工具大幅提升了开发效率。项目中集成了Leaflet地图组件展示位置信息，实现了组件化开发与状态管理，保证了代码的可维护性和扩展性。网站设计着重于用户体验，展示了数据可视化能力，支持各种设备访问并保持一致的体验。整个开发过程遵循了最佳实践，包括性能优化、代码分离和懒加载等技术，完美展示了我的技术能力。',
          imageUrl: 'https://placehold.co/600x400/4f46e5/ffffff?text=MindBreak',
          technologies: ['React 18', 'TypeScript', 'Tailwind CSS', 'Vite', 'React Router v7', 'Leaflet'],
          category: '前端开发',
          link: '/website-project',
          featured: true,
          year: '2024'
        },
        {
          id: 2,
          title: '美食探索应用',
          shortDesc: '基于地图的餐厅发现应用',
          description: '一个创新的美食探索应用，融合了地图定位和用户评价功能，帮助用户快速发现附近的优质餐厅。用户可以根据菜系、价格和评分进行筛选，获得个性化的餐厅推荐。应用采用响应式设计，在各种设备上都能提供出色的用户体验。',
          imageUrl: 'https://placehold.co/600x400/e4a11b/ffffff?text=Food+Finder',
          technologies: ['React', 'Leaflet', 'Tailwind CSS', 'TypeScript'],
          category: '前端开发',
          link: '/food-finder',
          featured: true,
          year: '2023'
        },
        {
          id: 3,
          title: '英语学习平台',
          shortDesc: '交互式语言学习解决方案',
          description: '专为语言学习者设计的平台，提供丰富的互动练习、实时反馈和个性化学习路径。结合了听力、口语、阅读和写作全方位训练，帮助用户有效提升英语能力。独特的数据分析功能，让学习进度一目了然，科学规划学习计划。',
          imageUrl: 'https://placehold.co/600x400/4f46e5/ffffff?text=English+Learning',
          technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Web Audio API'],
          category: '前端开发',
          link: '/english-training',
          featured: false,
          year: '2023'
        },
        {
          id: 4,
          title: '内容管理系统',
          shortDesc: '高效的内容创作与管理工具',
          description: '一站式内容管理解决方案，为创作者提供直观的编辑体验和强大的发布功能。支持多媒体内容整合、定时发布、SEO优化等高级特性。后台采用高效的数据处理机制，确保即使在大量内容的情况下也能保持出色的性能表现。',
          imageUrl: 'https://placehold.co/600x400/22c55e/ffffff?text=CMS',
          technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
          category: '全栈应用',
          link: '/blog',
          featured: true,
          year: '2022'
        },
        {
          id: 5,
          title: '天气预报应用',
          shortDesc: '精准的天气数据可视化工具',
          description: '利用先进的气象数据API，为用户提供精准的天气预报和气象信息。直观的界面设计，让复杂的天气数据变得易于理解。提供多种视图模式，包括地图视图、列表视图和详细视图，满足不同用户的需求偏好。',
          imageUrl: 'https://placehold.co/600x400/3b82f6/ffffff?text=Weather+App',
          technologies: ['React', 'OpenWeather API', 'Tailwind CSS'],
          category: '移动端',
          link: '/weather-app',
          featured: false,
          year: '2022'
        },
        {
          id: 6,
          title: '任务管理工具',
          shortDesc: '高效的团队协作与项目跟踪系统',
          description: '专为现代团队设计的任务管理工具，融合了敏捷方法论和直观的用户界面。支持任务分配、进度跟踪、文件共享和团队通讯功能，全方位提升团队协作效率。灵活的权限系统，确保信息安全的同时，促进团队透明度。',
          imageUrl: 'https://placehold.co/600x400/a855f7/ffffff?text=Task+Manager',
          technologies: ['React', 'Redux', 'Firebase', 'Material UI'],
          category: '全栈应用',
          link: '/task-manager',
          featured: false,
          year: '2021'
        },
        {
          id: 7,
          title: '电子商务UI设计',
          shortDesc: '现代化的购物体验设计',
          description: '为电子商务平台打造的现代UI设计，专注于用户体验和转化率优化。包含完整的购物流程设计，从商品浏览到结账支付的每一步都经过精心设计，确保用户体验流畅直观。',
          imageUrl: 'https://placehold.co/600x400/ec4899/ffffff?text=E-commerce',
          technologies: ['Figma', 'Adobe XD', 'Prototyping'],
          category: 'UI/UX',
          link: '/ecommerce-ui',
          featured: false,
          year: '2021'
        },
        {
          id: 8,
          title: '音乐播放器',
          shortDesc: '沉浸式音乐流媒体体验',
          description: '一款现代化的音乐播放应用，提供流畅的音乐播放和个性化推荐功能。引入创新的音频可视化组件，增强用户的音乐欣赏体验。支持离线播放、播放列表管理和社交分享功能，满足不同场景下的音乐需求。',
          imageUrl: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Music+Player',
          technologies: ['React', 'Web Audio API', 'Styled Components'],
          category: '前端开发',
          link: '/music-player',
          featured: false,
          year: '2021'
        },
        {
          id: 9,
          title: '代码片段管理器',
          shortDesc: '开发者的代码资源库',
          description: '专为开发者设计的代码片段管理工具，帮助用户组织、检索和分享常用代码片段。支持多种编程语言的语法高亮和代码格式化。内置强大的搜索功能，让用户能够快速找到需要的代码片段，提高开发效率。',
          imageUrl: 'https://placehold.co/600x400/f59e0b/ffffff?text=Code+Snippets',
          technologies: ['React', 'Monaco Editor', 'IndexedDB'],
          category: '小工具',
          link: '/code-snippets',
          featured: false,
          year: '2020'
        }
      ];
      
      setAllProjects(projects);
      setFilteredProjects(selectedCategory === '全部' ? projects : projects.filter(project => project.category === selectedCategory));
      setLoading(false);
    }, 300); // 缩短延迟时间
  }, []);
  
  // 分类过滤
  useEffect(() => {
    if (selectedCategory === '全部') {
      setFilteredProjects(allProjects);
    } else {
      setFilteredProjects(allProjects.filter(project => project.category === selectedCategory));
    }
  }, [selectedCategory, allProjects]);
  
  // 获取特色项目
  const featuredProjects = allProjects.filter(project => project.featured);

  return (
    <>
      {/* 页面头部 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-white py-20 md:py-28">
        <DecorativeElement />
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 fade-in">
              <span className="text-gradient">我的作品集</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-10 fade-in fade-in-delay-1">
              这里展示了我近期完成的一些项目作品。每个项目都代表了不同的挑战和学习经历，见证我的技术成长。
            </p>
            <div className="flex flex-wrap justify-center gap-4 fade-in fade-in-delay-2">
              <a href="#projects" className="btn-primary">
                浏览项目
              </a>
              <Link to="/contact" className="btn-secondary">
                合作咨询
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 精选项目 */}
      {featuredProjects.length > 0 && !loading && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center float-up">
                <span className="h-px flex-grow bg-gray-200 mr-4"></span>
                精选项目
                <span className="h-px flex-grow bg-gray-200 ml-4"></span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {featuredProjects.map((project, index) => (
                  <div key={project.id} className="float-up" style={{ animationDelay: `${0.2 + index * 0.2}s` }}>
                    <ProjectCard
                      project={project}
                      onClick={() => setSelectedProject(project)}
                      index={index}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* 项目分类和列表 */}
      <section id="projects" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center slide-in-left">所有项目</h2>
            
            {/* 分类筛选 */}
            <div className="flex flex-wrap justify-center gap-3 mb-12 slide-in-right">
              {(['全部', '前端开发', '全栈应用', '移动端', 'UI/UX', '小工具'] as Category[]).map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    px-5 py-3 font-medium transition-all duration-300 
                    ${selectedCategory === category 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'}
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* 项目列表 */}
            {loading ? (
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : filteredProjects.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => {
                  const imageUrl = project.imageUrl.startsWith('http') 
                    ? project.imageUrl 
                    : `https://placehold.co/600x400/${getRandomColor()}/${getRandomColor(true)}?text=${encodeURIComponent(project.title)}`;
                    
                  return (
                    <div 
                      key={project.id} 
                      className="fade-in bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer" 
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden mb-4">
                        <img 
                          src={imageUrl} 
                          alt={project.title} 
                          loading="lazy"
                          width="600"
                          height="400"
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null; // 防止无限循环
                            target.src = `https://placehold.co/600x400/${getRandomColor()}/${getRandomColor(true)}?text=${encodeURIComponent(project.title)}`;
                          }}
                        />
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                      </div>
                      <div className="px-4 pb-4">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs uppercase tracking-wider text-gray-500">{project.category}</span>
                          <span className="text-xs text-gray-500">{project.year}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-gray-600 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 line-clamp-2">{project.shortDesc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 slide-in-bottom">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">暂无该分类的项目</h3>
                <p className="text-gray-500 mb-6">请选择其他分类查看</p>
                <button
                  onClick={() => setSelectedCategory('全部')}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  查看全部项目
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* 项目详情模态窗口 */}
      {selectedProject && (
        <ProjectDetails
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* 联系区域 */}
      <section className="py-8 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="w-full flex flex-col md:flex-row items-center justify-between bg-gray-50 border-l-4 border-indigo-500 px-6 py-4 rounded-r-lg">
            <div className="flex items-center mb-4 md:mb-0">
              <svg className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9" 
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="text-sm font-medium text-gray-700">需要定制开发项目或技术咨询？</p>
            </div>
            <Link 
              to="/contact" 
              className="inline-flex items-center px-4 py-2 border border-indigo-500 text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition-colors rounded"
            >
              与我联系
              <svg className="w-3.5 h-3.5 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects; 