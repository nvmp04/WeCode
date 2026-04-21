// src/features/courses/components/CourseList.tsx
import { Course } from '../types';
import { CourseCard } from './CourseCard';

interface Props {
  courses: Course[];
  onCourseClick: (slug: string) => void;
}

export function CourseList({ courses, onCourseClick }: Props) {
  if (courses.length === 0) {
    return <p className="text-center text-gray-500 py-12">Chưa có khóa học nào.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} onClick={onCourseClick} />
      ))}
    </div>
  );
}