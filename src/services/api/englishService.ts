import axios from 'axios';

// 定义API基础URL
const API_BASE_URL = '/api/english';

// 单词接口
export interface Word {
  id: number;
  word: string;
  pronunciation: string;
  part_of_speech: string;
  definition: string;
  example_sentence: string;
  synonyms: string[];
  antonyms: string[];
  difficulty_level: 1 | 2 | 3 | 4 | 5; // 1-5表示难度等级
  tags: string[];
  image_url?: string;
  audio_url?: string;
  created_at: string;
  updated_at: string;
}

// 短语接口
export interface Phrase {
  id: number;
  phrase: string;
  meaning: string;
  example_sentence: string;
  context: string;
  tags: string[];
  difficulty_level: 1 | 2 | 3 | 4 | 5;
  created_at: string;
  updated_at: string;
}

// 语法点接口
export interface GrammarPoint {
  id: number;
  title: string;
  description: string;
  example_sentences: string[];
  related_topics: string[];
  difficulty_level: 1 | 2 | 3 | 4 | 5;
  tags: string[];
  created_at: string;
  updated_at: string;
}

// 阅读材料接口
export interface ReadingMaterial {
  id: number;
  title: string;
  content: string;
  summary: string;
  author?: string;
  source?: string;
  difficulty_level: 1 | 2 | 3 | 4 | 5;
  reading_time: number; // 分钟
  topics: string[];
  vocabulary: {
    word: string;
    definition: string;
  }[];
  comprehension_questions: {
    question: string;
    options?: string[];
    answer: string;
  }[];
  created_at: string;
  updated_at: string;
}

// 学习进度接口
export interface LearningProgress {
  user_id: number;
  words_learned: number;
  phrases_learned: number;
  grammar_points_learned: number;
  readings_completed: number;
  quizzes_completed: number;
  total_study_time: number; // 分钟
  streak_days: number;
  level: number;
  experience_points: number;
  badges: string[];
  last_activity_date: string;
}

