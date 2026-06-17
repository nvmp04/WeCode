'use client';

import { useState } from 'react';
import { RegisterPayload } from '../types';

interface Props {
  onSubmit: (payload: RegisterPayload) => void;
  loading: boolean;
  error: string | null;
}

export function RegisterForm({
  onSubmit,
  loading,
  error,
}: Props) {
  const [form, setForm] = useState<RegisterPayload>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const updateField = (
    key: keyof RegisterPayload,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const fields = [
    {
      key: 'name',
      label: 'fullName',
      type: 'text',
      placeholder: 'Nguyen Van A',
    },
    {
      key: 'email',
      label: 'email',
      type: 'email',
      placeholder: 'dev@wecode.vn',
    },
    {
      key: 'password',
      label: 'password',
      type: 'password',
      placeholder: '••••••••',
    },
    {
      key: 'confirmPassword',
      label: 'confirmPassword',
      type: 'password',
      placeholder: '••••••••',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0d1117] px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-5xl grid md:grid-cols-2 rounded-3xl overflow-hidden border border-[#30363d] bg-[#0d1117] shadow-2xl">

        {/* Left Side */}
        <div className="relative p-10 border-r border-[#30363d] bg-gradient-to-br from-[#11161d] to-[#0d1117]">
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:28px_28px]" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#30363d] px-3 py-1 text-xs text-[#58a6ff] bg-[#161b22]">
              <span className="w-2 h-2 rounded-full bg-[#3fb950]" />
              auth/register.tsx
            </div>

            <h1 className="mt-8 text-4xl font-bold text-white leading-tight">
              Build your
              <span className="block text-[#58a6ff]">
                developer identity
              </span>
            </h1>

            <p className="mt-5 text-[#8b949e] leading-7">
              Tạo tài khoản để bắt đầu hành trình học tập,
              cộng tác và phát triển kỹ năng lập trình
              trong môi trường hiện đại.
            </p>

            <div className="mt-10 space-y-4 text-sm">
              <div className="rounded-xl border border-[#30363d] bg-[#161b22] px-4 py-3 text-[#c9d1d9]">
                <span className="text-[#8b949e] mr-2">01.</span>
                Real-time learning ecosystem
              </div>

              <div className="rounded-xl border border-[#30363d] bg-[#161b22] px-4 py-3 text-[#c9d1d9]">
                <span className="text-[#8b949e] mr-2">02.</span>
                AI powered coding assistant
              </div>

              <div className="rounded-xl border border-[#30363d] bg-[#161b22] px-4 py-3 text-[#c9d1d9]">
                <span className="text-[#8b949e] mr-2">03.</span>
                Secure & scalable platform
              </div>
            </div>

            <div className="mt-12 rounded-2xl border border-[#30363d] bg-[#161b22] p-5 font-mono text-sm">
              <div className="text-[#8b949e]">
                <span className="text-[#58a6ff]">const</span>{' '}
                user = {'{'}
              </div>
              <div className="pl-5 text-[#c9d1d9]">
                role:
                <span className="text-[#3fb950]">
                  {' '}"developer"
                </span>,
              </div>
              <div className="pl-5 text-[#c9d1d9]">
                status:
                <span className="text-[#3fb950]">
                  {' '}"ready"
                </span>
              </div>
              <div className="text-[#8b949e]">{'}'}</div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-10 bg-[#0d1117]">
          <div className="mb-8">
            <p className="text-sm text-[#58a6ff] font-mono">
              CreateAccount()
            </p>

            <h2 className="mt-2 text-3xl font-semibold text-white">
              Register
            </h2>

            <p className="mt-2 text-[#8b949e]">
              Điền thông tin để khởi tạo tài khoản.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <div className="space-y-5">
            {fields.map((field, index) => (
              <div key={field.key}>
                <label className="mb-2 block text-xs font-mono text-[#8b949e]">
                  {String(index + 1).padStart(2, '0')}.
                  <span className="ml-2 text-[#58a6ff]">
                    {field.label}
                  </span>
                </label>

                <input
                  type={field.type}
                  value={form[field.key as keyof RegisterPayload]}
                  onChange={(e) =>
                    updateField(
                      field.key as keyof RegisterPayload,
                      e.target.value
                    )
                  }
                  placeholder={field.placeholder}
                  className="w-full rounded-xl border border-[#30363d] bg-[#161b22] px-4 py-3 text-[#c9d1d9] outline-none transition-all duration-200 placeholder:text-[#6e7681] focus:border-[#58a6ff] focus:ring-2 focus:ring-[#58a6ff]/20"
                />
              </div>
            ))}

            <button
              onClick={() => onSubmit(form)}
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-[#238636] px-4 py-3 font-semibold text-white transition-all duration-200 hover:bg-[#2ea043] hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? 'Compiling account...'
                : 'npm run register'}
            </button>
          </div>

          <div className="mt-8 rounded-xl border border-[#30363d] bg-[#161b22] p-4 font-mono text-sm text-[#8b949e]">
            <span className="text-[#58a6ff]">
              Already have account?
            </span>{' '}
            <a
              href="/login"
              className="text-[#3fb950] hover:underline"
            >
              login()
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}