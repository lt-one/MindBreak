// 餐厅类型定义
export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  priceRange: string;
  rating: number;
  address: string;
  phone: string;
  openingHours: string;
  image: string;
  longitude: number;
  latitude: number;
  distance?: number;
  website?: string;
  description?: string;
  featured?: boolean;
}

// 餐厅筛选器类型
export interface RestaurantFilters {
  searchTerm: string;
  cuisine: string[];
  priceRange: string[];
  rating: number | null;
  sortBy: string;
  maxDistance: number | null;
} 