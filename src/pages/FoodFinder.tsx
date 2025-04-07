import React, { useState, useEffect } from 'react';
import RestaurantMap from '../components/features/food/RestaurantMap';

// SVG图标组件
const FoodIllustration: React.FC = () => (
  <svg className="w-full max-w-md mx-auto" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="foodGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <linearGradient id="foodGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    
    {/* 背景 */}
    <rect width="600" height="400" fill="#FFFBEB" rx="20" />
    
    {/* 盘子 */}
    <circle cx="300" cy="220" r="150" fill="white" stroke="#E5E7EB" strokeWidth="2" />
    <circle cx="300" cy="220" r="140" fill="none" stroke="#E5E7EB" strokeWidth="1" />
    
    {/* 食物图标 */}
    <circle cx="250" cy="180" r="30" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
    <circle cx="320" cy="200" r="40" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
    <circle cx="270" cy="250" r="35" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
    <circle cx="350" cy="260" r="25" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
    
    {/* 叉子和勺子 */}
    <path d="M150,320 L180,220 L190,220 L220,320" fill="none" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
    <path d="M400,320 L370,220 L380,220 L400,250 L420,220 L430,220 L400,320" fill="none" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
    
    {/* 装饰元素 */}
    <circle cx="500" cy="100" r="40" fill="url(#foodGradient1)" opacity="0.2" />
    <circle cx="100" cy="150" r="50" fill="url(#foodGradient2)" opacity="0.2" />
    <circle cx="450" cy="300" r="30" fill="url(#foodGradient1)" opacity="0.2" />
    <circle cx="150" cy="80" r="25" fill="url(#foodGradient2)" opacity="0.2" />
  </svg>
);

// 自定义餐厅类型按钮组件
const CuisineButton: React.FC<{
  name: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ name, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center p-4 rounded-xl transition-all ${
      isActive 
        ? 'bg-amber-100 text-amber-800 border-2 border-amber-300' 
        : 'bg-white hover:bg-amber-50 text-gray-700 border border-gray-200'
    }`}
  >
    <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-2 ${
      isActive ? 'bg-amber-200 text-amber-700' : 'bg-amber-100 text-amber-600'
    }`}>
      {icon}
    </div>
    <span className="font-medium">{name}</span>
  </button>
);

// 餐厅卡片组件
const RestaurantCard: React.FC<{
  name: string;
  distance: number;
  rating: number;
  cuisine: string;
  isSelected: boolean;
  onClick: () => void;
}> = ({ name, distance, rating, cuisine, isSelected, onClick }) => (
  <div 
    onClick={onClick}
    className={`p-4 rounded-xl border cursor-pointer transition-all ${
      isSelected 
        ? 'bg-amber-50 border-amber-300 shadow-md' 
        : 'bg-white border-gray-200 hover:border-amber-200 hover:shadow-sm'
    }`}
  >
    <h3 className="font-bold text-gray-900 mb-1">{name}</h3>
    <p className="text-gray-600 text-sm mb-2">{cuisine}</p>
    <div className="flex justify-between text-sm">
      <span className="flex items-center text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {distance.toFixed(1)} 公里
      </span>
      <span className="flex items-center text-amber-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        {rating.toFixed(1)}
      </span>
    </div>
  </div>
);

