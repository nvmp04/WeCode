// src/features/courses/components/CourseList.tsx
import { Course } from '../types';
import { CourseCard } from './CourseCard';

interface Props {
  courses: Course[];
  onCourseClick: (slug: string) => void;
  isLoading?: boolean;
}

export function CourseList({ courses, onCourseClick, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-200 h-80 animate-pulse bg-gray-100" />
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return <p className="text-center text-gray-500 py-12">Không tìm thấy khóa học nào.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} onClick={onCourseClick} />
      ))}
    </div>
  );
}