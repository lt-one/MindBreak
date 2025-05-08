import blogService from './blogService';
import philosophyService from './philosophyService';
import quoteService from './quoteService';
import englishService from './englishService';
import authService from './authService';
import apiClient, { API_ENDPOINTS, API_ERROR_MESSAGES, HTTP_METHODS, STATUS_CODES } from './apiConfig';

// 统一导出所有API服务
export {
  blogService,
  philosophyService,
  quoteService,
  englishService,
  authService,
  apiClient,
  API_ENDPOINTS,
  API_ERROR_MESSAGES,
  HTTP_METHODS,
  STATUS_CODES
};

// 为了便于直接从api目录导入
export default {
  blog: blogService,
  philosophy: philosophyService,
  quote: quoteService,
  english: englishService,
  auth: authService,
  client: apiClient
}; 