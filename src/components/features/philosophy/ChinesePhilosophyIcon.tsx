import React from 'react';

// 这是一个SVG图标组件，融合了王阳明心学和道家思想的元素
const ChinesePhilosophyIcon: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 48, className = '' }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 外圆 - 代表宇宙/天地 */}
      <circle cx="100" cy="100" r="95" stroke="#4F46E5" strokeWidth="2" fill="#F5F3FF" opacity="0.8" />
      
      {/* 发散光芒 - 表示道的辐射和心的影响 */}
      {[...Array(24)].map((_, i) => {
        const angle = (i * 15) * Math.PI / 180;
        const innerX = 100 + 40 * Math.cos(angle);
        const innerY = 100 + 40 * Math.sin(angle);
        const outerX = 100 + 95 * Math.cos(angle);
        const outerY = 100 + 95 * Math.sin(angle);
        return <line key={i} x1={innerX} y1={innerY} x2={outerX} y2={outerY} 
                     stroke="#6366F1" strokeWidth={i % 2 === 0 ? "1" : "0.5"} opacity="0.5" />
      })}

      {/* 内圆 - 表示"心" */}
      <circle cx="100" cy="100" r="40" fill="#6366F1" opacity="0.8" />
      
      {/* 山水元素 - 代表自然和道 */}
      <path d="M65 120 L85 90 L95 105 L110 80 L125 100 L140 90" 
            stroke="#1E40AF" strokeWidth="2" fill="none" />
            
      {/* 汉字"心" */}
      <text x="90" y="108" fontFamily="serif" fontSize="28" fill="white">心</text>
      
      {/* 汉字"道" */}
      <text x="130" y="70" fontFamily="serif" fontSize="20" fill="#1E40AF">道</text>
    </svg>
  );
};

// 另一种风格的图标，更加简约的设计
export const SimpleChinesePhilosophyIcon: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 48, className = '' }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 外圆 */}
      <circle cx="100" cy="100" r="95" stroke="#4F46E5" strokeWidth="2" fill="white" />
      
      {/* 波浪线 - 代表"水"和"柔" */}
      <path 
        d="M40 100 Q55 80 70 100 Q85 120 100 100 Q115 80 130 100 Q145 120 160 100" 
        stroke="#4F46E5" 
        strokeWidth="2" 
        fill="none" 
      />
      
      {/* 中心点 - 代表"心" */}
      <circle cx="100" cy="100" r="15" fill="#4F46E5" />
      
      {/* 环绕线条 - 代表"道"和"气" */}
      <path 
        d="M100 40 C140 40 160 70 160 100 C160 130 140 160 100 160 C60 160 40 130 40 100 C40 70 60 40 100 40" 
        stroke="#4F46E5" 
        strokeWidth="2" 
        strokeDasharray="5,5"
        fill="none" 
      />
    </svg>
  );
};

export default ChinesePhilosophyIcon; 