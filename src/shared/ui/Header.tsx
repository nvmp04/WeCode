// src/shared/ui/Header.tsx
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
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl text-blue-600">
          WeCode
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth */}
        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard" className="text-sm text-gray-600 hover:text-blue-600">
                Học của tôi
              </Link>
              <div className="relative group">
                <button className="flex items-center gap-2">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                      {user.name[0].toUpperCase()}
                    </div>
                  )}
                </button>
                {/* Dropdown */}
                <div className="absolute right-0 top-10 w-44 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                  <Link href="/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-50">
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link href="/login" className="text-sm text-gray-600 hover:text-blue-600">
                Đăng nhập
              </Link>
              <Link
                href="/register"
                className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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