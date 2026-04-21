'use client';

import { useCourses } from '../hooks/useCourses';
import { CourseList } from '../components/CourseList';
import { CourseFilter } from '../components/CourseFilter';
import { useRouter } from 'next/navigation';

export function CoursesListContainer() {
  const { courses, filters, setFilters } = useCourses();
  const router = useRouter();
  return (
    <div>
      <CourseFilter filters={filters} onChange={setFilters}/>
      <CourseList 
        courses={courses}
        onCourseClick={(slug) => router.push(`/courses/${slug}`)}
       />
    </div>
  );
}