// 单词学习记录接口
export interface WordLearningRecord {
  word_id: number;
  user_id: number;
  is_learned: boolean;
  familiarity_level: 1 | 2 | 3 | 4 | 5; // 1-5表示熟悉度
  review_count: number;
  next_review_date: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// 测验结果接口
export interface QuizResult {
  id: number;
  user_id: number;
  quiz_type: 'vocabulary' | 'grammar' | 'reading' | 'listening' | 'speaking' | 'writing';
  score: number;
  max_score: number;
  completion_time: number; // 秒
  correct_answers: number;
  incorrect_answers: number;
  skipped_questions: number;
  difficulty_level: 1 | 2 | 3 | 4 | 5;
  created_at: string;
}

// 查询参数接口
export interface EnglishQueryParams {
  page?: number;
  per_page?: number;
  search?: string;
  difficulty_level?: number | number[];
  tags?: string[];
  sort_by?: string;
  part_of_speech?: string;
  topic?: string;
}

// 英语学习服务类
const englishService = {
  // 获取单词列表
  getWords: async (params: EnglishQueryParams = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/words`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching words:', error);
      throw error;
    }
  },

  // 获取单个单词详情
  getWord: async (wordId: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/words/${wordId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching word with ID ${wordId}:`, error);
      throw error;
    }
  },

  // 获取单词发音
  getWordPronunciation: async (wordId: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/words/${wordId}/pronunciation`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching pronunciation for word ID ${wordId}:`, error);
      throw error;
    }
  },

  // 搜索单词
  searchWords: async (query: string, params: EnglishQueryParams = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/words/search`, {
        params: {
          ...params,
          q: query
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error searching words with query "${query}":`, error);
      throw error;
    }
  },

  // 获取每日单词
  getDailyWord: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/words/daily`);
      return response.data;
    } catch (error) {
      console.error('Error fetching daily word:', error);
      throw error;
    }
  },

  // 获取短语列表
  getPhrases: async (params: EnglishQueryParams = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/phrases`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching phrases:', error);
      throw error;
    }
  },

  // 获取单个短语详情
  getPhrase: async (phraseId: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/phrases/${phraseId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching phrase with ID ${phraseId}:`, error);
      throw error;
    }
  },

  // 搜索短语
  searchPhrases: async (query: string, params: EnglishQueryParams = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/phrases/search`, {
        params: {
          ...params,
          q: query
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error searching phrases with query "${query}":`, error);
      throw error;
    }
  },

  // 获取语法点列表
  getGrammarPoints: async (params: EnglishQueryParams = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/grammar`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching grammar points:', error);
      throw error;
    }
  },

  // 获取单个语法点详情
  getGrammarPoint: async (grammarId: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/grammar/${grammarId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching grammar point with ID ${grammarId}:`, error);
      throw error;
    }
  },

  // 获取阅读材料列表
  getReadingMaterials: async (params: EnglishQueryParams = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reading`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching reading materials:', error);
      throw error;
    }
  },

  // 获取单个阅读材料详情
  getReadingMaterial: async (readingId: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reading/${readingId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching reading material with ID ${readingId}:`, error);
      throw error;
    }
  },

  // 获取推荐阅读材料
  getRecommendedReadings: async (limit: number = 5) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reading/recommended`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching recommended readings:', error);
      throw error;
    }
  },

  // 获取用户学习进度
  getLearningProgress: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/progress`);
      return response.data;
    } catch (error) {
      console.error('Error fetching learning progress:', error);
      throw error;
    }
  },

  // 更新单词学习记录
  updateWordLearningRecord: async (wordId: number, data: Partial<WordLearningRecord>) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/words/${wordId}/record`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating learning record for word ID ${wordId}:`, error);
      throw error;
    }
  },

  // 获取用户单词学习记录
  getWordLearningRecords: async (params: { is_learned?: boolean; familiarity_level?: number } = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/words/records`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching word learning records:', error);
      throw error;
    }
  },

  // 获取需要复习的单词
  getWordsForReview: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/words/review`);
      return response.data;
    } catch (error) {
      console.error('Error fetching words for review:', error);
      throw error;
    }
  },

  // 提交测验结果
  submitQuizResult: async (data: Omit<QuizResult, 'id' | 'created_at'>) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/quiz/result`, data);
      return response.data;
    } catch (error) {
      console.error('Error submitting quiz result:', error);
      throw error;
    }
  },

  // 获取测验历史
  getQuizHistory: async (quizType?: QuizResult['quiz_type']) => {
    try {
      const params = quizType ? { quiz_type: quizType } : {};
      const response = await axios.get(`${API_BASE_URL}/quiz/history`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching quiz history:', error);
      throw error;
    }
  },

  // 生成单词测验
  generateVocabularyQuiz: async (params: { difficulty_level?: number; count?: number; tags?: string[] } = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/quiz/vocabulary`, { params });
      return response.data;
    } catch (error) {
      console.error('Error generating vocabulary quiz:', error);
      throw error;
    }
  },

  // 生成语法测验
  generateGrammarQuiz: async (params: { difficulty_level?: number; count?: number; topics?: string[] } = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/quiz/grammar`, { params });
      return response.data;
    } catch (error) {
      console.error('Error generating grammar quiz:', error);
      throw error;
    }
  },

  // 获取词性列表
  getPartsOfSpeech: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/parts-of-speech`);
      return response.data;
    } catch (error) {
      console.error('Error fetching parts of speech:', error);
      throw error;
    }
  },

  // 获取难度级别列表
  getDifficultyLevels: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/difficulty-levels`);
      return response.data;
    } catch (error) {
      console.error('Error fetching difficulty levels:', error);
      throw error;
    }
  },

  // 获取标签列表
  getTags: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tags`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }
  },

  // 获取主题列表
  getTopics: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/topics`);
      return response.data;
    } catch (error) {
      console.error('Error fetching topics:', error);
      throw error;
    }
  },

  // 获取单词使用统计
  getWordUsageStats: async (wordId: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/words/${wordId}/stats`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching usage stats for word ID ${wordId}:`, error);
      throw error;
    }
  },

  // 获取学习统计
  getLearningStats: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching learning statistics:', error);
      throw error;
    }
  }
};

export default englishService; 