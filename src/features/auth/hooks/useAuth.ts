// src/features/auth/hooks/useAuth.ts
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/authStore';
import { LoginPayload, RegisterPayload } from '../types';
import { apiClient } from '@/shared/lib/axios';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const store = useAuthStore();
  const router = useRouter();

  const fetchAndSetUser = async (token: string) => {
    const res = await apiClient.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    store.setToken(token);
    store.setUser(res.data);
  };

  const login = async (payload: LoginPayload) => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiClient.post('/auth/login', payload);
      await fetchAndSetUser(res.data.access_token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload: RegisterPayload) => {
    try {
      setLoading(true);
      setError(null);
      if (payload.password !== payload.confirmPassword) {
        throw new Error('Mật khẩu xác nhận không khớp');
      }
      const res = await apiClient.post('/auth/register', payload);
      await fetchAndSetUser(res.data.access_token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = () => {
    // Redirect thẳng sang BE — không cần mock nữa
    window.location.href = 'http://localhost:3001/api/auth/google';
  };

  const logout = () => {
    store.logout();
    router.push('/');
  };

  return {
    login,
    register,
    googleLogin,
    logout,
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    loading,
    error,
  };
}