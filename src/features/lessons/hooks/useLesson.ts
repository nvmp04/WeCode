// src/features/lessons/hooks/useLesson.ts
'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { lessonService } from '../services/lessonService';
import { MOCK_COURSE_DETAIL } from '@/features/courses/constants';
import { LessonTabType } from '../types';

export function useLesson(courseSlug: string, lessonId: string) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<LessonTabType>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Lấy lesson content từ API
  const { data: currentLesson, isLoading } = useQuery({
    queryKey: ['lesson', lessonId],
    queryFn: () => lessonService.getContent(lessonId),
    enabled: !!lessonId,
  });

  // Lấy course detail để có sections/lessons list
  // Tạm dùng mock, sau này dùng useCourseDetail
  const course = MOCK_COURSE_DETAIL;
  const allLessons = course.sections.flatMap((s) => s.lessons);
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = allLessons[currentIndex - 1] ?? null;
  const nextLesson = allLessons[currentIndex + 1] ?? null;

  // Mark complete mutation
  const { mutate: markCompleted } = useMutation({
    mutationFn: (id: string) => lessonService.markComplete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['progress'] });
    },
  });

  const navigateTo = (id: string) => {
    router.push(`/learn/${courseSlug}/${id}`);
  };

  return {
    course,
    currentLesson,
    isLoading,
    prevLesson,
    nextLesson,
    activeTab,
    setActiveTab,
    sidebarOpen,
    setSidebarOpen,
    markCompleted,
    navigateTo,
  };
}