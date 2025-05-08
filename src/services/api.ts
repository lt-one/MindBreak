import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// 创建axios实例
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// 请求拦截器 - 添加认证令牌
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => {
    return Promise.reject(error);
  }
);

// 响应拦截器 - 处理错误
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // 处理401未授权错误
    if (error.response && error.response.status === 401) {
      // 清除本地存储的令牌
      localStorage.removeItem('token');
      // 可以在这里添加重定向到登录页面的逻辑
    }
    return Promise.reject(error);
  }
);

// 定义接口
interface LoginData {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface APIParams {
  [key: string]: string | number | boolean | undefined;
}

// 博客API
export const blogApi = {
  getCategories: () => api.get('/blog/categories'),
  getPosts: (params: APIParams = {}) => api.get('/blog/posts', { params }),
  getPost: (id: number) => api.get(`/blog/posts/${id}`),
};

// 美食API已移除

// 哲学API
export const philosophyApi = {
  getPhilosophers: () => api.get('/philosophy/philosophers'),
  getPhilosopher: (id: number) => api.get(`/philosophy/philosophers/${id}`),
};

// 名言API
export const quotesApi = {
  getQuotes: (params: APIParams = {}) => api.get('/quotes', { params }),
  getRandomQuote: (params: APIParams = {}) => api.get('/quotes/random', { params }),
};

// 认证API
export const authApi = {
  login: (data: LoginData) => api.post('/auth/login', data),
  register: (data: RegisterData) => api.post('/auth/register', data),
};

export default api; 