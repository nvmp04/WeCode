// src/features/auth/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, AuthUser } from '../types';

interface AuthStore extends AuthState {
  token: string | null;
  setUser: (user: AuthUser) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    { name: 'auth-storage' }
  )
);