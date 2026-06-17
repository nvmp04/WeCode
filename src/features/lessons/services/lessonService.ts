// src/features/lessons/services/lessonService.ts
import { apiClient } from '@/shared/lib/axios';

export const lessonService = {
  getById: async (lessonId: string) => {
    const res = await apiClient.get(`/lessons/${lessonId}`);
    return res.data;
  },

  getContent: async (lessonId: string) => {
    const res = await apiClient.get(`/lessons/${lessonId}/content`);
    return res.data;
  },

  markComplete: async (lessonId: string) => {
    const res = await apiClient.post(`/lessons/${lessonId}/complete`);
    return res.data;
  },

  getProgress: async (courseId: string) => {
    const res = await apiClient.get(`/lessons/progress/${courseId}`);
    return res.data;
  },
};