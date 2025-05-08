import axios from 'axios';

// 定义API基础URL
const API_BASE_URL = '/api/quotes';

// 名言警句接口
export interface Quote {
  id: number;
  text: string;
  author: string;
  author_info?: string;
  source?: string;
  year?: number;
  language: string;
  translated_text?: string;
  translator?: string;
  categories: string[];
  tags: string[];
  likes: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

// 作者接口
export interface QuoteAuthor {
  id: number;
  name: string;
  bio?: string;
  birth_year?: number;
  death_year?: number;
  nationality?: string;
  era?: string;
  profession?: string;
  image_url?: string;
  quote_count: number;
  created_at: string;
  updated_at: string;
}

// 名言分类接口
export interface QuoteCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  quote_count: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

// 用户收藏接口
export interface QuoteFavorite {
  id: number;
  user_id: number;
  quote_id: number;
  created_at: string;
}

// 用户收藏集接口
export interface QuoteCollection {
  id: number;
  user_id: number;
  name: string;
  description?: string;
  is_public: boolean;
  quotes: Quote[];
  created_at: string;
  updated_at: string;
}

// 查询参数接口
export interface QuoteQueryParams {
  page?: number;
  per_page?: number;
  search?: string;
  author?: string | number;
  category?: string | number;
  tags?: string[];
  language?: string;
  min_length?: number;
  max_length?: number;
  sort_by?: 'popular' | 'recent' | 'random';
  include_author_info?: boolean;
}

// 名言警句服务类
const quoteService = {
  // 获取名言列表
  getQuotes: async (params: QuoteQueryParams = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching quotes:', error);
      throw error;
    }
  },

