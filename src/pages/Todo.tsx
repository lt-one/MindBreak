import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTasks, FaFileDownload, FaFileUpload, FaSync, FaWifi } from 'react-icons/fa';
import { MdWifiOff } from 'react-icons/md';
import TodoList from '../components/features/todo/TodoList';
import todoService, { Todo } from '../services/api/todoService';

const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [stats, setStats] = useState<{ total: number; completed: number; pending: number }>({
    total: 0,
    completed: 0,
    pending: 0,
  });

  // 加载Todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        let data: Todo[] = [];
        try {
          const apiResponse = await todoService.getTodos();
          // 确保数据是数组
          if (Array.isArray(apiResponse)) {
            data = apiResponse;
            setIsOnline(true);
            setError(null);
          } else {
            console.error('Received non-array data from API:', apiResponse);
            // 如果API返回非数组数据，尝试使用本地存储的mock数据
            data = todoService.getLocalTodos();
            console.log('Using local mock data instead:', data);
            setIsOnline(false);
            setError('API返回格式不正确，已切换到离线模式');
          }
        } catch (apiError) {
          console.error('API Error:', apiError);
          // 使用本地存储的mock数据
          data = todoService.getLocalTodos();
          console.log('Using local mock data due to API error:', data);
          setIsOnline(false);
          setError('无法连接到服务器，使用离线模式');
        }
        
        setTodos(data);
        updateStats(data);
      } catch (err) {
        setError('加载任务列表失败，请稍后再试');
        console.error('获取任务列表出错:', err);
        // 即使出错也尝试使用本地mock数据
        try {
          const localData = todoService.getLocalTodos();
          setTodos(localData);
          updateStats(localData);
          setIsOnline(false);
        } catch (localError) {
          console.error('Local data retrieval also failed:', localError);
          setTodos([]); // 最后的后备方案是空数组
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  // 更新统计信息
  const updateStats = (todoList: Todo[] | any[]) => {
    if (!Array.isArray(todoList)) {
      console.error('updateStats: todoList is not an array', todoList);
      todoList = []; // 使用空数组作为后备方案
    }
    const total = todoList.length;
    const completed = todoList.filter((todo: Todo) => todo.completed).length;
    const pending = total - completed;
    setStats({ total, completed, pending });
  };

  // 同步到服务器
  const handleSync = async () => {
    if (isOnline) {
      // 如果已在线，刷新数据
      await handleRefresh();
      return;
    }
    
    try {
      setIsSyncing(true);
      setError(null);
      
      await todoService.syncToServer();
      
      // 重新获取最新数据
      const apiResponse = await todoService.getTodos();
      setTodos(apiResponse);
      updateStats(apiResponse);
      
      setIsOnline(true);
      setError(null);
    } catch (err) {
      console.error('同步数据出错:', err);
      setError('同步数据失败，请检查网络连接');
    } finally {
      setIsSyncing(false);
    }
  };
  
  // 刷新数据
  const handleRefresh = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const apiResponse = await todoService.getTodos();
      setTodos(apiResponse);
      updateStats(apiResponse);
      
      setIsOnline(true);
    } catch (err) {
      console.error('刷新数据出错:', err);
      setError('刷新数据失败，已切换到离线模式');
      setIsOnline(false);
      
      // 使用本地数据
      const localData = todoService.getLocalTodos();
      setTodos(localData);
      updateStats(localData);
    } finally {
      setIsLoading(false);
    }
  };

  // 添加Todo
  const handleAddTodo = async (title: string, priority: number) => {
    try {
      const newTodo = await todoService.createTodo({
        title,
        completed: false,
        priority,
      });
      
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      updateStats(updatedTodos);
      return true;
    } catch (err) {
      setError('添加任务失败，请稍后再试');
      console.error('添加任务出错:', err);
      return false;
    }
  };

  // 切换Todo状态
  const handleToggleTodo = async (id: number) => {
    try {
      const updatedTodo = await todoService.toggleTodoStatus(id);
      const updatedTodos = todos.map((todo) => 
        todo.id === id ? updatedTodo : todo
      );
      setTodos(updatedTodos);
      updateStats(updatedTodos);
    } catch (err) {
      setError('更新任务状态失败，请稍后再试');
      console.error('切换任务状态出错:', err);
    }
  };

  // 删除Todo
  const handleDeleteTodo = async (id: number) => {
    try {
      await todoService.deleteTodo(id);
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
      updateStats(updatedTodos);
    } catch (err) {
      setError('删除任务失败，请稍后再试');
      console.error('删除任务出错:', err);
    }
  };

  // 编辑Todo
  const handleEditTodo = async (id: number, title: string) => {
    try {
      const updatedTodo = await todoService.updateTodo(id, { title });
      const updatedTodos = todos.map((todo) => 
        todo.id === id ? updatedTodo : todo
      );
      setTodos(updatedTodos);
      return true;
    } catch (err) {
      setError('编辑任务失败，请稍后再试');
      console.error('编辑任务出错:', err);
      return false;
    }
  };

  // 重排序Todos
  const handleReorderTodos = async (reorderedTodos: Todo[]) => {
    // 更新本地状态
    setTodos(reorderedTodos);
    
    // 如果在线，将重排序同步到服务器
    if (isOnline) {
    // 这里可以添加保存顺序到服务器的逻辑
    // ...
    }
  };

  // 导出Todos为JSON文件
  const handleExportTodos = () => {
    try {
      const todosJson = JSON.stringify(todos, null, 2);
      const blob = new Blob([todosJson], { type: 'application/json' });
      
      // 使用原生方法替代file-saver库
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'todos.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError('导出任务失败，请稍后再试');
      console.error('导出任务出错:', err);
    }
  };

  // 导入Todos
  const handleImportTodos = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      
      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const jsonData = e.target?.result as string;
          const importedTodos = await todoService.importFromJSON(jsonData);
          
          setTodos((prevTodos) => [...prevTodos, ...importedTodos]);
          updateStats([...todos, ...importedTodos]);
          setError(null);
        };
        reader.readAsText(file);
      } catch (err) {
        setError('导入任务失败，请确保文件格式正确');
        console.error('导入任务出错:', err);
      } finally {
        // 重置文件输入
        fileInput.value = '';
      }
    }
  };

  // 动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  // 获取连接状态标签
  const getStatusLabel = () => {
    if (isSyncing) return '正在同步...';
    return isOnline ? '在线模式' : '离线模式';
  };

  // 获取连接状态颜色
  const getStatusColor = () => {
    if (isSyncing) return 'text-yellow-500';
    return isOnline ? 'text-green-500' : 'text-red-500';
  };

  // 获取连接状态图标
  const getStatusIcon = () => {
    if (isSyncing) return <FaSync className="animate-spin" />;
    return isOnline ? <FaWifi /> : <MdWifiOff />;
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="flex items-center justify-between mb-8"
          variants={itemVariants}
        >
          <h1 className="text-3xl font-bold text-accent flex items-center">
            <FaTasks className="mr-3 text-accent2" />
            <span className="text-gradient">待办事项清单</span>
          </h1>
          
          <div className="flex items-center space-x-3">
            {/* 连接状态指示器 */}
            <div className={`flex items-center px-3 py-1 rounded-full border ${isOnline ? 'border-green-300' : 'border-red-300'} ${getStatusColor()}`}>
              <span className="mr-2">{getStatusIcon()}</span>
              <span className="text-sm font-medium">{getStatusLabel()}</span>
            </div>
            
            {/* 同步按钮 */}
            <motion.button
              onClick={handleSync}
              className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 hover:-translate-y-0.5 shadow-sm hover:shadow-md transition-all duration-300"
              disabled={isSyncing}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaSync className={`mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
              {isOnline ? '刷新' : '同步'}
            </motion.button>
            
            {/* 导出按钮 */}
            <motion.button
              onClick={handleExportTodos}
              className="flex items-center px-4 py-2 bg-accent2 text-white rounded-lg hover:bg-accent hover:-translate-y-0.5 shadow-sm hover:shadow-md transition-all duration-300"
              disabled={todos.length === 0}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaFileDownload className="mr-2" />
              导出
            </motion.button>
            
            {/* 导入按钮 */}
            <motion.label 
              className="flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 hover:-translate-y-0.5 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaFileUpload className="mr-2" />
              导入
              <input
                type="file"
                accept=".json"
                onChange={handleImportTodos}
                className="hidden"
              />
            </motion.label>
          </div>
        </motion.div>

        {/* 错误提示 */}
        {error && (
          <motion.div 
            className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>{error}</p>
          </motion.div>
        )}
        
        {/* 统计信息 */}
        <motion.div 
          className="grid grid-cols-3 gap-4 mb-8"
          variants={itemVariants}
        >
          <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 text-center">
            <h3 className="text-lg font-semibold text-purple-600 mb-1">全部任务</h3>
            <p className="text-2xl font-bold text-purple-700">{stats.total}</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center">
            <h3 className="text-lg font-semibold text-emerald-600 mb-1">已完成</h3>
            <p className="text-2xl font-bold text-emerald-700">{stats.completed}</p>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-center">
            <h3 className="text-lg font-semibold text-amber-600 mb-1">待完成</h3>
            <p className="text-2xl font-bold text-amber-700">{stats.pending}</p>
          </div>
        </motion.div>

        {/* Todo列表 */}
        <motion.div variants={itemVariants}>
        {isLoading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-accent rounded-full border-b-transparent mx-auto animate-spin"></div>
              <p className="mt-4 text-gray-600">正在加载任务...</p>
          </div>
        ) : (
          <TodoList
            todos={todos}
            onToggleTodo={handleToggleTodo}
            onDeleteTodo={handleDeleteTodo}
            onEditTodo={handleEditTodo}
            onAddTodo={handleAddTodo}
            onReorderTodos={handleReorderTodos}
          />
        )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TodoPage; 