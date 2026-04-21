// src/features/courses/types/index.ts
import { Lesson } from '@/features/lessons/types';

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Instructor {
  name: string;
  avatar: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  originalPrice?: number;
  level: CourseLevel;
  totalLessons: number;
  totalDuration: string;
  rating: number;
  totalStudents: number;
  instructor: Instructor;
  tags: string[];
  isBestseller?: boolean;
  updatedAt: string;
}

export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];           // import từ lessons feature
}

export interface CourseDetail extends Course {
  previewVideoId: string;
  whatYouLearn: string[];
  requirements: string[];
  sections: Section[];
}

export interface CourseFilterState {
  level: CourseLevel | '';
  search: string;
}