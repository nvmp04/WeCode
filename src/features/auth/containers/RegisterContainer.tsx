// src/features/auth/containers/RegisterContainer.tsx
'use client';

import { useAuth } from '../hooks/useAuth';
import { RegisterForm } from '../components/RegisterForm';

export function RegisterContainer() {
  const { register, loading, error } = useAuth();
  return <RegisterForm onSubmit={register} loading={loading} error={error} />;
}