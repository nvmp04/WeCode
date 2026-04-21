// src/features/lessons/components/LessonTabs.tsx
import { LessonTabType, Lesson } from '@/features/lessons/types';

interface Props {
  activeTab: LessonTabType;
  onTabChange: (tab: LessonTabType) => void;
  lesson: Lesson;
}

export function LessonTabs({ activeTab, onTabChange, lesson }: Props) {
  return (
    <div>
      <div className="flex border-b">
        {(['overview', 'content'] as LessonTabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors
              ${activeTab === tab
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            {tab === 'overview' ? 'Tổng quan' : 'Nội dung khóa học'}
          </button>
        ))}
      </div>
      <div className="p-6">
        {activeTab === 'overview' && (
          <div>
            <h3 className="font-bold text-lg mb-2">{lesson.title}</h3>
            <p className="text-gray-500 text-sm">Thời lượng: {lesson.duration}</p>
          </div>
        )}
        {activeTab === 'content' && (
          <p className="text-sm text-gray-500">Xem sidebar bên phải để điều hướng bài học.</p>
        )}
      </div>
    </div>
  );
}