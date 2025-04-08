import React from 'react';
import type { Restaurant } from '../../../data/food/mockRestaurantData';

interface RestaurantCardProps {
  restaurant: Restaurant;
  isSelected?: boolean;
  onClick?: () => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ 
  restaurant,
  isSelected = false,
  onClick
}) => {
  // 生成星级评分显示
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    // 添加实心星星
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`star-${i}`} className="text-accent">★</span>
      );
    }

    // 添加半星（如果有）
    if (hasHalfStar) {
      stars.push(
        <span key="half-star" className="text-accent">★</span>
      );
    }

    // 添加空星星
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-star-${i}`} className="text-accent/30">★</span>
      );
    }

    return stars;
  };

  return (
    <div 
      className={`card cursor-pointer ${isSelected ? 'ring-2 ring-accent' : ''}`}
      onClick={onClick}
    >
      <div className="relative h-40 mb-3 overflow-hidden rounded-lg">
        <img 
          src={restaurant.imageUrl} 
          alt={restaurant.name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            // 如果图片加载失败，设置默认图片
            e.currentTarget.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&w=1000&q=80';
          }}
        />
        <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium">
          {restaurant.priceRange}
        </div>
      </div>
      
      <h3 className="font-display text-xl text-text mb-1 truncate">{restaurant.name}</h3>
      
      <div className="flex items-center mb-2">
        <div className="flex mr-1">
          {renderStars(restaurant.rating)}
        </div>
        <span className="text-xs text-text/60">{restaurant.rating}/5</span>
      </div>
      
      <p className="text-text/80 text-sm mb-2">{restaurant.cuisineType}</p>
      
      <div className="flex flex-wrap gap-1 mt-2">
        {restaurant.features.slice(0, 3).map(feature => (
          <span 
            key={feature} 
            className="bg-secondary/20 text-text/70 text-xs px-2 py-0.5 rounded-full"
          >
            {feature}
          </span>
        ))}
        {restaurant.features.length > 3 && (
          <span className="text-xs text-text/50">+{restaurant.features.length - 3}</span>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard; 