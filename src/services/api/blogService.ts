import axios from 'axios';

// 定义API基础URL
const API_BASE_URL = '/api/blog';

// 博客文章接口
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  author: {
    id: number;
    name: string;
    bio?: string;
    avatar_url?: string;
  };
  featured_image: string;
  images?: string[];
  published_at: string;
  updated_at: string;
  status: 'draft' | 'published' | 'archived';
  view_count: number;
  like_count: number;
  comment_count: number;
  reading_time: number; // 分钟
  categories: {
    id: number;
    name: string;
    slug: string;
  }[];
  tags: {
    id: number;
    name: string;
    slug: string;
  }[];
  related_posts?: {
    id: number;
    title: string;
    slug: string;
    featured_image: string;
  }[];
  meta: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

// 博客评论接口
export interface BlogComment {
  id: number;
  post_id: number;
  parent_id?: number;
  author: {
    id?: number;
    name: string;
    email: string;
    website?: string;
    avatar_url?: string;
  };
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
  like_count: number;
  replies?: BlogComment[];
}

// 博客分类接口
export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  parent_id?: number;
  post_count: number;
  featured_image?: string;
  created_at: string;
  updated_at: string;
}

// 博客标签接口
export interface BlogTag {
  id: number;
  name: string;
  slug: string;
  description?: string;
  post_count: number;
  created_at: string;
  updated_at: string;
}

// 博客作者接口
export interface BlogAuthor {
  id: number;
  name: string;
  email: string;
  bio?: string;
  avatar_url?: string;
  website?: string;
  social_links?: {
    platform: string;
    url: string;
  }[];
  post_count: number;
  created_at: string;
  updated_at: string;
}

// 项目接口
export interface Project {
  id: number;
  title: string;
  slug: string;
  summary: string;
  description: string;
  technologies: string[];
  featured_image: string;
  images?: string[];
  url?: string;
  github_url?: string;
  status: 'in_progress' | 'completed' | 'planned';
  start_date: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
  featured: boolean;
}

// 查询参数接口
export interface BlogQueryParams {
  page?: number;
  per_page?: number;
  search?: string;
  category?: string | number;
  tag?: string | number;
  author?: string | number;
  status?: string;
  sort_by?: 'latest' | 'oldest' | 'popular' | 'most_comments';
  include_content?: boolean;
}

