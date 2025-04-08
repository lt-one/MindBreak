/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f1fe',
          100: '#cce3fd',
          200: '#99c7fb',
          300: '#66abf9',
          400: '#338ff7',
          500: '#006FEE',
          600: '#005bc1',
          700: '#004494',
          800: '#002e62',
          900: '#001731',
        },
        secondary: '#F5F7FA',    // 更柔和的背景色
        accent: '#1E293B',       // 深蓝灰色强调色
        accent2: '#005bc1',      // 与primary.600保持一致的强调色
        text: '#111827',         // 主文本颜色
        textLight: '#6B7280',    // 浅色文本
        border: '#E5E7EB',       // 边框颜色
      },
      fontFamily: {
        display: ['Montserrat', 'sans-serif'],   // 用于标题
        body: ['Inter', 'sans-serif'],           // 用于正文
        'kai': ['"KaiTi"', '"KaiTi_GB2312"', '"STKaiti"', 'serif'],
        'song': ['"SimSun"', '"SimSun-ExtB"', '"NSimSun"', 'serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'custom': '0 4px 20px rgba(0, 0, 0, 0.05)',  // 自定义阴影
        'hover': '0 10px 25px rgba(0, 0, 0, 0.1)',   // 悬停时的阴影
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        'sway-slow': 'sway 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-very-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'draw': 'draw 3s ease-in-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        twinkle: {
          '0%, 100%': { opacity: 0.2 },
          '50%': { opacity: 0.8 },
        },
        draw: {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}