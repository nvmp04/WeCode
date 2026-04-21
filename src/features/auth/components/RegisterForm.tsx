// src/features/auth/components/RegisterForm.tsx
'use client';

import { useState } from 'react';
import { RegisterPayload } from '../types';

interface Props {
  onSubmit: (payload: RegisterPayload) => void;
  loading: boolean;
  error: string | null;
}

export function RegisterForm({ onSubmit, loading, error }: Props) {
  const [form, setForm] = useState<RegisterPayload>({
    name: '', email: '', password: '', confirmPassword: '',
  });

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Đăng ký</h1>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="space-y-4">
        {[
          { key: 'name', label: 'Họ tên', type: 'text', placeholder: 'Nguyen Van A' },
          { key: 'email', label: 'Email', type: 'email', placeholder: 'email@wecode.vn' },
          { key: 'password', label: 'Mật khẩu', type: 'password', placeholder: '••••••' },
          { key: 'confirmPassword', label: 'Xác nhận mật khẩu', type: 'password', placeholder: '••••••' },
        ].map(({ key, label, type, placeholder }) => (
          <div key={key}>
            <label className="text-sm font-medium">{label}</label>
            <input
              type={type}
              value={form[key as keyof RegisterPayload]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="mt-1 w-full px-4 py-2 border rounded-lg outline-none focus:border-blue-400"
              placeholder={placeholder}
            />
          </div>
        ))}

        <button
          onClick={() => onSubmit(form)}
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Đang đăng ký...' : 'Đăng ký'}
        </button>
      </div>

      <p className="mt-4 text-sm text-center text-gray-500">
        Đã có tài khoản?{' '}
        <a href="/login" className="text-blue-600 hover:underline">Đăng nhập</a>
      </p>
    </div>
  );
}