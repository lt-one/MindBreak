import { useState, useEffect } from 'react';

interface GeolocationState {
  loading: boolean;
  error: string | null;
  location: {
    latitude: number;
    longitude: number;
  } | null;
}

interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

const defaultOptions: GeolocationOptions = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0
};

export const useGeolocation = (options: GeolocationOptions = defaultOptions) => {
  const [state, setState] = useState<GeolocationState>({
    loading: true,
    error: null,
    location: null
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({
        loading: false,
        error: "您的浏览器不支持地理位置功能",
        location: null
      });
      return;
    }

    const geoSuccess = (position: GeolocationPosition) => {
      setState({
        loading: false,
        error: null,
        location: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      });
    };

    const geoError = (error: GeolocationPositionError) => {
      let errorMessage: string;
      
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = "用户拒绝了地理位置请求";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = "位置信息不可用";
          break;
        case error.TIMEOUT:
          errorMessage = "获取位置请求超时";
          break;
        default:
          errorMessage = "获取位置时发生未知错误";
      }
      
      setState({
        loading: false,
        error: errorMessage,
        location: null
      });
    };

    navigator.geolocation.getCurrentPosition(
      geoSuccess,
      geoError,
      options
    );
  }, [options]);

  return state;
};

// 默认位置 - 如果无法获取用户位置，可以使用这些默认坐标
// 北京天安门坐标
export const DEFAULT_LOCATION = {
  latitude: 39.9042,
  longitude: 116.4074
}; 