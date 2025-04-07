import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  demoUrl?: string;
  codeUrl?: string;
  onNavigate?: (path: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  imageUrl, 
  technologies, 
  demoUrl, 
  codeUrl,
  onNavigate
}) => {
  const handleDemoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (demoUrl) {
      if (demoUrl.startsWith('http')) {
        window.open(demoUrl, '_blank');
      } else if (onNavigate) {
        onNavigate(demoUrl);
      }
    }
  };
  
  const handleCodeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (codeUrl) {
      window.open(codeUrl, '_blank');
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02]">
      {/* 项目图片 */}
      <div className="h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* 项目内容 */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-text mb-2">{title}</h3>
        <p className="text-text-light mb-4">{description}</p>
        
        {/* 技术标签 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span 
              key={index}
              className="px-2 py-1 text-xs bg-secondary rounded-full text-text-light"
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* 按钮区域 */}
        <div className="flex space-x-3">
          {demoUrl && (
            <button
              onClick={handleDemoClick}
              className="btn-primary flex-1 flex items-center justify-center text-sm"
            >
              <span>查看演示</span>
            </button>
          )}
          
          {codeUrl && (
            <button
              onClick={handleCodeClick}
              className="btn-secondary flex-1 flex items-center justify-center text-sm"
            >
              <span>查看代码</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 