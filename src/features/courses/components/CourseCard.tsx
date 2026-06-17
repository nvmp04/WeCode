import { Course } from '../types';
import { StarIcon, UsersIcon, PlayIcon, ClockIcon } from '@heroicons/react/20/solid';

interface Props {
  course: Course;
  onClick: (slug: string) => void;
}

const LEVEL_LABEL = {
  beginner: 'Cơ bản',
  intermediate: 'Trung cấp',
  advanced: 'Nâng cao',
};

export function CourseCard({ course, onClick }: Props) {
  const isFree = course.price === 0;
  const discount = course.originalPrice && !isFree
    ? Math.round((1 - course.price / course.originalPrice) * 100)
    : null;

  return (
    <div
      onClick={() => onClick(course.slug)}
      className="group cursor-pointer rounded-sm border border-[var(--border)] overflow-hidden hover:shadow-md transition-all bg-[var(--card-bg)] flex flex-col h-full"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
        
        {course.isBestseller && (
          <span className="absolute top-2 left-2 bg-[#eceb98] text-[#3d3c0a] text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
            Bestseller
          </span>
        )}
        
        {discount && !isFree && (
          <span className="absolute top-2 right-2 bg-[#f33] text-white text-xs font-bold px-2 py-1">
            -{discount}%
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow space-y-2">
        <h3 className="font-bold text-[var(--foreground)] text-base line-clamp-2 leading-snug h-12">
          {course.title}
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 truncate">{course.instructor.name}</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-[#b4690e] font-bold text-sm">{course.rating.toFixed(1)}</span>
          <div className="flex text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className={`w-3 h-3 ${i < Math.floor(course.rating) ? 'fill-current' : 'text-gray-300'}`} />
            ))}
          </div>
          <span className="text-gray-400 text-xs">({course.totalStudents.toLocaleString()})</span>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-500 pt-1">
          <div className="flex items-center gap-1">
            <PlayIcon className="w-3 h-3" />
            <span>{course.totalLessons} bài</span>
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon className="w-3 h-3" />
            <span>{course.totalDuration}</span>
          </div>
          <span>{LEVEL_LABEL[course.level]}</span>
        </div>

        <div className="flex items-center gap-2 pt-2 mt-auto">
          {isFree ? (
            <span className="text-lg font-bold text-[var(--foreground)]">Miễn phí</span>
          ) : (
            <>
              <span className="text-lg font-bold text-[var(--foreground)]">
                {course.price.toLocaleString('vi-VN')}₫
              </span>
              {course.originalPrice && (
                <span className="text-sm text-gray-400 line-through decoration-gray-400">
                  {course.originalPrice.toLocaleString('vi-VN')}₫
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}