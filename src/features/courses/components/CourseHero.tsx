// src/features/courses/components/CourseHero.tsx
import { CourseDetail } from '../types';

export function CourseHero({ course }: { course: CourseDetail }) {
  return (
    <div className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold">{course.title}</h1>
        <p className="mt-3 text-gray-300">{course.description}</p>
        <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
          <span className="text-yellow-400 font-bold">{course.rating} ★</span>
          <span>({course.totalStudents.toLocaleString()} học viên)</span>
          <span>·</span>
          <span>{course.totalLessons} bài học</span>
          <span>·</span>
          <span>Cập nhật {course.updatedAt}</span>
        </div>
        <p className="mt-2 text-sm text-gray-400">
          Giảng viên: <span className="text-white">{course.instructor.name}</span>
        </p>
      </div>
    </div>
  );
}