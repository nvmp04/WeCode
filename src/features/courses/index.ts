// src/features/courses/index.ts
// Convenience exports for the courses feature

export * from './types';
export * from './constants';
export * as courseService from './services/courseService';
export { useCourses, useCourseDetail } from './hooks/useCourses';
export { CoursesListContainer } from './containers/CoursesListContainer';
export { CourseCard } from './components/CourseCard';
export { CourseList } from './components/CourseList';
export { CourseFilter } from './components/CourseFilter';
