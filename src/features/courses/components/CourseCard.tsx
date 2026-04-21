
import { Course } from '../types';

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
      className="cursor-pointer rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow bg-white"
    >
      {/* Thumbnail */}
      <div className="relative">
        <img src={course.thumbnail} alt={course.title} className="w-full h-44 object-cover" />
        {course.isBestseller && (
          <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded">
            Bestseller
          </span>
        )}
        {discount && !isFree && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </span>
        )}
      </div>

      <div className="p-4 space-y-3">
        {/* Tags */}
        <div className="flex gap-2 flex-wrap">
          {course.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 line-clamp-2 leading-snug">{course.title}</h3>

        {/* Description */}
        <p className="text-sm text-gray-500 line-clamp-2">{course.description}</p>

        {/* Instructor */}
        <div className="flex items-center gap-2">
          <img src={course.instructor.avatar} alt={course.instructor.name}
            className="w-6 h-6 rounded-full object-cover bg-gray-200" />
          <span className="text-xs text-gray-500">{course.instructor.name}</span>
        </div>

        {/* Meta: level, lessons, duration */}
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span>{LEVEL_LABEL[course.level]}</span>
          <span>·</span>
          <span>{course.totalLessons} bài</span>
          <span>·</span>
          <span>{course.totalDuration}</span>
        </div>

        {/* Rating + students */}
        <div className="flex items-center gap-1 text-sm">
          <span className="text-yellow-500 font-bold">{course.rating}</span>
          <span className="text-yellow-400">★</span>
          <span className="text-gray-400 text-xs">({course.totalStudents.toLocaleString()} học viên)</span>
        </div>

        {/* Price Section */}
        <div className="flex items-center gap-2 pt-1">
          {isFree ? (
            <span className="text-lg font-bold text-green-600">Miễn phí</span>
          ) : (
            <>
              <span className="text-lg font-bold text-blue-600">
                {course.price.toLocaleString('vi-VN')}đ
              </span>
              {course.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {course.originalPrice.toLocaleString('vi-VN')}đ
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}