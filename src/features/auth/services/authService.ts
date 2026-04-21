// src/features/auth/services/authService.ts
import { LoginPayload, RegisterPayload, AuthUser } from '../types';

const MOCK_USER: AuthUser = {
  id: '1',
  name: 'Nguyen Van A',
  email: 'test@wecode.vn',
  avatar: '',
};

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthUser> => {
    await new Promise((r) => setTimeout(r, 800)); // giả lập delay
    if (payload.email === 'test@wecode.vn' && payload.password === '123456') {
      return MOCK_USER;
    }
    throw new Error('Email hoặc mật khẩu không đúng');
  },

  register: async (payload: RegisterPayload): Promise<AuthUser> => {
    await new Promise((r) => setTimeout(r, 800));
    return { ...MOCK_USER, name: payload.name, email: payload.email };
  },
};
// Sau này: thay bằng axios.post('/auth/login', payload)