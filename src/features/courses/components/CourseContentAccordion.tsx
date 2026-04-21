// src/features/courses/components/CourseContentAccordion.tsx
'use client';

import { useState } from 'react';
import { Section } from '../types';

export function CourseContentAccordion({ sections }: { sections: Section[] }) {
  const [openId, setOpenId] = useState<string>(sections[0]?.id);

  return (
    <div className="border rounded-lg overflow-hidden">
      {sections.map((section) => (
        <div key={section.id} className="border-b last:border-0">
          <button
            onClick={() => setOpenId(openId === section.id ? '' : section.id)}
            className="w-full flex justify-between items-center px-4 py-3 font-medium text-left bg-gray-50 hover:bg-gray-100"
          >
            <span>{section.title}</span>
            <span className="text-sm text-gray-400">
              {section.lessons.length} bài · {openId === section.id ? '▲' : '▼'}
            </span>
          </button>

          {openId === section.id && (
            <ul>
              {section.lessons.map((lesson) => (
                <li key={lesson.id} className="flex items-center justify-between px-4 py-2 text-sm border-t">
                  <div className="flex items-center gap-2">
                    {lesson.isFree
                      ? <span className="text-blue-500">▶</span>
                      : <span className="text-gray-400">🔒</span>
                    }
                    <span className={lesson.isFree ? 'text-blue-500' : 'text-gray-700'}>
                      {lesson.title}
                    </span>
                    {lesson.isFree && (
                      <span className="text-xs px-1.5 py-0.5 border border-blue-400 text-blue-500 rounded">
                        Xem thử
                      </span>
                    )}
                  </div>
                  <span className="text-gray-400">{lesson.duration}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}