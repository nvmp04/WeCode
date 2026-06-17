'use client';

import Link from 'next/link';
import { useAuthStore } from '@/features/auth/store/authStore';
import { useAuth } from '@/features/auth/hooks/useAuth';

const NAV_LINKS = [
  { label: 'Khóa học', href: '/courses' },
  { label: 'Lộ trình', href: '/roadmap' },
  { label: 'Blog', href: '/blog' },
];

export function Header() {
  const { user, isAuthenticated } = useAuthStore();
  const { logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-[#30363d] bg-[#0d1117]/90 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#161b22] border border-[#30363d] flex items-center justify-center text-[#58a6ff] font-bold text-sm transition-all group-hover:border-[#58a6ff]/50">
            {'</>'}
          </div>

          <div>
            <p className="font-semibold text-white leading-none">
              WeCode
            </p>
            <p className="text-[10px] text-[#8b949e] font-mono">
              build.future()
            </p>
          </div>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-xl text-sm text-[#8b949e] hover:text-white hover:bg-[#161b22] border border-transparent hover:border-[#30363d] transition-all"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth */}
        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <>
              <Link
                href="/dashboard"
                className="hidden sm:flex px-4 py-2 rounded-xl text-sm text-[#8b949e] hover:text-white hover:bg-[#161b22] border border-transparent hover:border-[#30363d] transition-all"
              >
                Học của tôi
              </Link>

              <div className="relative group">
                <button className="flex items-center gap-3 rounded-xl border border-[#30363d] bg-[#161b22] px-2 py-1.5 hover:border-[#58a6ff]/40 transition-all">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-[#58a6ff] text-white flex items-center justify-center text-sm font-bold">
                      {user.name[0].toUpperCase()}
                    </div>
                  )}

                  <div className="hidden md:block text-left">
                    <p className="text-sm text-white leading-none max-w-[120px] truncate">
                      {user.name}
                    </p>
                    <p className="text-[11px] text-[#8b949e] font-mono truncate max-w-[120px]">
                      user.active
                    </p>
                  </div>
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 top-14 w-56 rounded-2xl border border-[#30363d] bg-[#161b22] shadow-2xl opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 overflow-hidden">
                  <div className="px-4 py-3 border-b border-[#30363d]">
                    <p className="text-sm font-medium text-white truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-[#8b949e] truncate">
                      {user.email}
                    </p>
                  </div>

                  <Link
                    href="/dashboard"
                    className="block px-4 py-3 text-sm text-[#c9d1d9] hover:bg-[#0d1117] transition-colors"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-[#0d1117] transition-colors"
                  >
                    logout()
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 rounded-xl text-sm text-[#8b949e] hover:text-white hover:bg-[#161b22] border border-transparent hover:border-[#30363d] transition-all"
              >
                Đăng nhập
              </Link>

              <Link
                href="/register"
                className="px-4 py-2 rounded-xl text-sm font-medium bg-[#238636] text-white hover:bg-[#2ea043] transition-all hover:scale-[1.02]"
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}