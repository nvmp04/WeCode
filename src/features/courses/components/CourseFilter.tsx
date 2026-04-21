// src/features/courses/components/CourseFilter.tsx
import { LEVEL_OPTIONS } from '../constants';
import { CourseFilterState, CourseLevel } from '../types';

interface Props {
  filters: CourseFilterState;
  onChange: (filters: CourseFilterState) => void;
}

export function CourseFilter({ filters, onChange }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-8">
      {/* Search */}
      <input
        type="text"
        placeholder="Tìm khóa học..."
        value={filters.search}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 transition-colors"
      />

      {/* Level filter — render từ LEVEL_OPTIONS */}
      <div className="flex gap-2 flex-wrap">
        {LEVEL_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange({ ...filters, level: opt.value as CourseLevel | '' })}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors
              ${filters.level === opt.value
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400'
              }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}