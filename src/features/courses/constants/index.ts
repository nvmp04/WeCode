import { Course, CourseLevel, CourseDetail } from "../types";
import { LessonProgress } from "@/features/lessons/types";
export const LEVEL_OPTIONS = [
  { label: 'Tất cả', value: '' },
  { label: 'Cơ bản', value: 'beginner' },
  { label: 'Trung cấp', value: 'intermediate' },
  { label: 'Nâng cao', value: 'advanced' },
] as const;

export const MOCK_COURSES: Course[] = [
  {
    id: '1',
    slug: 'javascript-co-ban',
    title: 'JavaScript Cơ Bản Đến Nâng Cao',
    description: 'Học JavaScript từ zero, nắm vững nền tảng để chinh phục mọi framework.',
    thumbnail: '/images/courses/js.png',
    price: 0,
    originalPrice: 799000,
    level: 'beginner',
    totalLessons: 24,
    totalDuration: '18 giờ',
    rating: 4.8,
    totalStudents: 1200,
    instructor: { name: 'Nguyen Van A', avatar: '/images/instructors/a.png' },
    tags: ['JavaScript', 'ES6', 'DOM'],
    isBestseller: true,
    updatedAt: '2024-12',
  },
  {
    id: '2',
    slug: 'reactjs-thuc-chien',
    title: 'ReactJS Thực Chiến với TypeScript',
    description: 'Xây dựng ứng dụng thực tế với React, Hooks, TypeScript và TanStack Query.',
    thumbnail: '/images/courses/react.png',
    price: 799000,
    level: 'intermediate',
    totalLessons: 36,
    totalDuration: '28 giờ',
    rating: 4.9,
    totalStudents: 850,
    instructor: { name: 'Tran Thi B', avatar: '/images/instructors/b.png' },
    tags: ['React', 'TypeScript', 'Hooks'],
    isBestseller: false,
    updatedAt: '2025-01',
  },
];
export const MOCK_COURSE_DETAIL: CourseDetail = {
  ...MOCK_COURSES[0],
  previewVideoId: 'dQw4w9WgXcQ',
  whatYouLearn: [
    'Nắm vững JavaScript từ cơ bản đến ES6+',
    'Hiểu DOM manipulation và event handling',
    'Xây dựng được project thực tế',
    'Tư duy lập trình logic, giải quyết vấn đề',
  ],
  requirements: [
    'Biết sử dụng máy tính cơ bản',
    'Không cần biết lập trình trước',
  ],
  sections: [
    {
      id: 's1',
      title: 'Bắt đầu với JavaScript',
      lessons: [
        { id: 'l1', title: 'Giới thiệu khóa học', duration: '05:20', type: 'video', isFree: true },
        { id: 'l2', title: 'Cài đặt môi trường', duration: '08:45', type: 'document', isFree: true },
        { id: 'l3', title: 'Biến và kiểu dữ liệu', duration: '15:30', type: 'video', isFree: false },
      ],
    },
    {
      id: 's2',
      title: 'Hàm và Scope',
      lessons: [
        { id: 'l4', title: 'Function declaration vs expression', duration: '12:00', type: 'video', isFree: false },
        { id: 'l5', title: 'Arrow function', duration: '10:15', type: 'video', isFree: false },
        { id: 'l6', title: 'Closure là gì?', duration: '18:00', type: 'video', isFree: false },
      ],
    },
  ],
};
// src/features/courses/constants/index.ts

export const MOCK_LESSON_PROGRESS: LessonProgress[] = [
  { lessonId: 'l1', completed: true },
  { lessonId: 'l2', completed: true },
  { lessonId: 'l3', completed: false },
];