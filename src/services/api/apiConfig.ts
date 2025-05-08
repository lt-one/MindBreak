import axios from 'axios';

// 创建axios实例
const apiClient = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://api.yourdomain.com'  // 生产环境API地址
    : 'http://localhost:5000',       // 开发环境API地址
  timeout: 15000,                   // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  // 跨域请求配置 - 设置为false，因为当前不需要跨域cookie
  withCredentials: false
});

// 请求拦截器
apiClient.interceptors.request.use(
  config => {
    // 从localStorage获取token
    const token = localStorage.getItem('auth_token');
    
    // 如果token存在，则添加到请求头
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log('API请求:', config.method?.toUpperCase(), config.url);
    
    return config;
  },
  error => {
    console.error('API请求错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  response => {
    // 直接返回响应数据
    console.log('API响应成功:', response.config.url, response.status);
    return response;
  },
  error => {
    console.error('API响应错误:', 
      error.config?.url, 
      error.response?.status, 
      error.response?.data || error.message
    );
    
    // 处理401未授权错误
    if (error.response && error.response.status === 401) {
      // 清除本地存储的token
      localStorage.removeItem('auth_token');
      
      // 重定向到登录页
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    
    // 处理503服务不可用错误
    if (error.response && error.response.status === 503) {
      // 显示服务器维护页面
      if (typeof window !== 'undefined') {
        window.location.href = '/maintenance';
      }
    }
    
    // 处理CORS错误
    if (error.message && error.message.includes('Network Error')) {
      console.error('可能是CORS错误或服务器未启动，请检查后端服务是否正常运行');
    }
    
    return Promise.reject(error);
  }
);

// API端点
export const API_ENDPOINTS = {
  // 博客相关
  BLOG: `/api/blog`,
  BLOG_POSTS: `/api/blog/posts`,
  BLOG_CATEGORIES: `/api/blog/categories`,
  BLOG_TAGS: `/api/blog/tags`,
  BLOG_AUTHORS: `/api/blog/authors`,
  BLOG_COMMENTS: `/api/blog/comments`,
  BLOG_PROJECTS: `/api/blog/projects`,
  
  // 餐厅相关端点已移除
  
  // 哲学相关
  PHILOSOPHY: `/api/philosophy`,
  PHILOSOPHY_SCHOOLS: `/api/philosophy/schools`,
  PHILOSOPHY_PHILOSOPHERS: `/api/philosophy/philosophers`,
  PHILOSOPHY_CONCEPTS: `/api/philosophy/concepts`,
  PHILOSOPHY_QUOTES: `/api/philosophy/quotes`,
  PHILOSOPHY_ARTICLES: `/api/philosophy/articles`,
  
  // 名言警句相关
  QUOTES: `/api/quotes`,
  QUOTES_POPULAR: `/api/quotes/popular`,
  QUOTES_RANDOM: `/api/quotes/random`,
  QUOTES_AUTHORS: `/api/quotes/authors`,
  QUOTES_CATEGORIES: `/api/quotes/categories`,
  QUOTES_TAGS: `/api/quotes/tags`,
  
  // 英语学习相关
  ENGLISH: `/api/english`,
  ENGLISH_WORDS: `/api/english/words`,
  ENGLISH_PHRASES: `/api/english/phrases`,
  ENGLISH_GRAMMAR: `/api/english/grammar`,
  ENGLISH_READING: `/api/english/reading`,
  ENGLISH_QUIZ: `/api/english/quiz`,
  
  // 用户认证相关
  AUTH: `/api/auth`,
  AUTH_LOGIN: `/api/auth/login`,
  AUTH_REGISTER: `/api/auth/register`,
  AUTH_LOGOUT: `/api/auth/logout`,
  AUTH_RESET_PASSWORD: `/api/auth/reset-password`,
  
  // 用户相关
  USER: `/api/user`,
  USER_PROFILE: `/api/user/profile`,
  USER_SETTINGS: `/api/user/settings`,
  USER_FAVORITES: `/api/user/favorites`,
  USER_COLLECTIONS: `/api/user/collections`,
  
  // Todo相关
  TODOS: `/api/todos`,
};

// HTTP方法常量
export const HTTP_METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete'
};

// 导出错误消息
export const API_ERROR_MESSAGES = {
  NETWORK_ERROR: '网络连接错误，请检查您的互联网连接。',
  SERVER_ERROR: '服务器错误，请稍后再试。',
  TIMEOUT_ERROR: '请求超时，请稍后再试。',
  UNAUTHORIZED: '未授权，请先登录。',
  FORBIDDEN: '您没有权限执行此操作。',
  NOT_FOUND: '请求的资源不存在。',
  BAD_REQUEST: '请求参数错误，请检查您的输入。'
};

// 导出状态码
export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

// 导出axios实例
export default apiClient; 