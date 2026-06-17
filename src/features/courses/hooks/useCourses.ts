// src/features/courses/hooks/useCourses.ts
'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { coursesService } from '../services/courseService';
import { CourseFilterState } from '../types';

export function useCourses() {
  const [filters, setFilters] = useState<CourseFilterState>({
    level: '',
    search: '',
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['courses', filters],
    queryFn: () => coursesService.getAll(filters),
  });

  return {
    courses: data?.data ?? [],
    meta: data?.meta,
    isLoading,
    error,
    filters,
    setFilters,
  };
}