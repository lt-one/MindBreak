import axios from 'axios';

// 定义API基础URL
const API_BASE_URL = '/api/philosophy';

// 哲学流派接口
export interface PhilosophySchool {
  id: number;
  name: string;
  description: string;
  time_period: string;
  founder: string;
  image_url?: string;
  slug: string;
}

// 哲学家接口
export interface Philosopher {
  id: number;
  name: string;
  birth_date?: string;
  death_date?: string;
  biography: string;
  portrait_url?: string;
  school_ids: number[];
  schools: PhilosophySchool[];
  slug: string;
  nationality?: string;
  era?: string;
  influences?: string[];
  influenced?: string[];
  notable_works?: string[];
  main_contributions?: string[];
}

// 哲学概念接口
export interface PhilosophicalConcept {
  id: number;
  name: string;
  description: string;
  related_concepts: string[];
  related_schools: PhilosophySchool[];
  related_philosophers: Philosopher[];
  slug: string;
  examples?: string[];
  history?: string;
  category?: string;
}

// 哲学摘录/引用接口
export interface PhilosophicalQuote {
  id: number;
  text: string;
  source: string;
  philosopher_id: number;
  philosopher: Philosopher;
  year?: number;
  context?: string;
  tags: string[];
}

// 哲学文章接口
export interface PhilosophyArticle {
  id: number;
  title: string;
  content: string;
  summary: string;
  cover_image?: string;
  author: string;
  published_at: string;
  slug: string;
  related_schools: PhilosophySchool[];
  related_philosophers: Philosopher[];
  related_concepts: PhilosophicalConcept[];
  reading_time: number;
  tags: string[];
}

// 查询参数接口
export interface PhilosophyQueryParams {
  page?: number;
  per_page?: number;
  search?: string;
  school_id?: number;
  philosopher_id?: number;
  concept_id?: number;
  era?: string;
  nationality?: string;
  sort?: 'alphabetical' | 'chronological' | 'relevance';
}

// 哲学API服务类
const philosophyService = {
  // 获取哲学流派列表
  getPhilosophySchools: async (params: PhilosophyQueryParams = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/schools`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching philosophy schools:', error);
      throw error;
    }
  },

  // 获取单个哲学流派
  getPhilosophySchool: async (slug: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/schools/${slug}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching philosophy school with slug ${slug}:`, error);
      throw error;
    }
  },

  // 获取哲学家列表
  getPhilosophers: async (params: PhilosophyQueryParams = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/philosophers`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching philosophers:', error);
      throw error;
    }
  },

  // 获取单个哲学家
  getPhilosopher: async (slug: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/philosophers/${slug}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching philosopher with slug ${slug}:`, error);
      throw error;
    }
  },

  // 获取哲学概念列表
  getPhilosophicalConcepts: async (params: PhilosophyQueryParams = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/concepts`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching philosophical concepts:', error);
      throw error;
    }
  },

  // 获取单个哲学概念
  getPhilosophicalConcept: async (slug: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/concepts/${slug}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching philosophical concept with slug ${slug}:`, error);
      throw error;
    }
  },

  // 获取哲学引用列表
  getPhilosophicalQuotes: async (params: PhilosophyQueryParams = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/quotes`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching philosophical quotes:', error);
      throw error;
    }
  },

  // 获取随机哲学引用
  getRandomQuote: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/quotes/random`);
      return response.data;
    } catch (error) {
      console.error('Error fetching random philosophical quote:', error);
      throw error;
    }
  },

  // 获取哲学家的引用
  getPhilosopherQuotes: async (philosopherId: number, params: PhilosophyQueryParams = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/philosophers/${philosopherId}/quotes`, { params });
      return response.data;
    } catch (error) {
      console.error(`Error fetching quotes for philosopher ${philosopherId}:`, error);
      throw error;
    }
  },

  // 获取哲学文章列表
  getPhilosophyArticles: async (params: PhilosophyQueryParams = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/articles`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching philosophy articles:', error);
      throw error;
    }
  },

  // 获取单个哲学文章
  getPhilosophyArticle: async (slug: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/articles/${slug}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching philosophy article with slug ${slug}:`, error);
      throw error;
    }
  },

  // 获取相关哲学文章
  getRelatedArticles: async (articleId: number, limit: number = 3) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/articles/${articleId}/related`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching related articles for article ${articleId}:`, error);
      throw error;
    }
  },

  // 获取哲学时间线数据
  getPhilosophyTimeline: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/timeline`);
      return response.data;
    } catch (error) {
      console.error('Error fetching philosophy timeline:', error);
      throw error;
    }
  },

  // 获取单个时代的哲学家
  getPhilosophersByEra: async (era: string, params: PhilosophyQueryParams = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/eras/${era}/philosophers`, { params });
      return response.data;
    } catch (error) {
      console.error(`Error fetching philosophers from era ${era}:`, error);
      throw error;
    }
  },

  // 获取可用的哲学时代
  getPhilosophyEras: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/eras`);
      return response.data;
    } catch (error) {
      console.error('Error fetching philosophy eras:', error);
      throw error;
    }
  },

  // 获取流派的哲学家
  getSchoolPhilosophers: async (schoolId: number, params: PhilosophyQueryParams = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/schools/${schoolId}/philosophers`, { params });
      return response.data;
    } catch (error) {
      console.error(`Error fetching philosophers from school ${schoolId}:`, error);
      throw error;
    }
  },

  // 搜索哲学内容
  searchPhilosophy: async (query: string, params: PhilosophyQueryParams = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/search`, { 
        params: { 
          ...params,
          q: query 
        } 
      });
      return response.data;
    } catch (error) {
      console.error(`Error searching philosophy content with query "${query}":`, error);
      throw error;
    }
  },
  
  // 获取哲学主题统计信息
  getPhilosophyStats: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching philosophy stats:', error);
      throw error;
    }
  }
};

export default philosophyService; 