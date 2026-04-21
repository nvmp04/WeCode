// src/app/courses/page.tsx
import { CoursesListContainer } from '@/features/courses/containers/CoursesListContainer';

export default function CoursesPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-2">Khóa học</h1>
      <p className="text-gray-500 mb-8">Học lập trình từ cơ bản đến thực chiến.</p>
      <CoursesListContainer />
    </main>
  );
}