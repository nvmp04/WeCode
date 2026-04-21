// src/features/lessons/types/index.ts
export type LessonType = 'video' | 'document';
export type LessonTabType = 'overview' | 'content';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: LessonType;
  isFree: boolean;
  youtubeId?: string;
  cloudflareVideoId?: string;
  documentUrl?: string;
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
}

export interface Enrollment {
  courseId: string;
  enrolledAt: string;
}