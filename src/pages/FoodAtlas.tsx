import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';

// 食物类型定义
interface FoodItem {
  id: number;
  name: string;
  description: string;
  region: string;
  cuisine: string;
  rating: number;
  position: LatLngTuple;
  imageSrc: string;
  tags: string[];
}

// 模拟数据
const foodData: FoodItem[] = [
  {
    id: 1,
    name: '北京烤鸭',
    description: '北京烤鸭是具有世界声誉的北京著名菜式，起源于中国南北朝时期，是北京最著名的特色菜之一。用特殊方法烤制，使鸭皮酥脆，肉质细嫩。',
    region: '华北',
    cuisine: '京菜',
    rating: 4.9,
    position: [39.9042, 116.4074],
    imageSrc: 'https://placehold.co/600x400/orange/white?text=北京烤鸭',
    tags: ['烤鸭', '北京', '宫廷菜']
  },
  {
    id: 2,
    name: '麻婆豆腐',
    description: '麻婆豆腐是四川省传统名菜之一，由豆腐、牛肉末、辣椒和花椒等烹制而成。麻来自花椒，辣来自辣椒，这道菜突出了川菜"麻辣"的特点。',
    region: '西南',
    cuisine: '川菜',
    rating: 4.7,
    position: [30.5728, 104.0668],
    imageSrc: 'https://placehold.co/600x400/red/white?text=麻婆豆腐',
    tags: ['豆腐', '四川', '麻辣']
  },
  {
    id: 3,
    name: '小笼包',
    description: '小笼包是江南地区特色小吃，以皮薄、馅多、汤汁丰富著称。制作时将肉馅包入皮中，上笼蒸制而成，咬开后汤汁四溢，鲜美可口。',
    region: '华东',
    cuisine: '苏菜',
    rating: 4.8,
    position: [31.2304, 121.4737],
    imageSrc: 'https://placehold.co/600x400/steelblue/white?text=小笼包',
    tags: ['点心', '上海', '蒸制']
  },
  {
    id: 4,
    name: '粤式早茶',
    description: '粤式早茶是广东地区的传统饮食文化，包括各种点心如虾饺、烧卖、肠粉等，搭配中国茶一起享用，是广东人社交和休闲的重要方式。',
    region: '华南',
    cuisine: '粤菜',
    rating: 4.8,
    position: [23.1291, 113.2644],
    imageSrc: 'https://placehold.co/600x400/green/white?text=粤式早茶',
    tags: ['点心', '广东', '茶文化']
  },
  {
    id: 5,
    name: '兰州拉面',
    description: '兰州拉面是甘肃兰州的特色美食，以"一清二白三红四绿五黄"的特点著称。汤清澈，面条洁白筋道，是西北地区最有代表性的面食之一。',
    region: '西北',
    cuisine: '兰州菜',
    rating: 4.6,
    position: [36.0611, 103.8343],
    imageSrc: 'https://placehold.co/600x400/brown/white?text=兰州拉面',
    tags: ['面食', '甘肃', '清真']
  }
];

// 筛选选项类型
type ViewMode = 'card' | 'map';
type SortOption = 'name' | 'rating' | 'region';

