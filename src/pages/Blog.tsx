import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';

// 定义博客文章类型
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: number;
  category: string;
  imageSrc: string;
  tags: string[];
  slug: string;
  featured?: boolean;
}

// 文章卡片组件 - 小型卡片
const BlogCardSmall: React.FC<{ post: BlogPost, index: number }> = ({ post, index }) => {
  const navigate = useNavigate();
  const delay = index * 0.1;
  
  return (
    <article 
      onClick={() => navigate(`/blog/${post.slug}`)}
      className="group cursor-pointer transform transition duration-300 hover:-translate-y-1"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden mb-4">
        <img 
          src={post.imageSrc} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white font-medium px-4 py-2 border border-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            阅读文章
          </span>
        </div>
      </div>
      
      <div className="px-2">
        <span className="text-xs uppercase tracking-wider text-gray-500 mb-2 block">
          {post.date} · {post.category}
        </span>
        <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-gray-700 transition-colors">
          {post.title}
        </h3>
        <div className="flex items-center mt-3">
          <span className="text-sm text-gray-500">{post.readTime} 分钟阅读</span>
        </div>
      </div>
    </article>
  );
};

// 文章卡片组件 - 大型卡片
const BlogCardLarge: React.FC<{ post: BlogPost }> = ({ post }) => {
  const navigate = useNavigate();

  return (
    <article 
      className="grid md:grid-cols-2 gap-8 mb-16 cursor-pointer group"
      onClick={() => navigate(`/blog/${post.slug}`)}
    >
      <div className="relative overflow-hidden">
        <img 
          src={post.imageSrc} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="flex flex-col justify-center">
        <span className="text-sm uppercase tracking-wider text-gray-500 mb-4">
          {post.date} · {post.category}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 group-hover:text-gray-700 transition-colors">
          {post.title}
        </h2>
        <p className="text-gray-600 mb-6">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-none">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-sm text-gray-500">{post.author}</span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-sm text-gray-500">{post.readTime} 分钟阅读</span>
          </div>
          <span className="text-gray-900 font-medium group-hover:translate-x-2 transition-transform duration-300 flex items-center">
            阅读全文
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
};

// 分类标签组件
const CategoryBadge: React.FC<{category: string, isActive?: boolean, onClick?: () => void}> = 
  ({ category, isActive = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium transition-colors ${
        isActive 
          ? 'bg-gray-900 text-white' 
          : 'bg-transparent text-gray-700 hover:bg-gray-100'
      }`}
    >
      {category}
    </button>
  );
};

const Blog: React.FC = () => {
  
  // 博客数据
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: '响应式设计的未来趋势',
      slug: 'responsive-design-future-trends',
      excerpt: '探索现代web设计中响应式设计的最新趋势和技术，了解如何为各种设备创建无缝体验。',
      content: '',
      date: '2023-05-18',
      author: '张明',
      readTime: 8,
      category: '设计',
      imageSrc: 'https://placehold.co/800x600/5271ff/ffffff?text=Design+Trends',
      tags: ['响应式设计', 'UI/UX', '前端开发'],
      featured: true
    },
    {
      id: 2,
      title: 'React 18 性能优化指南',
      slug: 'react-18-performance-guide',
      excerpt: '深入了解React 18中的新特性如何提升应用性能，以及如何利用这些特性优化你的项目。',
      content: '',
      date: '2023-04-10',
      author: '李伟',
      readTime: 12,
      category: '前端开发',
      imageSrc: 'https://placehold.co/800x600/3178c6/ffffff?text=React+18',
      tags: ['React', 'JavaScript', '性能优化']
    },
    {
      id: 3,
      title: '使用 TypeScript 提升代码质量',
      slug: 'typescript-code-quality',
      excerpt: 'TypeScript如何帮助开发团队减少错误，提高可维护性，以及在大型项目中的实际应用案例。',
      content: '',
      date: '2023-03-25',
      author: '王静',
      readTime: 10,
      category: '前端开发',
      imageSrc: 'https://placehold.co/800x600/38bdf8/ffffff?text=TypeScript',
      tags: ['TypeScript', '前端开发', '代码质量']
    },
    {
      id: 4,
      title: '现代Web动效设计',
      slug: 'modern-web-animations',
      excerpt: '探索如何使用最新的CSS和JavaScript技术创建流畅、有意义的网页动效，提升用户体验。',
      content: '',
      date: '2023-03-02',
      author: '刘佳',
      readTime: 7,
      category: '设计',
      imageSrc: 'https://placehold.co/800x600/f472b6/ffffff?text=Web+Animations',
      tags: ['CSS', 'JavaScript', '动效设计']
    },
    {
      id: 5,
      title: 'Tailwind CSS 实战技巧',
      slug: 'tailwind-css-tips',
      excerpt: '从组件设计到性能优化，分享使用Tailwind CSS的高级技巧和最佳实践。',
      content: '',
      date: '2023-02-20',
      author: '陈涛',
      readTime: 9,
      category: '前端开发',
      imageSrc: 'https://placehold.co/800x600/22c55e/ffffff?text=Tailwind+CSS',
      tags: ['CSS', 'Tailwind', '前端开发']
    },
    {
      id: 6,
      title: '设计系统在企业中的应用',
      slug: 'design-systems-enterprise',
      excerpt: '如何构建和维护企业级设计系统，确保产品视觉和交互一致性的方法论。',
      content: '',
      date: '2023-01-15',
      author: '张明',
      readTime: 11,
      category: '设计',
      imageSrc: 'https://placehold.co/800x600/a855f7/ffffff?text=Design+Systems',
      tags: ['设计系统', 'UI/UX', '企业应用']
    },
    {
      id: 7,
      title: 'Web3与去中心化应用开发',
      slug: 'web3-dapp-development',
      excerpt: '了解Web3技术栈和去中心化应用开发的基础知识，以及未来发展趋势。',
      content: '',
      date: '2022-12-10',
      author: '王磊',
      readTime: 14,
      category: '前沿技术',
      imageSrc: 'https://placehold.co/800x600/f97316/ffffff?text=Web3',
      tags: ['Web3', '区块链', '去中心化']
    },
    {
      id: 8,
      title: '前端微服务架构实践',
      slug: 'frontend-microservices',
      excerpt: '微前端架构如何帮助大型团队更高效地开发和维护复杂的Web应用。',
      content: '',
      date: '2022-11-28',
      author: '李伟',
      readTime: 13,
      category: '架构',
      imageSrc: 'https://placehold.co/800x600/3b82f6/ffffff?text=Micro+Frontend',
      tags: ['微前端', '架构', '前端开发']
    }
  ];

  // 状态管理
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts); // 直接初始化为所有文章
  const [loading, setLoading] = useState(false); // 默认不显示加载状态

  // 获取所有分类
  const categories = ['全部', ...Array.from(new Set(blogPosts.map(post => post.category)))];
  
  // 获取特色文章
  const featuredPost = blogPosts.find(post => post.featured);

  // 过滤博客文章
  useEffect(() => {
    setLoading(true);
    
    // 去掉延迟，直接过滤文章
    const filtered = selectedCategory === '全部' 
      ? blogPosts 
      : blogPosts.filter(post => post.category === selectedCategory);
    
    setFilteredPosts(filtered);
    setLoading(false);
    
  }, [selectedCategory]);

  return (
    <>
      {/* 页面头部 */}
      <section className="pt-20 pb-12 md:pt-32 md:pb-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl">
            <span className="inline-block text-sm font-medium uppercase tracking-wider text-gray-500 mb-6">
              我们的思想
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              博客与见解
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              探索我们对设计、开发和数字体验的见解。从技术趋势到项目案例，分享我们的专业知识和思考。
            </p>
          </div>
        </div>
      </section>
      
      {/* 特色文章 */}
      {featuredPost && !loading && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="mb-12">
              <span className="text-sm font-medium uppercase tracking-wider text-gray-500">
                精选文章
              </span>
              <h2 className="text-3xl font-bold mt-2">最新洞见</h2>
            </div>
            
            <BlogCardLarge post={featuredPost} />
          </div>
        </section>
      )}
      
      {/* 文章分类 */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-wrap border-b border-gray-200 mb-12">
            {categories.map((category) => (
              <CategoryBadge
                key={category}
                category={category}
                isActive={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              />
            ))}
          </div>
          
          {/* 文章列表 */}
          {loading ? (
            <div className="flex justify-center items-center py-32">
              <div className="w-12 h-12 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <BlogCardSmall key={post.id} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">没有找到相关文章</h3>
              <p className="text-gray-500 mb-6">尝试选择其他分类或重置筛选条件</p>
              <button
                onClick={() => setSelectedCategory('全部')}
                className="px-6 py-3 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
              >
                查看全部文章
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* 订阅区域 */}
      <section className="py-10 md:py-14 bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <div className="mb-6 md:mb-0 md:w-1/2 md:pr-6 flex items-start">
              <div className="mr-4 bg-indigo-500/20 p-3 rounded-full">
                <svg className="w-6 h-6 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 20H5V9L12 4L19 9V20Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5 20H3V18C3 16.9 3.9 16 5 16H19C20.1 16 21 16.9 21 18V20H19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 20V12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2 text-white">订阅我的博客</h2>
                <p className="text-sm text-gray-300">
                  获取最新文章和行业见解，我们只发送高质量内容
                </p>
              </div>
            </div>
            <div className="md:w-1/2">
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="您的邮箱地址"
                  className="px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 transition-colors whitespace-nowrap"
                >
                  立即订阅
                </button>
              </form>
              <p className="text-xs text-gray-400 mt-2">我们尊重您的隐私，绝不会发送垃圾邮件</p>
            </div>
          </div>
        </div>
      </section>
    
    </>
  );
};

export default Blog; 