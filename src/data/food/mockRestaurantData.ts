// 餐厅数据类型定义
export interface Restaurant {
  id: string;
  name: string;
  cuisineType: string;
  priceRange: '¥' | '¥¥' | '¥¥¥' | '¥¥¥¥'; // 价格范围从便宜到昂贵
  rating: number; // 1-5 星评分
  address: string;
  phone: string;
  description: string;
  imageUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  openingHours: {
    [key: string]: string; // 例如: "monday": "11:00 - 22:00"
  };
  features: string[]; // 例如: ["外卖", "WiFi", "停车场"]
}

// 菜系类型
export const cuisineTypes = [
  "中餐", 
  "西餐", 
  "日料", 
  "韩餐", 
  "泰餐", 
  "意餐", 
  "法餐", 
  "墨西哥菜", 
  "印度菜", 
  "素食", 
  "快餐"
];

// 特色/设施类型
export const featureTypes = [
  "外卖", 
  "WiFi", 
  "停车场", 
  "户外座位", 
  "接受信用卡", 
  "供应酒水", 
  "预订", 
  "送餐上门", 
  "适合儿童"
];

// 生成指定数量的随机餐厅
export const generateRestaurants = (
  count: number, 
  centerLat: number, 
  centerLng: number,
  radiusKm: number = 3
): Restaurant[] => {
  const restaurants: Restaurant[] = [];
  
  const restaurantNames = [
    "金龙餐厅", "海之味", "天府小馆", "巴黎花园", "樱花寿司", "辣椒厨房", 
    "阳光咖啡", "蓝海餐厅", "绿野蔬食", "红房子西餐", "喜悦面馆", "星光披萨",
    "江南味道", "北方面点", "川香坊", "粤式茶餐厅", "沙漠绿洲", "山间小厨",
    "城市牛排", "丰收餐厅", "海鲜湾", "竹林小馆", "月亮河餐厅", "阳光早餐"
  ];
  
  for (let i = 0; i < count; i++) {
    // 生成一个在中心点周围radiusKm公里范围内的随机坐标
    // 地球半径约为6371公里
    const randomDistance = Math.random() * radiusKm;
    const randomAngle = Math.random() * Math.PI * 2; // 随机角度（弧度）
    
    // 将距离转换为经纬度变化（近似计算）
    const latOffset = (randomDistance / 6371) * (180 / Math.PI);
    const lngOffset = (randomDistance / (6371 * Math.cos(centerLat * Math.PI / 180))) * (180 / Math.PI);
    
    // 计算新的经纬度
    const lat = centerLat + latOffset * Math.sin(randomAngle);
    const lng = centerLng + lngOffset * Math.cos(randomAngle);
    
    // 随机选择餐厅名称
    const nameIndex = Math.floor(Math.random() * restaurantNames.length);
    const name = restaurantNames[nameIndex];
    // 从数组中移除已使用的名称，确保不重复
    restaurantNames.splice(nameIndex, 1);
    
    // 随机选择菜系
    const cuisineType = cuisineTypes[Math.floor(Math.random() * cuisineTypes.length)];
    
    // 随机价格范围
    const priceRanges: Restaurant['priceRange'][] = ['¥', '¥¥', '¥¥¥', '¥¥¥¥'];
    const priceRange = priceRanges[Math.floor(Math.random() * priceRanges.length)];
    
    // 随机评分 (1-5 星，步长 0.5)
    const rating = Math.round((1 + Math.random() * 4) * 2) / 2;
    
    // 随机选择 2-4 个特色/设施
    const featureCount = 2 + Math.floor(Math.random() * 3);
    const shuffledFeatures = [...featureTypes].sort(() => 0.5 - Math.random());
    const features = shuffledFeatures.slice(0, featureCount);
    
    // 生成随机的营业时间
    const openingHours: { [key: string]: string } = {};
    const days = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
    const openHours = 9 + Math.floor(Math.random() * 3); // 9-11点开门
    const closeHours = 20 + Math.floor(Math.random() * 4); // 20-23点关门
    
    days.forEach(day => {
      // 10% 的概率周日休息
      if (day === "星期日" && Math.random() < 0.1) {
        openingHours[day] = "休息";
      } else {
        openingHours[day] = `${openHours}:00 - ${closeHours}:00`;
      }
    });
    
    // 创建餐厅对象
    restaurants.push({
      id: `restaurant-${i + 1}`,
      name,
      cuisineType,
      priceRange,
      rating,
      address: `模拟地址 ${Math.floor(Math.random() * 200) + 1}号`,
      phone: `1${Math.floor(Math.random() * 900000000 + 100000000)}`,
      description: `这是一家提供${cuisineType}的餐厅，拥有舒适的环境和美味的食物。`,
      imageUrl: `https://source.unsplash.com/400x300/?restaurant,${cuisineType.replace(/\s/g, '')}`,
      coordinates: { lat, lng },
      openingHours,
      features
    });
  }
  
  return restaurants;
};

// 模拟获取附近餐厅的 API
export const fetchNearbyRestaurants = async (
  lat: number, 
  lng: number, 
  radius: number = 3
): Promise<Restaurant[]> => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // 生成 20 个随机餐厅
  return generateRestaurants(20, lat, lng, radius);
};

// 根据筛选条件过滤餐厅
export const filterRestaurants = (
  restaurants: Restaurant[],
  filters: {
    cuisineType?: string;
    priceRange?: Restaurant['priceRange'];
    minRating?: number;
    features?: string[];
  }
): Restaurant[] => {
  return restaurants.filter(restaurant => {
    // 按菜系过滤
    if (filters.cuisineType && restaurant.cuisineType !== filters.cuisineType) {
      return false;
    }
    
    // 按价格范围过滤
    if (filters.priceRange && restaurant.priceRange !== filters.priceRange) {
      return false;
    }
    
    // 按最低评分过滤
    if (filters.minRating && restaurant.rating < filters.minRating) {
      return false;
    }
    
    // 按特色/设施过滤
    if (filters.features && filters.features.length > 0) {
      for (const feature of filters.features) {
        if (!restaurant.features.includes(feature)) {
          return false;
        }
      }
    }
    
    return true;
  });
};

// 随机选择一家餐厅
export const getRandomRestaurant = (restaurants: Restaurant[]): Restaurant | null => {
  if (restaurants.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * restaurants.length);
  return restaurants[randomIndex];
};
