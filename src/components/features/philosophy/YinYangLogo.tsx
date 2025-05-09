import React, { useId } from 'react';

interface YinYangLogoProps {
  size?: number;
  className?: string;
}

const YinYangLogo: React.FC<YinYangLogoProps> = ({ size = 200, className = '' }) => {
  // 生成唯一ID前缀，避免多个组件实例时的ID冲突
  const idPrefix = useId();
  const yinGradientId = `yin-gradient-${idPrefix}`;
  const yangGradientId = `yang-gradient-${idPrefix}`;
  const glowId = `glow-${idPrefix}`;
  
  return (
    <div 
      className={`relative ${className}`} 
      style={{ width: size, height: size }}
    >
      <svg 
        viewBox="0 0 100 100" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full animate-spin-slow"
        style={{ animationDuration: '30s' }}
      >
        {/* 背景圆形 */}
        <defs>
          <linearGradient id={yinGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="100%" stopColor="#333333" />
          </linearGradient>
          <linearGradient id={yangGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E5E7EB" />
          </linearGradient>
          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* 外部圆环 */}
        <circle cx="50" cy="50" r="48" fill="none" stroke="#4B5563" strokeWidth="1" />
        
        {/* 太极主体 */}
        <circle cx="50" cy="50" r="45" fill={`url(#${yinGradientId})`} filter={`url(#${glowId})`} />
        <path 
          d="M50,5 A45,45 0 0,1 50,95 A22.5,22.5 0 0,1 50,50 A22.5,22.5 0 0,0 50,5" 
          fill={`url(#${yangGradientId})`} 
          filter={`url(#${glowId})`}
        />
        
        {/* 阴中阳、阳中阴的小圆 */}
        <circle cx="50" cy="27.5" r="7" fill={`url(#${yangGradientId})`} />
        <circle cx="50" cy="72.5" r="7" fill={`url(#${yinGradientId})`} />
      </svg>
      
      {/* 光晕效果 */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
          pointerEvents: 'none'
        }}
      ></div>
    </div>
  );
};

export default YinYangLogo; 