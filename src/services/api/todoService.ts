import apiClient, { API_ENDPOINTS } from './apiConfig';

// Todo接口定义
export interface Todo {
  id?: number;
  title: string;
  completed: boolean;
  priority: number;
  user_id?: number | null;
  created_at?: string;
  updated_at?: string;
}

// 查询参数接口
export interface TodoQueryParams {
  completed?: boolean;
  priority?: number;
  sort?: 'created_at' | 'priority';
  order?: 'asc' | 'desc';
}

// Todo服务
const todoService = {
  // 基础URL
  baseURL: API_ENDPOINTS.TODOS,

  // 模拟Todo数据 - 当API不可用时使用
  mockTodos: [
    {
      id: 1,
      title: '完成前端页面设计',
      completed: true,
      priority: 2,
      created_at: new Date(2023, 3, 15).toISOString()
    },
    {
      id: 2,
      title: '实现后端API集成',
      completed: false,
      priority: 2,
      created_at: new Date(2023, 3, 20).toISOString()
    },
    {
      id: 3,
      title: '编写单元测试',
      completed: false,
      priority: 1,
      created_at: new Date(2023, 3, 25).toISOString()
    },
    {
      id: 4,
      title: '部署应用到服务器',
      completed: false,
      priority: 1,
      created_at: new Date(2023, 4, 1).toISOString()
    }
  ],

  // 使用localStorage模拟持久化存储
  getLocalTodos(): Todo[] {
    try {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        return JSON.parse(storedTodos);
      }
      // 如果没有保存过Todo，使用默认的模拟数据
      localStorage.setItem('todos', JSON.stringify(this.mockTodos));
      return this.mockTodos;
    } catch (error) {
      console.error('Error getting local todos:', error);
      return this.mockTodos;
    }
  },

  // 保存Todo到localStorage
  saveLocalTodos(todos: Todo[]) {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving local todos:', error);
    }
  },

  /**
   * 获取Todo列表
   * @param params 查询参数
   * @returns Promise<Todo[]>
   */
  async getTodos(params?: TodoQueryParams): Promise<Todo[]> {
    try {
      console.log(`[TodoService] 正在从后端获取Todos: ${this.baseURL}`, params);
      
      // 添加带斜杠的路径确保正确匹配路由
      const url = this.baseURL.endsWith('/') ? this.baseURL : `${this.baseURL}/`;
      const response = await apiClient.get(url, { params });
      
      console.log('[TodoService] 成功获取Todos数据:', response.status, response.data);
      
      // 如果成功获取数据，同时更新本地存储
      if (Array.isArray(response.data)) {
        this.saveLocalTodos(response.data);
        return response.data;
      } else {
        console.error('[TodoService] API返回的数据格式不正确:', response.data);
        throw new Error('API返回的数据格式不正确');
      }
    } catch (error) {
      console.error('[TodoService] Error fetching todos, using local data:', error);
      // 从本地获取数据
      const localTodos = this.getLocalTodos();
      console.log('[TodoService] 使用本地Todo数据:', localTodos);
      return localTodos;
    }
  },

  /**
   * 获取单个Todo
   * @param id Todo ID
   * @returns Promise<Todo>
   */
  async getTodo(id: number): Promise<Todo> {
    try {
      console.log(`[TodoService] 正在获取Todo ID: ${id}`);
      const response = await apiClient.get(`${this.baseURL}/${id}`);
      console.log(`[TodoService] 成功获取Todo ID ${id}:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`[TodoService] Error fetching todo ${id}:`, error);
      // 尝试从本地存储获取
      const todos = this.getLocalTodos();
      const todo = todos.find(t => t.id === id);
      
      if (todo) {
        return todo;
      }
      
      throw error;
    }
  },

  /**
   * 创建新Todo
   * @param todo Todo对象
   * @returns Promise<Todo>
   */
  async createTodo(todo: Omit<Todo, 'id' | 'created_at' | 'updated_at'>): Promise<Todo> {
    try {
      console.log('[TodoService] 正在创建新Todo:', todo);
      console.log('[TodoService] 请求URL:', this.baseURL);
      
      // 添加带斜杠的路径确保正确匹配路由
      const url = this.baseURL.endsWith('/') ? this.baseURL : `${this.baseURL}/`;
      const response = await apiClient.post(url, todo);
      
      console.log('[TodoService] 成功创建Todo:', response.status, response.data);
      
      // 更新本地存储
      const todos = this.getLocalTodos();
      todos.push(response.data);
      this.saveLocalTodos(todos);
      
      return response.data;
    } catch (error) {
      console.error('[TodoService] Error creating todo:', error);
      console.error('[TodoService] Using local storage instead');
      
      // 使用本地存储模拟创建Todo
      const todos = this.getLocalTodos();
      const newTodo: Todo = {
        ...todo,
        id: Date.now(), // 使用时间戳作为ID
        created_at: new Date().toISOString()
      };
      
      todos.push(newTodo);
      this.saveLocalTodos(todos);
      
      return newTodo;
    }
  },

  /**
   * 更新Todo
   * @param id Todo ID
   * @param todo 更新的字段
   * @returns Promise<Todo>
   */
  async updateTodo(id: number, todo: Partial<Todo>): Promise<Todo> {
    try {
      console.log(`[TodoService] 正在更新Todo ID ${id}:`, todo);
      const response = await apiClient.put(`${this.baseURL}/${id}`, todo);
      console.log(`[TodoService] 成功更新Todo ID ${id}:`, response.status, response.data);
      
      // 更新本地存储
      const todos = this.getLocalTodos();
      const index = todos.findIndex(t => t.id === id);
      if (index !== -1) {
        todos[index] = response.data;
        this.saveLocalTodos(todos);
      }
      
      return response.data;
    } catch (error) {
      console.error(`[TodoService] Error updating todo ${id}:`, error);
      
      // 使用本地存储模拟更新Todo
      const todos = this.getLocalTodos();
      const index = todos.findIndex(t => t.id === id);
      
      if (index !== -1) {
        const updatedTodo = { ...todos[index], ...todo, updated_at: new Date().toISOString() };
        todos[index] = updatedTodo;
        this.saveLocalTodos(todos);
        return updatedTodo;
      }
      
      throw new Error(`Todo with id ${id} not found`);
    }
  },

  /**
   * 删除Todo
   * @param id Todo ID
   * @returns Promise<{ message: string }>
   */
  async deleteTodo(id: number): Promise<{ message: string }> {
    try {
      console.log(`[TodoService] 正在删除Todo ID ${id}`);
      const response = await apiClient.delete(`${this.baseURL}/${id}`);
      console.log(`[TodoService] 成功删除Todo ID ${id}:`, response.status, response.data);
      
      // 更新本地存储
      const todos = this.getLocalTodos();
      const filteredTodos = todos.filter(t => t.id !== id);
      this.saveLocalTodos(filteredTodos);
      
      return response.data;
    } catch (error) {
      console.error(`[TodoService] Error deleting todo ${id}:`, error);
      
      // 使用本地存储模拟删除Todo
      const todos = this.getLocalTodos();
      const filteredTodos = todos.filter(t => t.id !== id);
      
      if (filteredTodos.length < todos.length) {
        this.saveLocalTodos(filteredTodos);
        return { message: 'Todo deleted successfully' };
      }
      
      throw new Error(`Todo with id ${id} not found`);
    }
  },

  /**
   * 切换Todo完成状态
   * @param id Todo ID
   * @returns Promise<Todo>
   */
  async toggleTodoStatus(id: number): Promise<Todo> {
    try {
      console.log(`正在切换Todo ID ${id}的状态`);
      const response = await apiClient.patch(`${this.baseURL}/${id}/toggle`);
      console.log(`成功切换Todo ID ${id}的状态:`, response.data);
      
      // 更新本地存储
      const todos = this.getLocalTodos();
      const index = todos.findIndex(t => t.id === id);
      if (index !== -1) {
        todos[index] = response.data;
        this.saveLocalTodos(todos);
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error toggling todo ${id}, using local storage:`, error);
      
      // 使用本地存储模拟切换Todo状态
      const todos = this.getLocalTodos();
      const index = todos.findIndex(t => t.id === id);
      
      if (index !== -1) {
        const todo = todos[index];
        const updatedTodo = { 
          ...todo, 
          completed: !todo.completed, 
          updated_at: new Date().toISOString() 
        };
        
        todos[index] = updatedTodo;
        this.saveLocalTodos(todos);
        return updatedTodo;
      }
      
      throw new Error(`Todo with id ${id} not found`);
    }
  },

  /**
   * 获取Todo的统计信息
   * @returns Promise<{ total: number, completed: number, pending: number }>
   */
  async getTodoStats(): Promise<{ total: number, completed: number, pending: number }> {
    try {
      const todos = await this.getTodos();
      const total = todos.length;
      const completed = todos.filter(todo => todo.completed).length;
      const pending = total - completed;
      
      return { total, completed, pending };
    } catch (error) {
      console.error('Error getting todo stats:', error);
      throw error;
    }
  },

  /**
   * 导出Todo列表为JSON
   * @returns string
   */
  exportToJSON(): string {
    const todos = this.getLocalTodos();
    return JSON.stringify(todos, null, 2);
  },

  /**
   * 从JSON导入Todo列表
   * @param jsonData JSON字符串
   * @returns Promise<Todo[]>
   */
  async importFromJSON(jsonData: string): Promise<Todo[]> {
    try {
      const parsedData = JSON.parse(jsonData);
      
      if (!Array.isArray(parsedData)) {
        throw new Error('Invalid JSON format: expected an array');
      }
      
      const importedTodos: Todo[] = [];
      
      // 逐个导入到数据库
      for (const todoData of parsedData) {
        try {
          // 尝试通过API创建
          const todo = await this.createTodo({
            title: todoData.title || 'Untitled',
            completed: Boolean(todoData.completed),
            priority: Number(todoData.priority) || 0
          });
          
          importedTodos.push(todo);
        } catch (error) {
          console.error('Error importing todo:', todoData, error);
        }
      }
      
      return importedTodos;
    } catch (error) {
      console.error('Error parsing JSON data:', error);
      throw new Error('Failed to parse JSON data. Please check the format.');
    }
  },

  /**
   * 同步本地数据到服务器
   * 用于应用从离线模式切换到在线模式时进行数据同步
   */
  async syncToServer(): Promise<void> {
    try {
      console.log('正在同步本地数据到服务器...');
      const localTodos = this.getLocalTodos();
      
      // 获取服务器上的数据
      const response = await apiClient.get(this.baseURL);
      const serverTodos = response.data;
      
      if (!Array.isArray(serverTodos)) {
        throw new Error('API返回的数据格式不正确');
      }
      
      // 找出本地有但服务器上没有的Todo
      const todoToSync = localTodos.filter(localTodo => 
        !serverTodos.some(serverTodo => 
          serverTodo.id === localTodo.id ||
          (serverTodo.title === localTodo.title && 
           serverTodo.created_at === localTodo.created_at)
        )
      );
      
      // 将本地独有的Todo同步到服务器
      for (const todo of todoToSync) {
        const { id, ...todoData } = todo; // 去除id，让服务器自动生成
        await this.createTodo(todoData);
      }
      
      console.log(`同步完成，已将 ${todoToSync.length} 条本地数据同步到服务器`);
    } catch (error) {
      console.error('同步数据到服务器失败:', error);
      throw error;
    }
  }
};

// 导出Todo服务
export default todoService; 