const FoodAtlas: React.FC = () => {
  const [foods, setFoods] = useState<FoodItem[]>(foodData);
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const [selectedRegion, setSelectedRegion] = useState<string>('全部');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('全部');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // 获取所有区域和菜系
  const regions = ['全部', ...Array.from(new Set(foodData.map(food => food.region)))];
  const cuisines = ['全部', ...Array.from(new Set(foodData.map(food => food.cuisine)))];
  
  // 处理筛选和排序
  useEffect(() => {
    let filteredFoods = [...foodData];
    
    // 区域筛选
    if (selectedRegion !== '全部') {
      filteredFoods = filteredFoods.filter(food => food.region === selectedRegion);
    }
    
    // 菜系筛选
    if (selectedCuisine !== '全部') {
      filteredFoods = filteredFoods.filter(food => food.cuisine === selectedCuisine);
    }
    
    // 排序
    filteredFoods.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name, 'zh-CN');
      } else if (sortBy === 'rating') {
        return b.rating - a.rating;
      } else if (sortBy === 'region') {
        return a.region.localeCompare(b.region, 'zh-CN');
      }
      return 0;
    });
    
    setFoods(filteredFoods);
  }, [selectedRegion, selectedCuisine, sortBy]);
  
  // 处理食物点击
  const handleFoodClick = (food: FoodItem) => {
    setSelectedFood(food);
    setIsDrawerOpen(true);
  };
  
  // 食物卡片组件
  const FoodCard: React.FC<{ food: FoodItem }> = ({ food }) => {
    return (
      <div 
        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
        onClick={() => handleFoodClick(food)}
      >
        <div className="relative aspect-video">
          <img src={food.imageSrc} alt={food.name} className="w-full h-full object-cover" />
          <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            {food.rating.toFixed(1)}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1">{food.name}</h3>
          <div className="flex items-center text-xs text-gray-600 mb-2">
            <span className="mr-2">{food.region}</span>
            <span>|</span>
            <span className="ml-2">{food.cuisine}</span>
          </div>
          <p className="text-gray-700 text-sm line-clamp-2">{food.description}</p>
          <div className="mt-3 flex flex-wrap gap-1">
            {food.tags.map((tag, i) => (
              <span key={i} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  // 抽屉组件
  const FoodDrawer: React.FC = () => {
    if (!selectedFood) return null;
    
    return (
      <div className={`fixed top-0 right-0 h-full w-full md:w-1/3 bg-white shadow-lg transform transition-all duration-300 z-50 ${
        isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-4 h-full overflow-y-auto">
          <button 
            onClick={() => setIsDrawerOpen(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="mb-4 aspect-video overflow-hidden rounded-lg">
            <img src={selectedFood.imageSrc} alt={selectedFood.name} className="w-full h-full object-cover" />
          </div>
          
          <h2 className="text-2xl font-bold mb-2">{selectedFood.name}</h2>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-bold">{selectedFood.rating.toFixed(1)}</span>
            </div>
            
            <div className="mx-2 text-gray-400">|</div>
            
            <div className="text-gray-600">
              <span className="mr-2">{selectedFood.region}</span>
              <span className="mx-1">·</span>
              <span>{selectedFood.cuisine}</span>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-bold text-gray-700 mb-2">美食介绍</h3>
            <p className="text-gray-600">{selectedFood.description}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="font-bold text-gray-700 mb-2">地理位置</h3>
            <div className="h-48 rounded-lg overflow-hidden">
              <MapContainer 
                center={selectedFood.position} 
                zoom={5} 
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={selectedFood.position}>
                  <Popup>{selectedFood.name}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-700 mb-2">标签</h3>
            <div className="flex flex-wrap gap-2">
              {selectedFood.tags.map((tag, i) => (
                <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* 页面标题 */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">中国美食图鉴</h1>
          <p className="text-lg opacity-90">探索中国各地区特色美食，了解饮食文化和传统</p>
        </div>
      </div>
      
      {/* 筛选和排序控件 */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-wrap gap-2">
            <select 
              value={selectedRegion} 
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              {regions.map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
            
            <select 
              value={selectedCuisine} 
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              {cuisines.map((cuisine) => (
                <option key={cuisine} value={cuisine}>{cuisine}</option>
              ))}
            </select>
            
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="name">名称排序</option>
              <option value="rating">评分排序</option>
              <option value="region">地区排序</option>
            </select>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setViewMode('card')}
              className={`px-4 py-2 rounded-md ${
                viewMode === 'card' 
                  ? 'bg-amber-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              卡片视图
            </button>
            <button 
              onClick={() => setViewMode('map')}
              className={`px-4 py-2 rounded-md ${
                viewMode === 'map' 
                  ? 'bg-amber-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              地图视图
            </button>
          </div>
        </div>
        
        {/* 结果数量显示 */}
        <div className="mb-6">
          <p className="text-gray-600">
            找到 <span className="font-bold">{foods.length}</span> 种美食
          </p>
        </div>
        
        {/* 卡片视图 */}
        {viewMode === 'card' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        )}
        
        {/* 地图视图 */}
        {viewMode === 'map' && (
          <div className="bg-white rounded-lg overflow-hidden shadow-sm h-[70vh]">
            <MapContainer 
              center={[35.8617, 104.1954]} // 中国中心位置
              zoom={4} 
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {foods.map((food) => (
                <Marker 
                  key={food.id} 
                  position={food.position}
                  eventHandlers={{
                    click: () => {
                      handleFoodClick(food);
                    },
                  }}
                >
                  <Popup>
                    <div className="w-40">
                      <h3 className="font-bold">{food.name}</h3>
                      <p className="text-xs text-gray-500">{food.region} · {food.cuisine}</p>
                      <div className="flex items-center mt-1">
                        <svg className="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-xs ml-1">{food.rating.toFixed(1)}</span>
                      </div>
                      <button 
                        onClick={() => handleFoodClick(food)}
                        className="mt-2 text-xs text-amber-600 hover:text-amber-700 font-medium"
                      >
                        查看详情 →
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}
      </div>
      
      {/* 食物详情抽屉 */}
      <FoodDrawer />
      
      {/* 背景遮罩 */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}
    </div>
  );
};

export default FoodAtlas; 