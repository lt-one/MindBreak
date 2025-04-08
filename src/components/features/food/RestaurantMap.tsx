import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
// 导入Leaflet样式
import 'leaflet/dist/leaflet.css';

// 修复Leaflet默认图标问题
const fixLeafletIcon = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
};

// 确保图标正确加载
fixLeafletIcon();

// 当地图中心改变时重新定位的组件
interface MapCenterUpdaterProps {
  center: [number, number];
}

const MapCenterUpdater: React.FC<MapCenterUpdaterProps> = ({ center }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  
  return null;
};

// 餐厅类型，兼容新旧数据结构
interface Restaurant {
  id: number;
  name: string;
  // 兼容旧版数据结构
  cuisineType?: string;
  priceRange?: string;
  rating?: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
  // 兼容新版数据结构
  cuisine?: string;
  lat?: number;
  lng?: number;
  distance?: number;
}

interface RestaurantMapProps {
  userLocation: { lat: number; lng: number };
  restaurants: Restaurant[];
  selectedRestaurant?: Restaurant | null;
  onRestaurantSelect?: (restaurant: Restaurant) => void;
}

const RestaurantMap: React.FC<RestaurantMapProps> = ({ 
  userLocation, 
  restaurants, 
  selectedRestaurant,
  onRestaurantSelect 
}) => {
  // 创建自定义图标
  const createCustomIcon = (color: string) => {
    
    
    return L.icon({
      iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  };

  // 备用图标 - 防止CDN无法访问
  const userIcon = createCustomIcon('blue');
  const selectedIcon = createCustomIcon('red');
  const restaurantIcon = createCustomIcon('green');
  
  // 地图中心位置
  const center: [number, number] = [userLocation.lat, userLocation.lng];
  
  return (
    <div className="rounded-xl overflow-hidden h-full w-full">
      <MapContainer 
        center={center} 
        zoom={14} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapCenterUpdater center={center} />
        
        {/* 标记当前位置 */}
        <Marker position={center} icon={userIcon}>
          <Popup>
            <div className="text-center">
              <span className="font-bold">您的位置</span>
            </div>
          </Popup>
        </Marker>
        
        {/* 餐厅标记 */}
        {restaurants.map(restaurant => {
          // 支持新旧数据结构
          const position: [number, number] = restaurant.coordinates 
            ? [restaurant.coordinates.lat, restaurant.coordinates.lng]
            : [restaurant.lat!, restaurant.lng!];
            
          const cuisineText = restaurant.cuisineType || restaurant.cuisine;
          const ratingValue = restaurant.rating || 0;
          
          return (
            <Marker
              key={restaurant.id}
              position={position}
              icon={selectedRestaurant?.id === restaurant.id ? selectedIcon : restaurantIcon}
              eventHandlers={{
                click: () => onRestaurantSelect && onRestaurantSelect(restaurant)
              }}
            >
              <Popup>
                <div className="text-center">
                  <h3 className="font-bold text-base mb-1">{restaurant.name}</h3>
                  <p className="text-xs mb-1">{cuisineText}</p>
                  <p className="text-xs">评分: {ratingValue.toFixed(1)}</p>
                  {restaurant.distance && (
                    <p className="text-xs mt-1">距离: {restaurant.distance.toFixed(1)} 公里</p>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default RestaurantMap; 