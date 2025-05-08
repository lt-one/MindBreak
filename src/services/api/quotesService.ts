import axios from 'axios';

// 定义API基础URL
const API_BASE_URL = '/api/quotes';

// 语录接口
export interface Quote {
  id: number;
  text: string;
  author: string;
  source?: string;
  category?: string;
  is_featured: boolean;
  like_count: number;
  bookmark_count: number;
}

// 查询参数接口
export interface QuoteQueryParams {
  page?: number;
  per_page?: number;
  category?: string;
  author?: string;
  featured?: boolean;
  search?: string;
}

// 语录API服务类
const quotesService = {
  // 获取语录列表
  getQuotes: async (params: QuoteQueryParams = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching quotes:', error);
      throw error;
    }
  },

  // 获取单条语录
  getQuote: async (id: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching quote with id ${id}:`, error);
      throw error;
    }
  },

  // 获取随机语录
  getRandomQuote: async (category?: string, featured?: boolean) => {
    try {
      const params: any = {};
      if (category) params.category = category;
      if (featured !== undefined) params.featured = featured;

      const response = await axios.get(`${API_BASE_URL}/random`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching random quote:', error);
      throw error;
    }
  },

  // 获取所有语录分类
  getCategories: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`);
      return response.data;
    } catch (error) {
      console.error('Error fetching quote categories:', error);
      throw error;
    }
  },

  // 获取所有语录作者
  getAuthors: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/authors`);
      return response.data;
    } catch (error) {
      console.error('Error fetching quote authors:', error);
      throw error;
    }
  },

  // 点赞语录（需要认证）
  likeQuote: async (quoteId: number, token: string) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/${quoteId}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error liking quote ${quoteId}:`, error);
      throw error;
    }
  },

  // 取消点赞（需要认证）
  unlikeQuote: async (quoteId: number, token: string) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/${quoteId}/unlike`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error unliking quote ${quoteId}:`, error);
      throw error;
    }
  },

  // 收藏语录（需要认证）
  bookmarkQuote: async (quoteId: number, token: string) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/${quoteId}/bookmark`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error bookmarking quote ${quoteId}:`, error);
      throw error;
    }
  },

  // 取消收藏（需要认证）
  unbookmarkQuote: async (quoteId: number, token: string) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/${quoteId}/unbookmark`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error unbookmarking quote ${quoteId}:`, error);
      throw error;
    }
  },

  // 获取用户收藏的语录（需要认证）
  getUserBookmarks: async (token: string, page: number = 1, perPage: number = 10) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/bookmarks`, {
        params: { page, per_page: perPage },
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user bookmarked quotes:', error);
      throw error;
    }
  },

  // 获取语录统计信息
  getQuotesStats: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching quotes stats:', error);
      throw error;
    }
  }
};

export default quotesService; 