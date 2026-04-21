// src/features/lessons/components/LessonSidebar.tsx
'use client';
import { LessonProgress } from '@/features/lessons/types'
import { Section } from '@/features/courses/types';

interface Props {
  sections: Section[];
  currentLessonId: string;
  isCompleted: (id: string) => boolean;
  onLessonClick: (lessonId: string) => void;
}

export function LessonSidebar({ sections, currentLessonId, isCompleted, onLessonClick }: Props) {
  return (
    <div className="h-full overflow-y-auto border-l">
      <div className="p-4 font-bold border-b">Nội dung khóa học</div>
      {sections.map((section) => (
        <div key={section.id}>
          <div className="px-4 py-2 bg-gray-50 text-sm font-medium">
            {section.title}
          </div>
          {section.lessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => onLessonClick(lesson.id)}
              className={`w-full text-left px-4 py-3 text-sm border-b flex items-start gap-2 hover:bg-gray-50
                ${lesson.id === currentLessonId ? 'bg-blue-50 border-l-2 border-l-blue-500' : ''}`}
            >
              <span className="mt-0.5 shrink-0">
                {isCompleted(lesson.id) ? '✓' : '○'}
              </span>
              <div>
                <p className={lesson.id === currentLessonId ? 'font-medium' : ''}>
                  {lesson.title}
                </p>
                <p className="text-gray-400 text-xs mt-0.5">{lesson.duration}</p>
              </div>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}