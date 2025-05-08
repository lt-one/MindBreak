import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface TodoFormProps {
  onAdd: (title: string, priority: number) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<number>(1); // 默认中优先级
  const [isExpanded, setIsExpanded] = useState(false);
  
  // 处理提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim(), priority);
      setTitle('');
      // 如果不保持展开，则重置表单状态
      if (!isExpanded) {
        setPriority(1);
      }
    }
  };
  
  // 处理输入框获得焦点
  const handleFocus = () => {
    setIsExpanded(true);
  };
  
  // 处理输入框失去焦点
  const handleBlur = (e: React.FocusEvent) => {
    // 使用 setTimeout 来允许点击优先级按钮先于 blur 事件处理
    setTimeout(() => {
      if (!e.currentTarget.contains(document.activeElement)) {
        setIsExpanded(false);
      }
    }, 0);
  };
  
  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="mb-6"
      onBlur={handleBlur}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={handleFocus}
          placeholder="添加新的待办事项..."
          className="w-full py-3 px-4 pr-12 rounded-lg border border-gray-300 focus:border-accent2 focus:ring-2 focus:ring-accent2/20 focus:outline-none transition-all duration-200 shadow-sm"
          autoComplete="off"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-accent2 text-white rounded-full hover:bg-accent hover:scale-105 transition-all duration-200"
          disabled={!title.trim()}
          aria-label="添加待办事项"
        >
          <FaPlus size={12} />
        </button>
      </div>
      
      {/* 优先级选择器 - 仅在获得焦点后显示 */}
      {isExpanded && (
        <motion.div 
          className="flex items-center mt-3 space-x-2"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-sm text-accent">优先级：</span>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setPriority(0)}
              className={`px-3 py-1 text-xs rounded-full transition-all duration-200 ${
                priority === 0 
                  ? 'bg-blue-200 text-blue-800 shadow-sm' 
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              }`}
            >
              低
            </button>
            <button
              type="button"
              onClick={() => setPriority(1)}
              className={`px-3 py-1 text-xs rounded-full transition-all duration-200 ${
                priority === 1 
                  ? 'bg-yellow-200 text-yellow-800 shadow-sm' 
                  : 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
              }`}
            >
              中
            </button>
            <button
              type="button"
              onClick={() => setPriority(2)}
              className={`px-3 py-1 text-xs rounded-full transition-all duration-200 ${
                priority === 2 
                  ? 'bg-red-200 text-red-800 shadow-sm' 
                  : 'bg-red-100 text-red-600 hover:bg-red-200'
              }`}
            >
              高
            </button>
          </div>
        </motion.div>
      )}
    </motion.form>
  );
};

export default TodoForm; 