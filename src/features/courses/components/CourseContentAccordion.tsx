'use client';

import { useState } from 'react';
import { Section } from '../types';
import { ChevronDownIcon, ChevronUpIcon, PlayCircleIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export function CourseContentAccordion({ sections }: { sections: Section[] }) {
  const [openId, setOpenId] = useState<string>(sections[0]?.id);

  const toggleSection = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  return (
    <div className="border border-gray-300 rounded-sm">
      {sections.map((section) => {
        const isOpen = openId === section.id;
        
        return (
          <div key={section.id} className="border-b last:border-0 border-gray-300">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex justify-between items-center px-6 py-4 bg-[#f7f9fa] hover:bg-[#eceef0] transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                {isOpen ? (
                  <ChevronUpIcon className="w-4 h-4 text-gray-900 stroke-2" />
                ) : (
                  <ChevronDownIcon className="w-4 h-4 text-gray-900 stroke-2" />
                )}
                <span className="font-bold text-[#2d2f31]">{section.title}</span>
              </div>
              <div className="text-sm text-[#2d2f31]">
                <span>{section.lessons.length} bài giảng</span>
              </div>
            </button>

            {isOpen && (
              <ul className="bg-white">
                {section.lessons.map((lesson) => (
                  <li 
                    key={lesson.id} 
                    className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 group cursor-pointer"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      {lesson.isFree ? (
                        <PlayCircleIcon className="w-4 h-4 text-gray-900" />
                      ) : (
                        <LockClosedIcon className="w-4 h-4 text-gray-400" />
                      )}
                      <span className={`text-sm ${lesson.isFree ? 'text-[#2d2f31]' : 'text-gray-600'}`}>
                        {lesson.title}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 ml-4">
                      {lesson.isFree && (
                        <span className="text-sm text-[#5624d0] underline font-medium hover:text-[#3b198f]">
                          Xem thử
                        </span>
                      )}
                      <span className="text-sm text-gray-500 min-w-[40px] text-right">
                        {lesson.duration}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}