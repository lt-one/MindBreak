import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BlogCardProps {
  title: string;
  date: string;
  excerpt: string;
  imageSrc: string;
  category: string;
  slug: string;
  onNavigate?: (path: string) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  date,
  excerpt,
  imageSrc,
  category,
  slug,
  onNavigate
}) => {
  const navigate = useNavigate();
  
  // 处理点击事件
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // 使用外部导航函数或内部导航
    if (onNavigate) {
      onNavigate(`/blog/${slug}`);
    } else {
      navigate(`/blog/${slug}`);
    }
  };
  
  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
    >
      {/* 图片容器 */}
      <div className="h-48 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      {/* 内容 */}
      <div className="p-6">
        {/* 类别与日期 */}
        <div className="flex justify-between items-center mb-2">
          <span className="px-3 py-1 text-xs rounded-full bg-accent/10 text-accent font-medium">
            {category}
          </span>
          <span className="text-sm text-gray-500">
            {date}
          </span>
        </div>
        
        {/* 标题 */}
        <h3 className="text-xl font-bold text-text mb-2 line-clamp-2">{title}</h3>
        
        {/* 摘要 */}
        <p className="text-text-light mb-4 line-clamp-3">{excerpt}</p>
        
        {/* 阅读更多按钮 */}
        <button 
          onClick={handleClick}
          className="text-accent font-medium inline-flex items-center transition-all hover:translate-x-1"
        >
          阅读更多
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BlogCard; 