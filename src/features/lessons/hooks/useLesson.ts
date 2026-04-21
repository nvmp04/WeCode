// src/features/lessons/hooks/useLesson.ts
'use client';

import { useState } from 'react';
import { MOCK_COURSE_DETAIL, MOCK_LESSON_PROGRESS } from '@/features/courses/constants';
import { Lesson, LessonTabType, LessonProgress } from '@/features/courses/types';

export function useLesson(courseSlug: string, lessonId: string) {
  const [activeTab, setActiveTab] = useState<LessonTabType>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [progress, setProgress] = useState<LessonProgress[]>(MOCK_LESSON_PROGRESS);

  const course = MOCK_COURSE_DETAIL;
  const allLessons = course.sections.flatMap((s) => s.lessons);
  const currentLesson = allLessons.find((l) => l.id === lessonId) ?? allLessons[0];
  const currentIndex = allLessons.indexOf(currentLesson);
  const prevLesson = allLessons[currentIndex - 1] ?? null;
  const nextLesson = allLessons[currentIndex + 1] ?? null;

  const markCompleted = (id: string) => {
    setProgress((prev) =>
      prev.map((p) => p.lessonId === id ? { ...p, completed: true } : p)
    );
  };

  const isCompleted = (id: string) =>
    progress.find((p) => p.lessonId === id)?.completed ?? false;

  return {
    course,
    currentLesson,
    prevLesson,
    nextLesson,
    activeTab,
    setActiveTab,
    sidebarOpen,
    setSidebarOpen,
    markCompleted,
    isCompleted,
  };
}