// 主组件
const FoodFinder: React.FC = () => {
  // 状态管理
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any | null>(null);
  const [activeCuisine, setActiveCuisine] = useState<string>('all');
  
  // 模拟餐厅数据
  const cuisineTypes = [
    { id: 'all', name: '全部', icon: <span className="text-xl">🍽️</span> },
    { id: 'chinese', name: '中餐', icon: <span className="text-xl">🥢</span> },
    { id: 'japanese', name: '日料', icon: <span className="text-xl">🍣</span> },
    { id: 'western', name: '西餐', icon: <span className="text-xl">🍝</span> },
    { id: 'fast', name: '快餐', icon: <span className="text-xl">🍔</span> },
    { id: 'dessert', name: '甜点', icon: <span className="text-xl">🍰</span> },
  ];
  
  // 创建模拟数据
  const createMockRestaurants = (lat: number, lng: number) => {
    const mockData = [
      { id: 1, name: '红厨中餐馆', cuisine: '中餐', lat: lat + 0.003, lng: lng + 0.002, rating: 4.7, distance: 0.5 },
      { id: 2, name: '樱花寿司店', cuisine: '日料', lat: lat - 0.002, lng: lng + 0.005, rating: 4.5, distance: 0.8 },
      { id: 3, name: '意大利风味餐厅', cuisine: '西餐', lat: lat + 0.005, lng: lng - 0.003, rating: 4.2, distance: 1.1 },
      { id: 4, name: '快乐汉堡', cuisine: '快餐', lat: lat - 0.004, lng: lng - 0.001, rating: 3.9, distance: 0.7 },
      { id: 5, name: '甜蜜糕点屋', cuisine: '甜点', lat: lat - 0.001, lng: lng + 0.007, rating: 4.8, distance: 1.3 },
      { id: 6, name: '北京烤鸭店', cuisine: '中餐', lat: lat + 0.008, lng: lng + 0.001, rating: 4.6, distance: 1.5 },
      { id: 7, name: '东京拉面', cuisine: '日料', lat: lat - 0.006, lng: lng + 0.003, rating: 4.3, distance: 1.0 },
      { id: 8, name: '麦乐快餐', cuisine: '快餐', lat: lat + 0.001, lng: lng - 0.007, rating: 3.7, distance: 1.2 },
    ];
    return mockData;
  };

  // 获取地理位置
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          // 创建模拟数据
          setRestaurants(createMockRestaurants(latitude, longitude));
          setLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationError('无法获取您的位置，请检查浏览器权限设置。');
          
          // 使用默认位置生成数据
          const defaultLat = 39.9042;
          const defaultLng = 116.4074;
          setLocation({ lat: defaultLat, lng: defaultLng });
          setRestaurants(createMockRestaurants(defaultLat, defaultLng));
          setLoading(false);
        }
      );
    } else {
      setLocationError('您的浏览器不支持地理位置功能。');
      setLoading(false);
    }
  }, []);

  // 随机选择餐厅
  const handleRandomSelect = () => {
    const filteredRestaurants = 
      activeCuisine === 'all' 
        ? restaurants 
        : restaurants.filter(r => r.cuisine === cuisineTypes.find(c => c.id === activeCuisine)?.name);
    
    if (filteredRestaurants.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredRestaurants.length);
      setSelectedRestaurant(filteredRestaurants[randomIndex]);
    }
  };
  
  // 选择特定餐厅
  const handleRestaurantSelect = (restaurant: any) => {
    setSelectedRestaurant(restaurant);
  };
  
  // 筛选餐厅
  const filteredRestaurants = 
    activeCuisine === 'all' 
      ? restaurants 
      : restaurants.filter(r => r.cuisine === cuisineTypes.find(c => c.id === activeCuisine)?.name);

  return (
    <>
      {/* 页面头部 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                美食发现
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                基于数据分析的智能餐厅推荐系统，帮助您发现附近美食并做出最佳选择。
              </p>
              <button 
                onClick={handleRandomSelect}
                disabled={loading || restaurants.length === 0}
                className={`
                  px-6 py-3 rounded-xl font-semibold transition-all duration-300
                  ${loading || restaurants.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-amber-500 text-white hover:bg-amber-600 hover:-translate-y-1 hover:shadow-lg'}
                `}
              >
                {loading ? '正在加载...' : restaurants.length === 0 ? '无法获取餐厅' : '随机为我选择'}
              </button>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <FoodIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* 主要内容 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 border-t-4 border-b-4 border-amber-500 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">正在定位附近餐厅...</p>
            </div>
          ) : locationError ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-amber-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">无法获取您的位置</h2>
              <p className="text-gray-600 mb-8 max-w-lg mx-auto">{locationError}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600"
              >
                重试
              </button>
            </div>
          ) : (
            <>
              {/* 地图和餐厅列表 */}
              <div className="flex flex-col lg:flex-row gap-8">
                {/* 左侧：类型筛选和列表 */}
                <div className="lg:w-1/3">
                  {/* 料理类型选择 */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">选择美食类型</h2>
                    <div className="grid grid-cols-3 gap-3">
                      {cuisineTypes.map(cuisineType => (
                        <CuisineButton
                          key={cuisineType.id}
                          name={cuisineType.name}
                          icon={cuisineType.icon}
                          isActive={activeCuisine === cuisineType.id}
                          onClick={() => setActiveCuisine(cuisineType.id)}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* 餐厅列表 */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">附近餐厅</h2>
                      <span className="text-gray-500 text-sm">{filteredRestaurants.length} 家餐厅</span>
                    </div>
                    
                    {filteredRestaurants.length > 0 ? (
                      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                        {filteredRestaurants.map(restaurant => (
                          <RestaurantCard
                            key={restaurant.id}
                            name={restaurant.name}
                            cuisine={restaurant.cuisine || restaurant.cuisineType || '未知'}
                            rating={restaurant.rating || 0}
                            distance={restaurant.distance || 0}
                            isSelected={selectedRestaurant?.id === restaurant.id}
                            onClick={() => handleRestaurantSelect(restaurant)}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="bg-gray-50 p-6 text-center rounded-xl">
                        <p className="text-gray-500">没有找到匹配的餐厅</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* 右侧：地图 */}
                <div className="lg:w-2/3 h-[500px]">
                  {location && (
                    <RestaurantMap
                      userLocation={location}
                      restaurants={filteredRestaurants}
                      selectedRestaurant={selectedRestaurant}
                      onRestaurantSelect={handleRestaurantSelect}
                    />
                  )}
                </div>
              </div>
              
              {/* 选中的餐厅详情 */}
              {selectedRestaurant && (
                <div className="mt-12 p-6 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <div className="flex items-center mb-3">
                        <h2 className="text-2xl font-bold text-gray-900 mr-4">{selectedRestaurant.name}</h2>
                        <span className="px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-full">
                          {selectedRestaurant.cuisine || selectedRestaurant.cuisineType}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 mb-4">
                        <span className="flex items-center text-amber-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="font-semibold">{(selectedRestaurant.rating || 0).toFixed(1)}</span>
                        </span>
                        
                        <span className="flex items-center text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{(selectedRestaurant.distance || 0).toFixed(1)} 公里</span>
                        </span>
                      </div>
                      
                      <p className="text-gray-600">
                        这家餐厅提供精致的{selectedRestaurant.cuisine || selectedRestaurant.cuisineType}美食，
                        拥有舒适的用餐环境和专业的服务。根据我们的分析，该餐厅在口味、环境和服务方面都有良好的评价。
                      </p>
                    </div>
                    
                    <div className="mt-6 md:mt-0">
                      <button 
                        className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        获取导航
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default FoodFinder; 