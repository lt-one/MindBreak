import React from 'react';

interface MindBreakLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
}

const MindBreakLogo = ({ 
  size = 'md',
  variant = 'dark'
}: MindBreakLogoProps) => {
  // 根据尺寸设置大小
  const sizeClass = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  }[size];

  // 根据变体设置颜色 - 更新为黑白灰配色
  const variantClass = {
    dark: 'text-gray-900',
    light: 'text-white',
  }[variant];

  return (
    <div className={`mindbreak-logo ${sizeClass} ${variantClass} font-bold`}>
      <span className="mindbreak-logo-mind">见</span>
      <span className="mindbreak-logo-mind">心</span>
      <span className="mindbreak-logo-break text-gray-500">光</span>
      <div className="mindbreak-logo-underline h-0.5 w-full bg-gradient-to-r from-black via-gray-500 to-white mt-1"></div>
    </div>
  );
};

export default MindBreakLogo; 