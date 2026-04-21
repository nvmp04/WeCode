// src/features/courses/hooks/useCourses.ts
// Hook: Gọi service để fetch data, quản lý loading/error/data state
// Có thể tái sử dụng ở nhiều component

'use client';

import { useEffect, useState } from 'react';
import { Course } from '../types';
import * as courseService from '../services/courseService';

interface UseFavCoursesReturn {
  courses: Course[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook để fetch danh sách khóa học
 */
export function useCourses(
  page: number = 1,
  limit: number = 12,
  filters?: { level?: string; search?: string }
): UseFavCoursesReturn {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await courseService.fetchCourses(page, limit, filters);
      setCourses(data.courses);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [page, limit, filters?.level, filters?.search]);

  return { courses, loading, error, refetch: fetchCourses };
}

/**
 * Hook để fetch chi tiết khóa học
 */
export function useCourseDetail(courseId: string) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) return;

    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await courseService.fetchCourseById(courseId);
        setCourse(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch course');
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [courseId]);

  return { course, loading, error };
}