// 博客服务类
const blogService = {
  // 获取博客文章列表
  getPosts: async (params: BlogQueryParams = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }
  },

  // 获取单个博客文章详情
  getPost: async (slug: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts/${slug}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching blog post with slug ${slug}:`, error);
      throw error;
    }
  },

  // 获取推荐博客文章
  getFeaturedPosts: async (limit: number = 5) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts/featured`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching featured blog posts:', error);
      throw error;
    }
  },

  // 获取最新博客文章
  getLatestPosts: async (limit: number = 5) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts/latest`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching latest blog posts:', error);
      throw error;
    }
  },

  // 获取热门博客文章
  getPopularPosts: async (limit: number = 5) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts/popular`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching popular blog posts:', error);
      throw error;
    }
  },

  // 获取相关博客文章
  getRelatedPosts: async (postId: number, limit: number = 3) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts/${postId}/related`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching related posts for post ID ${postId}:`, error);
      throw error;
    }
  },

  // 获取博客文章评论
  getPostComments: async (postId: number, params: { page?: number; per_page?: number } = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts/${postId}/comments`, {
        params
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching comments for post ID ${postId}:`, error);
      throw error;
    }
  },

  // 添加博客文章评论
  addComment: async (postId: number, commentData: Omit<BlogComment, 'id' | 'post_id' | 'status' | 'created_at' | 'updated_at' | 'like_count' | 'replies'>) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/posts/${postId}/comments`, commentData);
      return response.data;
    } catch (error) {
      console.error(`Error adding comment to post ID ${postId}:`, error);
      throw error;
    }
  },

  // 点赞博客评论
  likeComment: async (commentId: number) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/comments/${commentId}/like`);
      return response.data;
    } catch (error) {
      console.error(`Error liking comment ID ${commentId}:`, error);
      throw error;
    }
  },

  // 获取博客分类列表
  getCategories: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`);
      return response.data;
    } catch (error) {
      console.error('Error fetching blog categories:', error);
      throw error;
    }
  },

  // 获取单个博客分类详情
  getCategory: async (slug: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories/${slug}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching blog category with slug ${slug}:`, error);
      throw error;
    }
  },

  // 获取分类下的博客文章
  getCategoryPosts: async (categorySlug: string, params: BlogQueryParams = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories/${categorySlug}/posts`, {
        params
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching posts for category ${categorySlug}:`, error);
      throw error;
    }
  },

  // 获取博客标签列表
  getTags: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tags`);
      return response.data;
    } catch (error) {
      console.error('Error fetching blog tags:', error);
      throw error;
    }
  },

  // 获取热门博客标签
  getPopularTags: async (limit: number = 10) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tags/popular`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching popular blog tags:', error);
      throw error;
    }
  },

  // 获取单个博客标签详情
  getTag: async (slug: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tags/${slug}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching blog tag with slug ${slug}:`, error);
      throw error;
    }
  },

  // 获取标签下的博客文章
  getTagPosts: async (tagSlug: string, params: BlogQueryParams = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tags/${tagSlug}/posts`, {
        params
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching posts for tag ${tagSlug}:`, error);
      throw error;
    }
  },

  // 获取博客作者列表
  getAuthors: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/authors`);
      return response.data;
    } catch (error) {
      console.error('Error fetching blog authors:', error);
      throw error;
    }
  },

  // 获取单个博客作者详情
  getAuthor: async (id: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/authors/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching blog author with ID ${id}:`, error);
      throw error;
    }
  },

  // 获取作者的博客文章
  getAuthorPosts: async (authorId: number, params: BlogQueryParams = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/authors/${authorId}/posts`, {
        params
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching posts for author ID ${authorId}:`, error);
      throw error;
    }
  },

  // 搜索博客文章
  searchPosts: async (query: string, params: BlogQueryParams = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/search`, {
        params: {
          ...params,
          q: query
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error searching blog posts with query "${query}":`, error);
      throw error;
    }
  },

  // 点赞博客文章
  likePost: async (postId: number) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/posts/${postId}/like`);
      return response.data;
    } catch (error) {
      console.error(`Error liking post ID ${postId}:`, error);
      throw error;
    }
  },

  // 获取项目列表
  getProjects: async (params: { page?: number; per_page?: number; featured?: boolean } = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/projects`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  // 获取单个项目详情
  getProject: async (slug: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/projects/${slug}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching project with slug ${slug}:`, error);
      throw error;
    }
  },

  // 获取特色项目
  getFeaturedProjects: async (limit: number = 3) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/projects/featured`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      throw error;
    }
  },

  // 按技术筛选项目
  getProjectsByTechnology: async (technology: string, params: { page?: number; per_page?: number } = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/projects/technology/${technology}`, {
        params
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching projects with technology ${technology}:`, error);
      throw error;
    }
  },

  // 获取博客统计信息
  getBlogStats: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching blog statistics:', error);
      throw error;
    }
  },

  // 获取博客归档
  getBlogArchive: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/archive`);
      return response.data;
    } catch (error) {
      console.error('Error fetching blog archive:', error);
      throw error;
    }
  },

  // 订阅博客更新
  subscribeToBlog: async (email: string, name?: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/subscribe`, { email, name });
      return response.data;
    } catch (error) {
      console.error('Error subscribing to blog:', error);
      throw error;
    }
  },

  // 获取博客设置
  getBlogSettings: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/settings`);
      return response.data;
    } catch (error) {
      console.error('Error fetching blog settings:', error);
      throw error;
    }
  }
};

export default blogService; 