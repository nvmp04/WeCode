// src/app/layout.tsx
import { Providers } from './providers';
import { MainLayout } from '@/shared/layouts/MainLayout';
import './globals.css'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}