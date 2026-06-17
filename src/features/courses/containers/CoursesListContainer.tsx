// src/features/courses/containers/CoursesListContainer.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useCourses } from '../hooks/useCourses';
import { CourseFilter } from '../components/CourseFilter';
import { CourseList } from '../components/CourseList';

export function CoursesListContainer() {
  const router = useRouter();
  const { courses, filters, setFilters, isLoading } = useCourses();

  return (
    <div>
      <CourseFilter filters={filters} onChange={setFilters} />
      <CourseList
        courses={courses}
        isLoading={isLoading}
        onCourseClick={(slug) => router.push(`/courses/${slug}`)}
      />
    </div>
  );
}