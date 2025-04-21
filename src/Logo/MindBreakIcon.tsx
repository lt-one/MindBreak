interface MindBreakIconProps {
  size?: number;
  className?: string;
}

const MindBreakIcon = ({ 
  size = 40, 
  className = "" 
}: MindBreakIconProps) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 80 80" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 外圆 - 代表心的边界 */}
      <circle cx="40" cy="40" r="36" stroke="url(#mindbreak-gradient)" strokeWidth="2" fill="none" />
      
      {/* 内部光芒 - 代表心光 */}
      <path d="M40 12C40 12 25 28 25 40C25 52 40 68 40 68C40 68 55 52 55 40C55 28 40 12 40 12Z" fill="url(#mindbreak-gradient)" fillOpacity="0.7" />
      
      {/* 中心点 - 代表专注 */}
      <circle cx="40" cy="40" r="8" fill="url(#mindbreak-gradient)" />
      
      {/* 光线 - 代表思维的放射与突破 */}
      <path d="M40 10V4" stroke="url(#mindbreak-gradient)" strokeWidth="2" strokeLinecap="round" />
      <path d="M40 76V70" stroke="url(#mindbreak-gradient)" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 40H4" stroke="url(#mindbreak-gradient)" strokeWidth="2" strokeLinecap="round" />
      <path d="M76 40H70" stroke="url(#mindbreak-gradient)" strokeWidth="2" strokeLinecap="round" />
      <path d="M18.3431 18.3431L14.1005 14.1005" stroke="url(#mindbreak-gradient)" strokeWidth="2" strokeLinecap="round" />
      <path d="M65.8995 65.8995L61.6569 61.6569" stroke="url(#mindbreak-gradient)" strokeWidth="2" strokeLinecap="round" />
      <path d="M18.3431 61.6569L14.1005 65.8995" stroke="url(#mindbreak-gradient)" strokeWidth="2" strokeLinecap="round" />
      <path d="M65.8995 14.1005L61.6569 18.3431" stroke="url(#mindbreak-gradient)" strokeWidth="2" strokeLinecap="round" />
      
      {/* 渐变定义 - 修改为黑白灰配色 */}
      <defs>
        <linearGradient id="mindbreak-gradient" x1="10" y1="10" x2="70" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#000000" />
          <stop offset="50%" stopColor="#4A4A4A" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default MindBreakIcon; 