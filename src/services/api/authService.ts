import apiClient, { API_ENDPOINTS } from './apiConfig';

// 用户接口
export interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  bio?: string;
  role: 'user' | 'admin' | 'editor';
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  last_login?: string;
  preferences?: {
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
    newsletter: boolean;
    language: string;
  };
}

// 登录请求接口
export interface LoginRequest {
  email: string;
  password: string;
  remember_me?: boolean;
}

// 注册请求接口
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  first_name?: string;
  last_name?: string;
  agree_to_terms: boolean;
}

// 认证响应接口
export interface AuthResponse {
  user: User;
  token: string;
  token_expiry: string;
  refresh_token?: string;
}

// 密码重置请求
export interface PasswordResetRequest {
  email: string;
}

// 密码重置确认接口
export interface PasswordResetConfirmRequest {
  token: string;
  password: string;
  password_confirmation: string;
}

// 更新用户信息接口
export interface UpdateProfileRequest {
  username?: string;
  first_name?: string;
  last_name?: string;
  bio?: string;
  avatar_url?: string;
  current_password?: string;
  new_password?: string;
  new_password_confirmation?: string;
}

// 用户验证响应
export interface VerificationResponse {
  message: string;
  status: 'success' | 'error';
}

// 认证服务类
const authService = {
  // 用户登录
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH_LOGIN, credentials);
      
      // 保存token到localStorage
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        
        // 如果有refresh token，也保存
        if (response.data.refresh_token) {
          localStorage.setItem('refresh_token', response.data.refresh_token);
        }
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // 用户注册
  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH_REGISTER, userData);
      
      // 如果注册后自动登录，保存token
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        
        if (response.data.refresh_token) {
          localStorage.setItem('refresh_token', response.data.refresh_token);
        }
      }
      
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  // 用户登出
  logout: async (): Promise<{ message: string }> => {
    try {
      // 调用后端登出接口
      const response = await apiClient.post(API_ENDPOINTS.AUTH_LOGOUT);
      
      // 无论后端响应如何，都清除本地存储
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      
      return response.data;
    } catch (error) {
      console.error('Logout error:', error);
      
      // 即使后端调用失败，也要清除本地token
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      
      throw error;
    }
  },

  // 获取当前用户信息
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USER_PROFILE);
      return response.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  },

  // 检查用户是否已认证
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('auth_token');
  },

  // 获取权限token
  getToken: (): string | null => {
    return localStorage.getItem('auth_token');
  },

  // 刷新token
  refreshToken: async (): Promise<AuthResponse> => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      
      const response = await apiClient.post(`${API_ENDPOINTS.AUTH}/refresh`, {
        refresh_token: refreshToken
      });
      
      // 更新localStorage中的token
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        
        if (response.data.refresh_token) {
          localStorage.setItem('refresh_token', response.data.refresh_token);
        }
      }
      
      return response.data;
    } catch (error) {
      console.error('Token refresh error:', error);
      
      // 如果刷新失败，清除token并重定向到登录页
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      
      throw error;
    }
  },

  // 请求密码重置
  requestPasswordReset: async (data: PasswordResetRequest): Promise<{ message: string }> => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH_RESET_PASSWORD, data);
      return response.data;
    } catch (error) {
      console.error('Password reset request error:', error);
      throw error;
    }
  },

  // 确认密码重置
  confirmPasswordReset: async (data: PasswordResetConfirmRequest): Promise<{ message: string }> => {
    try {
      const response = await apiClient.post(`${API_ENDPOINTS.AUTH_RESET_PASSWORD}/confirm`, data);
      return response.data;
    } catch (error) {
      console.error('Password reset confirmation error:', error);
      throw error;
    }
  },

  // 更新用户资料
  updateProfile: async (data: UpdateProfileRequest): Promise<User> => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.USER_PROFILE, data);
      return response.data;
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  },

  // 上传头像
  uploadAvatar: async (file: File): Promise<{ avatar_url: string }> => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      
      const response = await apiClient.post(`${API_ENDPOINTS.USER_PROFILE}/avatar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Avatar upload error:', error);
      throw error;
    }
  },

  // 验证邮箱
  verifyEmail: async (token: string): Promise<VerificationResponse> => {
    try {
      const response = await apiClient.post(`${API_ENDPOINTS.AUTH}/verify-email`, { token });
      return response.data;
    } catch (error) {
      console.error('Email verification error:', error);
      throw error;
    }
  },

  // 重新发送验证邮件
  resendVerificationEmail: async (): Promise<{ message: string }> => {
    try {
      const response = await apiClient.post(`${API_ENDPOINTS.AUTH}/resend-verification`);
      return response.data;
    } catch (error) {
      console.error('Resend verification error:', error);
      throw error;
    }
  },

  // 检查用户名是否可用
  checkUsernameAvailability: async (username: string): Promise<{ available: boolean }> => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.AUTH}/check-username`, {
        params: { username }
      });
      return response.data;
    } catch (error) {
      console.error('Username availability check error:', error);
      throw error;
    }
  },

  // 检查邮箱是否可用
  checkEmailAvailability: async (email: string): Promise<{ available: boolean }> => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.AUTH}/check-email`, {
        params: { email }
      });
      return response.data;
    } catch (error) {
      console.error('Email availability check error:', error);
      throw error;
    }
  },

  // 获取用户设置
  getUserSettings: async (): Promise<User['preferences']> => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USER_SETTINGS);
      return response.data;
    } catch (error) {
      console.error('User settings fetch error:', error);
      throw error;
    }
  },

  // 更新用户设置
  updateUserSettings: async (settings: Partial<User['preferences']>): Promise<User['preferences']> => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.USER_SETTINGS, settings);
      return response.data;
    } catch (error) {
      console.error('User settings update error:', error);
      throw error;
    }
  },

  // 获取登录历史
  getLoginHistory: async (): Promise<{ ip: string; device: string; location: string; time: string }[]> => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.USER}/login-history`);
      return response.data;
    } catch (error) {
      console.error('Login history fetch error:', error);
      throw error;
    }
  },

  // 删除账户
  deleteAccount: async (password: string): Promise<{ message: string }> => {
    try {
      const response = await apiClient.delete(`${API_ENDPOINTS.USER_PROFILE}`, {
        data: { password }
      });
      
      // 清除本地存储
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      
      return response.data;
    } catch (error) {
      console.error('Account deletion error:', error);
      throw error;
    }
  }
};

export default authService; 