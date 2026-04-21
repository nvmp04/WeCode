// src/features/auth/components/LoginForm.tsx
'use client';

import { useState } from 'react';
import { LoginPayload } from '../types';

interface Props {
  onSubmit: (payload: LoginPayload) => void;
  onGoogleLogin: () => void;
  loading: boolean;
  error: string | null;
}

export function LoginForm({ onSubmit, onGoogleLogin, loading, error }: Props) {
  const [form, setForm] = useState<LoginPayload>({ email: '', password: '' });

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Đăng nhập</h1>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {/* Google */}
      <button
        onClick={onGoogleLogin}
        className="w-full py-3 border border-gray-300 rounded-lg font-medium flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors mb-4"
      >
        <svg width="18" height="18" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          <path fill="none" d="M0 0h48v48H0z"/>
        </svg>
        Tiếp tục với Google
      </button>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-gray-200"/>
        <span className="text-sm text-gray-400">hoặc</span>
        <div className="flex-1 h-px bg-gray-200"/>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1 w-full px-4 py-2 border rounded-lg outline-none focus:border-blue-400"
            placeholder="test@wecode.vn"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Mật khẩu</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mt-1 w-full px-4 py-2 border rounded-lg outline-none focus:border-blue-400"
            placeholder="123456"
          />
        </div>
        <button
          onClick={() => onSubmit(form)}
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </div>

      <p className="mt-4 text-sm text-center text-gray-500">
        Chưa có tài khoản?{' '}
        <a href="/register" className="text-blue-600 hover:underline">Đăng ký</a>
      </p>
    </div>
  );
}