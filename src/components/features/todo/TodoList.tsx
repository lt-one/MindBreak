import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { Todo as ApiTodo } from '../../../services/api/todoService';
import { motion } from 'framer-motion';

// 本地Todo接口
interface LocalTodo {
  id: number;
  title: string;
  completed: boolean;
  priority: number; // 0:低, 1:中, 2:高
  createdAt: Date;
}

// TodoList组件的Props接口
interface TodoListProps {
  todos: ApiTodo[];
  onToggleTodo: (id: number) => Promise<void>;
  onDeleteTodo: (id: number) => Promise<void>;
  onEditTodo: (id: number, title: string) => Promise<boolean>;
  onAddTodo: (title: string, priority: number) => Promise<boolean>;
  onReorderTodos?: (reorderedTodos: ApiTodo[]) => Promise<void>;
}

// 转换函数：将API Todo转换为LocalTodo
const toLocalTodo = (apiTodo: ApiTodo): LocalTodo => {
  return {
    id: apiTodo.id || 0,
    title: apiTodo.title,
    completed: apiTodo.completed,
    priority: apiTodo.priority || 0,
    createdAt: apiTodo.created_at ? new Date(apiTodo.created_at) : new Date()
  };
};

// 转换函数：将LocalTodo转换为API Todo
const toApiTodo = (localTodo: LocalTodo): ApiTodo => {
  return {
    id: localTodo.id,
    title: localTodo.title,
    completed: localTodo.completed,
    priority: localTodo.priority,
    created_at: localTodo.createdAt.toISOString()
  };
};

const TodoList: React.FC<TodoListProps> = ({ 
  todos: apiTodos,
  onToggleTodo,
  onDeleteTodo,
  onEditTodo,
  onAddTodo,
  onReorderTodos
}) => {
  // 转换API Todos为本地格式
  const [localTodos, setLocalTodos] = useState<LocalTodo[]>([]);
  
  // 当API todos变化时，转换为本地格式
  useEffect(() => {
    setLocalTodos(apiTodos.map(todo => toLocalTodo(todo)));
  }, [apiTodos]);

  // 添加新的Todo
  const handleAddTodo = async (title: string, priority: number) => {
    const result = await onAddTodo(title, priority);
    return result;
  };

  // 切换Todo完成状态
  const handleToggleTodo = async (id: number) => {
    await onToggleTodo(id);
  };

  // 删除Todo
  const handleDeleteTodo = async (id: number) => {
    await onDeleteTodo(id);
  };

  // 编辑Todo
  const handleEditTodo = async (id: number, title: string) => {
    return await onEditTodo(id, title);
  };

  // 移动Todo顺序（上移或下移）
  const moveTodo = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === localTodos.length - 1)
    ) {
      return; // 已经在列表顶部或底部，无法移动
    }

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const items = Array.from(localTodos);
    const [movedItem] = items.splice(index, 1);
    items.splice(newIndex, 0, movedItem);

    setLocalTodos(items);
    
    // 转换回API格式并通知父组件
    if (onReorderTodos) {
      const apiItems = items.map(item => toApiTodo(item));
      onReorderTodos(apiItems);
    }
  };

  // 列表项动画变体
  const listItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
    >
      <TodoForm onAdd={handleAddTodo} />
      
      <div className="space-y-3 mt-6">
        {localTodos.length > 0 ? (
          localTodos.map((todo, index) => (
            <motion.div 
              key={todo.id} 
              className="relative group"
              custom={index}
              initial="hidden"
              animate="visible"
              variants={listItemVariants}
            >
              {index > 0 && (
                <button 
                  onClick={() => moveTodo(index, 'up')}
                  className="absolute -left-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 text-accent2 hover:text-accent transition-opacity"
                  title="上移"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
              {index < localTodos.length - 1 && (
                <button 
                  onClick={() => moveTodo(index, 'down')}
                  className="absolute -left-8 top-3/4 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 text-accent2 hover:text-accent transition-opacity"
                  title="下移"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
              <TodoItem
                todo={toApiTodo(todo)}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
                onEdit={handleEditTodo}
              />
            </motion.div>
          ))
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg border border-gray-100"
          >
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-accent font-medium">没有待办事项，添加一些吧！</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default TodoList; 