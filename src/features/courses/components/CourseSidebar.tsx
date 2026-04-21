// src/features/courses/components/CourseSidebar.tsx
import { Course } from '../types';

interface Props {
  course: Course;
  enrolled: boolean;
  onEnroll: () => void;
  onGoToLearn: () => void;
}

export function CourseSidebar({ course, enrolled, onEnroll, onGoToLearn }: Props) {
  const isFree = course.price === 0;

  return (
    <div className="border rounded-xl p-6 sticky top-6 space-y-4 bg-white shadow-sm">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full rounded-lg object-cover"
        onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400?text=Course' }}
      />

      {/* Giá */}
      {!enrolled && (
        <div className="flex items-center gap-3">
          {isFree ? (
            <span className="text-3xl font-bold text-green-600">Miễn phí</span>
          ) : (
            <>
              <span className="text-3xl font-bold">
                {course.price.toLocaleString('vi-VN')}đ
              </span>
              {course.originalPrice && (
                <span className="text-gray-400 line-through text-lg">
                  {course.originalPrice.toLocaleString('vi-VN')}đ
                </span>
              )}
            </>
          )}
        </div>
      )}

      {/* CTA — 3 trường hợp */}
      {enrolled ? (
        <button
          onClick={onGoToLearn}
          className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
        >
          Tham gia khóa học →
        </button>
      ) : isFree ? (
        <button
          onClick={onEnroll}
          className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
        >
          Đăng ký học ngay
        </button>
      ) : (
        <>
          <button
            onClick={onEnroll}
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Mua ngay
          </button>
          <button className="w-full py-3 border border-gray-300 font-medium rounded-lg hover:bg-gray-50 transition-colors">
            Thêm vào giỏ
          </button>
        </>
      )}

      {/* Bao gồm */}
      <div className="pt-2">
        <p className="font-bold text-sm mb-2">Khóa học này bao gồm:</p>
        <ul className="text-sm text-gray-600 space-y-2">
          <li className="flex items-center gap-2">
            <span className="text-blue-500">✓</span> {course.totalLessons} bài học
          </li>
          <li className="flex items-center gap-2">
            <span className="text-blue-500">✓</span> {course.totalDuration} video bài giảng
          </li>
          <li className="flex items-center gap-2">
            <span className="text-blue-500">✓</span> Truy cập vĩnh viễn
          </li>
          <li className="flex items-center gap-2">
            <span className="text-blue-500">✓</span> Học trên mọi thiết bị
          </li>
          {isFree && (
            <li className="flex items-center gap-2">
              <span className="text-blue-500">✓</span> Tài liệu đính kèm miễn phí
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}