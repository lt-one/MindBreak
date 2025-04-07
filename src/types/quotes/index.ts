// 语录类型定义
export interface Quote {
  quote: string;
  author: string;
  source?: string;
  category?: string;
  id?: string;
}

// 语录过滤器类型
export interface QuoteFilters {
  searchTerm: string;
  selectedCategory: string;
} 