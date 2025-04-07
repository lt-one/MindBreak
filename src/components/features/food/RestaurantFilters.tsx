import React from 'react';
import { cuisineTypes, featureTypes } from '../services/mockRestaurantData';
import type { Restaurant } from '../services/mockRestaurantData';

interface RestaurantFiltersProps {
  filters: {
    cuisineType?: string;
    priceRange?: Restaurant['priceRange'];
    minRating?: number;
    features?: string[];
  };
  updateFilters: (filters: any) => void;
  clearFilters: () => void;
}

const RestaurantFilters: React.FC<RestaurantFiltersProps> = ({
  filters,
  updateFilters,
  clearFilters
}) => {
  // 价格范围选项
  const priceRanges: Restaurant['priceRange'][] = ['¥', '¥¥', '¥¥¥', '¥¥¥¥'];

  // 评分选项
  const ratingOptions = [3, 3.5, 4, 4.5];

  // 处理菜系类型改变
  const handleCuisineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    updateFilters({ cuisineType: value === 'all' ? undefined : value });
  };

  // 处理价格范围改变
  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Restaurant['priceRange'] | 'all';
    updateFilters({ priceRange: value === 'all' ? undefined : value });
  };

  // 处理最低评分改变
  const handleMinRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    updateFilters({ minRating: value === 'all' ? undefined : parseFloat(value) });
  };

  // 处理特色/设施改变
  const handleFeatureChange = (feature: string) => {
    const currentFeatures = filters.features || [];
    let newFeatures: string[];

    if (currentFeatures.includes(feature)) {
      // 移除特色
      newFeatures = currentFeatures.filter(f => f !== feature);
    } else {
      // 添加特色
      newFeatures = [...currentFeatures, feature];
    }

    updateFilters({ features: newFeatures.length ? newFeatures : undefined });
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-display text-xl text-text">筛选条件</h2>
        <button 
          onClick={clearFilters}
          className="text-sm text-accent hover:text-accent/80 transition-colors font-medium"
        >
          清除所有
        </button>
      </div>

      <div className="space-y-4">
        {/* 菜系类型过滤器 */}
        <div>
          <label className="block text-text font-medium mb-1">菜系类型</label>
          <select
            value={filters.cuisineType || 'all'}
            onChange={handleCuisineChange}
            className="w-full rounded-lg border border-secondary/30 px-3 py-2 text-text/90 focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            <option value="all">所有菜系</option>
            {cuisineTypes.map(cuisine => (
              <option key={cuisine} value={cuisine}>{cuisine}</option>
            ))}
          </select>
        </div>

        {/* 价格范围过滤器 */}
        <div>
          <label className="block text-text font-medium mb-1">价格范围</label>
          <select
            value={filters.priceRange || 'all'}
            onChange={handlePriceRangeChange}
            className="w-full rounded-lg border border-secondary/30 px-3 py-2 text-text/90 focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            <option value="all">所有价格</option>
            {priceRanges.map(price => (
              <option key={price} value={price}>{price} {price === '¥' ? '(经济)' : price === '¥¥' ? '(适中)' : price === '¥¥¥' ? '(高端)' : '(豪华)'}</option>
            ))}
          </select>
        </div>

        {/* 最低评分过滤器 */}
        <div>
          <label className="block text-text font-medium mb-1">最低评分</label>
          <select
            value={filters.minRating?.toString() || 'all'}
            onChange={handleMinRatingChange}
            className="w-full rounded-lg border border-secondary/30 px-3 py-2 text-text/90 focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            <option value="all">所有评分</option>
            {ratingOptions.map(rating => (
              <option key={rating} value={rating.toString()}>{rating} 星及以上</option>
            ))}
          </select>
        </div>

        {/* 特色/设施过滤器 */}
        <div>
          <label className="block text-text font-medium mb-2">特色/设施</label>
          <div className="flex flex-wrap gap-2">
            {featureTypes.map(feature => (
              <button
                key={feature}
                onClick={() => handleFeatureChange(feature)}
                className={`text-xs px-3 py-1 rounded-full transition-colors ${
                  (filters.features || []).includes(feature)
                    ? 'bg-accent text-white' 
                    : 'bg-secondary/20 text-text/70 hover:bg-secondary/30'
                }`}
              >
                {feature}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantFilters; 