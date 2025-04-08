import { useState, useEffect, useCallback } from 'react';
import type { Restaurant } from '../data/food/mockRestaurantData';
import { 
  fetchNearbyRestaurants, 
  filterRestaurants,
  getRandomRestaurant
} from '../data/food/mockRestaurantData';

interface RestaurantFilters {
  cuisineType?: string;
  priceRange?: Restaurant['priceRange'];
  minRating?: number;
  features?: string[];
}

export const useRestaurants = (latitude: number, longitude: number, radiusKm: number = 3) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allRestaurants, setAllRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [filters, setFilters] = useState<RestaurantFilters>({});
  const [randomRestaurant, setRandomRestaurant] = useState<Restaurant | null>(null);

  // 初始加载餐厅数据
  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        setLoading(true);
        setError(null);
        const restaurants = await fetchNearbyRestaurants(latitude, longitude, radiusKm);
        setAllRestaurants(restaurants);
        setFilteredRestaurants(restaurants);
      } catch (err) {
        setError('无法加载餐厅数据，请稍后再试');
        console.error('获取餐厅数据出错:', err);
      } finally {
        setLoading(false);
      }
    };

    loadRestaurants();
  }, [latitude, longitude, radiusKm]);

  // 当过滤条件变化时，过滤餐厅
  useEffect(() => {
    setFilteredRestaurants(filterRestaurants(allRestaurants, filters));
    // 重置随机选择的餐厅
    setRandomRestaurant(null);
  }, [allRestaurants, filters]);

  // 更新过滤条件
  const updateFilters = useCallback((newFilters: Partial<RestaurantFilters>) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  }, []);

  // 清除所有过滤条件
  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  // 选择随机餐厅
  const selectRandomRestaurant = useCallback(() => {
    const restaurant = getRandomRestaurant(filteredRestaurants);
    setRandomRestaurant(restaurant);
    return restaurant;
  }, [filteredRestaurants]);

  return {
    loading,
    error,
    restaurants: filteredRestaurants,
    randomRestaurant,
    filters,
    updateFilters,
    clearFilters,
    selectRandomRestaurant
  };
}; 