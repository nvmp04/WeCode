// src/features/lessons/hooks/useEnrollment.ts
'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/store/authStore';
import { useEnrollmentStore } from '../store/enrollmentStore';
import { CourseDetail } from '@/features/courses/types';

export function useEnrollment(course: CourseDetail) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { enroll, isEnrolled } = useEnrollmentStore();

  const enrolled = isEnrolled(course.id);

  // Lấy lessonId đầu tiên của section đầu tiên
  const firstLessonId = course.sections[0]?.lessons[0]?.id;

  const handleEnroll = () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    enroll(course.id);
  };

  const handleGoToLearn = () => {
    if (firstLessonId) {
      router.push(`/learn/${course.slug}/${firstLessonId}`);
    }
  };

  return {
    enrolled,
    isAuthenticated,
    handleEnroll,
    handleGoToLearn,
  };
}