// src/features/lessons/store/enrollmentStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Enrollment } from '../types';

interface EnrollmentStore {
  enrollments: Enrollment[];
  enroll: (courseId: string) => void;
  isEnrolled: (courseId: string) => boolean;
}

export const useEnrollmentStore = create<EnrollmentStore>()(
  persist(
    (set, get) => ({
      enrollments: [],
      enroll: (courseId) =>
        set((state) => ({
          enrollments: [
            ...state.enrollments,
            { courseId, enrolledAt: new Date().toISOString() },
          ],
        })),
      isEnrolled: (courseId) =>
        get().enrollments.some((e) => e.courseId === courseId),
    }),
    { name: 'enrollment-storage' }
  )
);
// Sau này: bỏ store, gọi API GET /enrollments/check/:courseId