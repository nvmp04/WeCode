// src/app/layout.tsx
import { MainLayout } from '@/shared/layouts/MainLayout';
import './globals.css'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}