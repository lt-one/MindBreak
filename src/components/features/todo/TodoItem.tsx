import React, { useState } from 'react';
import { Todo } from '../../../services/api/todoService';
import { motion } from 'framer-motion';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ 
  todo, 
  onToggle, 
  onDelete, 
  onEdit
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);

  // 优先级对应的样式
  const priorityStyles = {
    0: 'bg-blue-100 border-blue-300 text-blue-800', // 低优先级
    1: 'bg-yellow-100 border-yellow-300 text-yellow-800', // 中优先级
    2: 'bg-red-100 border-red-300 text-red-800', // 高优先级
  };
  
  // 获取优先级对应的样式
  const getPriorityStyle = () => {
    return priorityStyles[todo.priority as keyof typeof priorityStyles] || priorityStyles[0];
  };

  // 获取优先级文本
  const getPriorityText = () => {
    switch (todo.priority) {
      case 0: return '低';
      case 1: return '中';
      case 2: return '高';
      default: return '低';
    }
  };

  // 处理提交编辑
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editValue.trim() && todo.id !== undefined) {
      onEdit(todo.id, editValue);
      setIsEditing(false);
    }
  };

  // 处理取消编辑
  const handleCancel = () => {
    setEditValue(todo.title);
    setIsEditing(false);
  };

  // 格式化创建时间 - 改进版，确保正确处理时区并增加错误处理
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '未知时间';
    
    try {
      // 解析ISO日期字符串为本地Date对象
      const date = new Date(dateString);
      
      // 验证日期是否有效
      if (isNaN(date.getTime())) {
        console.error('无效的日期字符串:', dateString);
        return '日期无效';
      }
      
      // 格式化为本地时间字符串
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('日期格式化错误:', error);
      return '时间格式错误';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-4 mb-3 border rounded-xl shadow-sm transition-all duration-200 hover-lift
                ${todo.completed ? 'bg-gray-50' : 'bg-white'}`}
    >
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent2 focus:border-transparent transition-all duration-300"
            autoFocus
          />
          <div className="flex items-center ml-2">
            <button 
              type="submit" 
              className="px-3 py-1 mr-2 text-sm bg-accent2 text-white rounded-lg hover:bg-accent2/90 transition-colors"
            >
              保存
            </button>
            <button 
              type="button" 
              onClick={handleCancel}
              className="px-3 py-1 text-sm bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              取消
            </button>
          </div>
        </form>
      ) : (
        <div className="flex items-start">
          <div className="flex-grow">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => todo.id !== undefined && onToggle(todo.id)}
                className="h-5 w-5 text-accent2 rounded focus:ring-accent2"
              />
              <span 
                className={`ml-2 text-lg font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-accent'}`}
              >
                {todo.title}
              </span>
              <span 
                className={`ml-2 text-xs px-2 py-1 rounded-full ${getPriorityStyle()}`}
              >
                {getPriorityText()}
              </span>
            </div>
            
            <div className="mt-2 text-xs text-text-light font-medium">
              创建于: {formatDate(todo.created_at)}
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-accent2 hover:text-accent2/80 transition-colors"
              title="编辑"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
            <button
              onClick={() => todo.id !== undefined && onDelete(todo.id)}
              className="p-1 text-red-500 hover:text-red-700 transition-colors"
              title="删除"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TodoItem; 