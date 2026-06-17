// src/features/courses/services/coursesService.ts
import { apiClient } from '@/shared/lib/axios';
import { CourseFilterState } from '../types';

export const coursesService = {
  getAll: async (filters: CourseFilterState) => {
    const params: any = {};
    if (filters.search) params.search = filters.search;
    if (filters.level) params.level = filters.level.toUpperCase();
    const res = await apiClient.get('/courses', { params });
    return res.data; // { data: Course[], meta: {...} }
  },

  getBySlug: async (slug: string) => {
    const res = await apiClient.get(`/courses/${slug}`);
    return res.data;
  },
};