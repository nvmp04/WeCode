// src/shared/ui/Footer.tsx
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t mt-20">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <p className="font-bold text-blue-600 mb-3">WeCode</p>
          <p className="text-sm text-gray-500">Học lập trình thực chiến, không lan man.</p>
        </div>
        <div>
          <p className="font-bold text-sm mb-3">Khóa học</p>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link href="/courses?level=beginner" className="hover:text-blue-600">Cơ bản</Link></li>
            <li><Link href="/courses?level=intermediate" className="hover:text-blue-600">Trung cấp</Link></li>
            <li><Link href="/courses?level=advanced" className="hover:text-blue-600">Nâng cao</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-bold text-sm mb-3">Công ty</p>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link href="/about" className="hover:text-blue-600">Về chúng tôi</Link></li>
            <li><Link href="/blog" className="hover:text-blue-600">Blog</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-bold text-sm mb-3">Hỗ trợ</p>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link href="/faq" className="hover:text-blue-600">FAQ</Link></li>
            <li><a href="mailto:support@wecode.vn" className="hover:text-blue-600">Liên hệ</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <p className="text-center text-xs text-gray-400 py-4">
          © {new Date().getFullYear()} WeCode. All rights reserved.
        </p>
      </div>
    </footer>
  );
}