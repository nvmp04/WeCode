// src/features/auth/containers/LoginContainer.tsx
'use client';

import { useAuth } from '../hooks/useAuth';
import { LoginForm } from '../components/LoginForm';

export function LoginContainer() {
  const { login, googleLogin, loading, error } = useAuth();
  return (
    <LoginForm
      onSubmit={login}
      onGoogleLogin={googleLogin}
      loading={loading}
      error={error}
    />
  );
}