  // 获取单条名言详情
  getQuote: async (id: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching quote with ID ${id}:`, error);
      throw error;
    }
  },

  // 获取随机名言
  getRandomQuote: async (params: Omit<QuoteQueryParams, 'page' | 'per_page'> = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/random`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching random quote:', error);
      throw error;
    }
  },

  // 获取每日名言
  getDailyQuote: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/daily`);
      return response.data;
    } catch (error) {
      console.error('Error fetching daily quote:', error);
      throw error;
    }
  },

  // 获取热门名言
  getPopularQuotes: async (limit: number = 10) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/popular`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching popular quotes:', error);
      throw error;
    }
  },

  // 获取精选名言
  getFeaturedQuotes: async (limit: number = 10) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/featured`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching featured quotes:', error);
      throw error;
    }
  },

  // 搜索名言
  searchQuotes: async (query: string, params: Omit<QuoteQueryParams, 'search'> = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/search`, {
        params: {
          ...params,
          q: query
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error searching quotes with query "${query}":`, error);
      throw error;
    }
  },

  // 按作者获取名言
  getQuotesByAuthor: async (authorId: number | string, params: Omit<QuoteQueryParams, 'author'> = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/author/${authorId}`, {
        params
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching quotes by author ${authorId}:`, error);
      throw error;
    }
  },

  // 按分类获取名言
  getQuotesByCategory: async (categorySlug: string, params: Omit<QuoteQueryParams, 'category'> = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories/${categorySlug}`, {
        params
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching quotes by category ${categorySlug}:`, error);
      throw error;
    }
  },

  // 按标签获取名言
  getQuotesByTag: async (tag: string, params: Omit<QuoteQueryParams, 'tags'> = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tags/${tag}`, {
        params
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching quotes by tag ${tag}:`, error);
      throw error;
    }
  },

  // 获取所有作者
  getAuthors: async (params: { page?: number; per_page?: number; search?: string } = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/authors`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching quote authors:', error);
      throw error;
    }
  },

  // 获取作者详情
  getAuthor: async (id: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/authors/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching author with ID ${id}:`, error);
      throw error;
    }
  },

  // 获取热门作者
  getPopularAuthors: async (limit: number = 10) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/authors/popular`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching popular authors:', error);
      throw error;
    }
  },

  // 获取所有分类
  getCategories: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`);
      return response.data;
    } catch (error) {
      console.error('Error fetching quote categories:', error);
      throw error;
    }
  },

  // 获取分类详情
  getCategory: async (slug: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories/${slug}/info`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching category with slug ${slug}:`, error);
      throw error;
    }
  },

  // 获取所有标签
  getTags: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tags`);
      return response.data;
    } catch (error) {
      console.error('Error fetching quote tags:', error);
      throw error;
    }
  },

  // 获取热门标签
  getPopularTags: async (limit: number = 20) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tags/popular`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching popular tags:', error);
      throw error;
    }
  },

  // 点赞名言
  likeQuote: async (quoteId: number) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/${quoteId}/like`);
      return response.data;
    } catch (error) {
      console.error(`Error liking quote with ID ${quoteId}:`, error);
      throw error;
    }
  },

  // 取消点赞
  unlikeQuote: async (quoteId: number) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${quoteId}/like`);
      return response.data;
    } catch (error) {
      console.error(`Error unliking quote with ID ${quoteId}:`, error);
      throw error;
    }
  },

  // 收藏名言
  favoriteQuote: async (quoteId: number) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/${quoteId}/favorite`);
      return response.data;
    } catch (error) {
      console.error(`Error favoriting quote with ID ${quoteId}:`, error);
      throw error;
    }
  },

  // 取消收藏
  unfavoriteQuote: async (quoteId: number) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${quoteId}/favorite`);
      return response.data;
    } catch (error) {
      console.error(`Error unfavoriting quote with ID ${quoteId}:`, error);
      throw error;
    }
  },

  // 获取用户收藏的名言
  getUserFavorites: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/favorites`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user favorites:', error);
      throw error;
    }
  },

  // 创建收藏集
  createCollection: async (collectionData: { name: string; description?: string; is_public: boolean }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/collections`, collectionData);
      return response.data;
    } catch (error) {
      console.error('Error creating quote collection:', error);
      throw error;
    }
  },

  // 获取用户的收藏集
  getUserCollections: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/collections`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user collections:', error);
      throw error;
    }
  },

  // 获取收藏集详情
  getCollection: async (collectionId: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/collections/${collectionId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching collection with ID ${collectionId}:`, error);
      throw error;
    }
  },

  // 向收藏集添加名言
  addQuoteToCollection: async (collectionId: number, quoteId: number) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/collections/${collectionId}/quotes/${quoteId}`);
      return response.data;
    } catch (error) {
      console.error(`Error adding quote ${quoteId} to collection ${collectionId}:`, error);
      throw error;
    }
  },

  // 从收藏集移除名言
  removeQuoteFromCollection: async (collectionId: number, quoteId: number) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/collections/${collectionId}/quotes/${quoteId}`);
      return response.data;
    } catch (error) {
      console.error(`Error removing quote ${quoteId} from collection ${collectionId}:`, error);
      throw error;
    }
  },

  // 获取不同语言的名言
  getQuotesByLanguage: async (language: string, params: Omit<QuoteQueryParams, 'language'> = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/language/${language}`, {
        params
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching quotes in language ${language}:`, error);
      throw error;
    }
  },

  // 获取支持的语言列表
  getSupportedLanguages: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/languages`);
      return response.data;
    } catch (error) {
      console.error('Error fetching supported languages:', error);
      throw error;
    }
  },

  // 获取名言统计信息
  getQuoteStats: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching quote statistics:', error);
      throw error;
    }
  },

  // 导出名言（PDF、JSON等格式）
  exportQuotes: async (params: { format: 'pdf' | 'json' | 'csv'; ids?: number[] }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/export`, {
        params,
        responseType: params.format === 'pdf' ? 'blob' : 'json'
      });
      return response.data;
    } catch (error) {
      console.error(`Error exporting quotes in ${params.format} format:`, error);
      throw error;
    }
  },

  // 报告名言（不当内容、错误等）
  reportQuote: async (quoteId: number, reason: string, details?: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/${quoteId}/report`, {
        reason,
        details
      });
      return response.data;
    } catch (error) {
      console.error(`Error reporting quote with ID ${quoteId}:`, error);
      throw error;
    }
  }
};

export default quoteService; 