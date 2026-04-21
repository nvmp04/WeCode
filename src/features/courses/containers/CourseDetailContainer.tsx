// src/features/courses/containers/CourseDetailContainer.tsx
'use client';

import { useCourseDetail } from '../hooks/useCourseDetail';
import { useEnrollment } from '@/features/lessons/hooks/useEnrollment';
import { CourseHero } from '../components/CourseHero';
import { CourseContentAccordion } from '../components/CourseContentAccordion';
import { CourseSidebar } from '../components/CourseSidebar';

export function CourseDetailContainer({ slug }: { slug: string }) {
  const { course } = useCourseDetail(slug);
  const enrollment = useEnrollment(course!);

  if (!course) return <p className="p-10 text-center">Không tìm thấy khóa học.</p>;

  return (
    <>
      <CourseHero course={course} />

      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left */}
        <div className="lg:col-span-2 space-y-10">
          <section>
            <h2 className="text-xl font-bold mb-4">Bạn sẽ học được gì</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {course.whatYouLearn.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Yêu cầu</h2>
            <ul className="space-y-1">
              {course.requirements.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm">
                  <span>•</span><span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Nội dung khóa học</h2>
            <CourseContentAccordion sections={course.sections} />
          </section>
        </div>

        {/* Right — sidebar nhận enrollment */}
        <div className="lg:col-span-1">
          <CourseSidebar
            course={course}
            enrolled={enrollment.enrolled}
            onEnroll={enrollment.handleEnroll}
            onGoToLearn={enrollment.handleGoToLearn}
          />
        </div>
      </div>
    </>
  );
}