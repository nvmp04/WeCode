// src/shared/layouts/MainLayout.tsx
import { Header } from '@/shared/ui/Header';
import { Footer } from '@/shared/ui/Footer';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}