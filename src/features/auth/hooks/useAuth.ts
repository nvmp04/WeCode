// src/features/auth/hooks/useAuth.ts
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../services/authService';
import { useAuthStore } from '../store/authStore';
import { LoginPayload, RegisterPayload } from '../types';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser, logout, user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  const login = async (payload: LoginPayload) => {
    try {
      setLoading(true);
      setError(null);
      const user = await authService.login(payload);
      setUser(user);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
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
      const user = await authService.register(payload);
      setUser(user);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const googleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      // Mock: giả lập Google trả về user
      // Sau này: signIn('google') từ NextAuth
      await new Promise((r) => setTimeout(r, 800));
      setUser({
        id: 'google-1',
        name: 'Google User',
        email: 'google@gmail.com',
        avatar: 'https://lh3.googleusercontent.com/a/default',
      });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, register, googleLogin, logout, user, isAuthenticated, loading, error };
}