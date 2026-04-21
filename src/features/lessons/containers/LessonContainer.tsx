// src/features/lessons/containers/LessonContainer.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useLesson } from '../hooks/useLesson';
import { VideoPlayer } from '../components/VideoPlayer';
import { LessonSidebar } from '../components/LessonSidebar';
import { LessonTabs } from '../components/LessonTabs';

interface Props {
  courseSlug: string;
  lessonId: string;
}

export function LessonContainer({ courseSlug, lessonId }: Props) {
  const router = useRouter();
  const {
    course, currentLesson, nextLesson, prevLesson,
    activeTab, setActiveTab,
    sidebarOpen, setSidebarOpen,
    markCompleted, isCompleted,
  } = useLesson(courseSlug, lessonId);

  const navigateTo = (id: string) => {
    router.push(`/learn/${courseSlug}/${id}`);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push(`/courses/${courseSlug}`)}>← Quay lại</button>
          <span className="font-medium text-sm">{course.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => prevLesson && navigateTo(prevLesson.id)}
            disabled={!prevLesson}
            className="text-sm px-3 py-1 border rounded disabled:opacity-40"
          >
            ← Bài trước
          </button>
          <button
            onClick={() => {
              markCompleted(currentLesson.id);
              if (nextLesson) navigateTo(nextLesson.id);
            }}
            className="text-sm px-3 py-1 bg-blue-600 text-white rounded"
          >
            {nextLesson ? 'Hoàn thành & tiếp theo →' : 'Hoàn thành khóa học ✓'}
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-sm px-3 py-1 border rounded"
          >
            {sidebarOpen ? 'Ẩn nội dung' : 'Hiện nội dung'}
          </button>
        </div>
      </div>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: video + tabs */}
        <div className="flex-1 overflow-y-auto">
          <VideoPlayer lesson={currentLesson} />
          <LessonTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            lesson={currentLesson}
          />
        </div>

        {/* Right: sidebar */}
        {sidebarOpen && (
          <div className="w-80 shrink-0 overflow-hidden">
            <LessonSidebar
              sections={course.sections}
              currentLessonId={currentLesson.id}
              isCompleted={isCompleted}
              onLessonClick={navigateTo}
            />
          </div>
        )}
      </div>
    </div>
  );
}