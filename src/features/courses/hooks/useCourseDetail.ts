// src/features/courses/hooks/useCourseDetail.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { coursesService } from '../services/courseService';

export function useCourseDetail(slug: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['course', slug],
    queryFn: () => coursesService.getBySlug(slug),
    enabled: !!slug,
  });

  return { course: data, isLoading, error };
}