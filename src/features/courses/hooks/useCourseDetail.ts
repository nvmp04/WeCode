// src/features/courses/hooks/useCourseDetail.ts
import { CourseDetail } from '../types';
import { MOCK_COURSE_DETAIL } from '../constants';

export function useCourseDetail(slug: string): { course: CourseDetail | null } {
  // Sau này: useQuery(['course', slug], () => courseService.getBySlug(slug))
  const course = slug === MOCK_COURSE_DETAIL.slug ? MOCK_COURSE_DETAIL : null;
  return { course };
}