# 🎯 Quick Start Guide - Feature-Based Architecture

## 📖 Tổng quan

Cấu trúc này được thiết kế theo **4 tầng** để dễ dàng mở rộng:

```
Page/Route (app router) 
    ↓
Container (business logic + composition)
    ↓
Component (UI only) + Hook (state)
    ↓
Service (API calls)
```

---

## 🚀 Bước 1: Cài dependencies

```bash
cd /path/to/wecode
npm install axios  # Cần thêm
```

---

## 📝 Bước 2: Hiểu cấu trúc qua ví dụ

Xem các file ví dụ trong `/src/features/courses/`:

```
src/features/courses/
├── types/
│   └── example.ts          👈 Xem: Định nghĩa Course type
├── constants/
│   └── example.ts          👈 Xem: Constants
├── services/
│   └── example.ts          👈 Xem: Gọi API (pure function)
├── hooks/
│   └── example.ts          👈 Xem: Quản lý state
├── components/
│   └── example.tsx         👈 Xem: UI chỉ nhận props
└── containers/
    └── example.tsx         👈 Xem: Compose tất cả lại
```

---

## 💡 Bước 3: Quy trình implement feature

### Ví dụ: Tạo "Danh sách khóa học"

#### **Step 1: Types** - `src/features/courses/types/index.ts`

```typescript
// Định nghĩa interface cho data
export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  instructor: string;
  rating: number;
}
```

**Rules**:
- ✅ Định nghĩa interface/type cho data
- ✅ Export từ `index.ts` hoặc tệp cùng folder
- ❌ KHÔNG logic, KHÔNG component

---

#### **Step 2: Constants** - `src/features/courses/constants/index.ts`

```typescript
// Định nghĩa constants
export const COURSE_API_ENDPOINTS = {
  list: '/courses',
  detail: (id: string) => `/courses/${id}`,
};

export const COURSE_PAGE_SIZE = 12;
```

**Rules**:
- ✅ API endpoints, magic numbers
- ✅ Enum/constant values
- ❌ KHÔNG logic, KHÔNG fetch data

---

#### **Step 3: Service** - `src/features/courses/services/courseService.ts`

```typescript
// Pure API calls - KHÔNG state, KHÔNG component logic
import apiClient from '@/services/api';
import { Course } from '../types';

export async function fetchCourses(page: number = 1, limit: number = 12) {
  const response = await apiClient.get<Course[]>('/courses', {
    params: { page, limit },
  });
  return response.data;
}

export async function fetchCourseById(id: string) {
  const response = await apiClient.get<Course>(`/courses/${id}`);
  return response.data;
}
```

**Rules**:
- ✅ Chỉ `async function` gọi API
- ✅ Return raw data
- ✅ Tái sử dụng được
- ❌ KHÔNG state, KHÔNG hooks, KHÔNG component
- ❌ KHÔNG logic phức tạp (chỉ API calls)

---

#### **Step 4: Hook** - `src/features/courses/hooks/useCourses.ts`

```typescript
// Handle state + side-effect - gọi service để fetch
'use client';

import { useEffect, useState } from 'react';
import { Course } from '../types';
import * as courseService from '../services/courseService';

export function useCourses(page: number = 1) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await courseService.fetchCourses(page);
        setCourses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error');
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [page]);

  return { courses, loading, error };
}
```

**Rules**:
- ✅ Gọi service để fetch data
- ✅ Quản lý loading, error, data
- ✅ Tái sử dụng được
- ❌ KHÔNG component, KHÔNG API calls trực tiếp, KHÔNG styling

---

#### **Step 5: Component** - `src/features/courses/components/CourseCard.tsx`

```typescript
// Pure UI - chỉ nhận props và render
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onClick?: (courseId: string) => void;
}

export function CourseCard({ course, onClick }: CourseCardProps) {
  return (
    <div
      onClick={() => onClick?.(course.id)}
      className="p-4 border rounded cursor-pointer"
    >
      <h3 className="font-bold">{course.title}</h3>
      <p className="text-gray-600">{course.instructor}</p>
      <div className="mt-2 flex justify-between">
        <span>★ {course.rating}</span>
        <span className="font-bold">${course.price}</span>
      </div>
    </div>
  );
}
```

**Rules**:
- ✅ Props only: data + handlers
- ✅ Render UI
- ✅ Internal state OK (e.g., useState for tooltip)
- ✅ Tái sử dụng được
- ❌ KHÔNG gọi hooks logic, KHÔNG API, KHÔNG fetch data
- ❌ KHÔNG props drilling từ container (max 1-2 level deep)

---

#### **Step 6: Container** - `src/features/courses/containers/CoursesListContainer.tsx`

```typescript
// Compose tất cả lại - business logic + composition
'use client';

import { useState } from 'react';
import { useCourses } from '../hooks/useCourses';
import { CourseCard } from '../components/CourseCard';
import { Spinner } from '@/shared/ui';
import { useRouter } from 'next/navigation';

export function CoursesListContainer() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { courses, loading, error } = useCourses(page);

  if (error) return <div className="text-red-500">{error}</div>;
  if (loading) return <Spinner />;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            onClick={(id) => router.push(`/courses/${id}`)}
          />
        ))}
      </div>
      <div className="mt-4 flex gap-2 justify-center">
        <button onClick={() => setPage(p => Math.max(1, p - 1))}>Previous</button>
        <span>Page {page}</span>
        <button onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
}
```

**Rules**:
- ✅ Gọi hooks để lấy data
- ✅ Xử lý loading/error states
- ✅ Business logic (navigate, filter, etc)
- ✅ Compose UI components
- ❌ KHÔNG complex styling (chỉ layout)
- ❌ KHÔNG gọi API trực tiếp

---

#### **Step 7: Page/Route** - `src/app/courses/page.tsx`

```typescript
// Only compose container - NO logic, NO API calls
import { CoursesListContainer } from '@/features/courses/containers/CoursesListContainer';

export default function CoursesPage() {
  return <CoursesListContainer />;
}
```

**Rules**:
- ✅ Compose container
- ❌ KHÔNG component logic, KHÔNG API calls
- ❌ KHÔNG JSX phức tạp

---

## 🔄 Dependency Flow

```
🔝 Page (app/courses/page.tsx)
    ↓
📦 Container (containers/CoursesListContainer.tsx)
    ├─ Hook: useCourses()
    │   └─ Service: courseService.fetchCourses()
    │       └─ API: GET /courses
    │
    └─ Component: <CourseCard />
        └─ Props only
```

**Remember**: Tầng trên dùng tầng dưới, tầng dưới KHÔNG biết tầng trên!

---

## 🎨 Styling Tips

### ✅ ĐÚNG - Component xử lý styling

```tsx
export function CourseCard({ course }: Props) {
  return (
    <div className="rounded-lg p-4 shadow-md border">
      <h3>{course.title}</h3>
    </div>
  );
}
```

### ❌ SAI - Container xử lý styling

```tsx
export function CoursesListContainer() {
  return (
    <div className="grid grid-cols-3 gap-4 p-8"> {/* ❌ */}
      {/* */}
    </div>
  );
}
```

Styling là phần của **UI presentation**, nên để trong Component, không Container!

---

## 🐛 Common Mistakes

### ❌ Mistake 1: Component gọi Hook

```tsx
// ❌ SAI
function CourseCard() {
  const { courses } = useCourses(); // KHÔNG!
  return <div>{courses.map(...)}</div>;
}

// ✅ ĐÚNG
function CourseCard({ courses }: { courses: Course[] }) {
  return <div>{courses.map(...)}</div>;
}
```

---

### ❌ Mistake 2: Container gọi API trực tiếp

```tsx
// ❌ SAI
export function CoursesListContainer() {
  useEffect(() => {
    fetch('/api/courses') // KHÔNG!
      .then(res => res.json())
      .then(data => setCourses(data));
  }, []);
}

// ✅ ĐÚNG
export function CoursesListContainer() {
  const { courses } = useCourses(); // Dùng hook!
  return <CourseList courses={courses} />;
}
```

---

### ❌ Mistake 3: Service có state

```tsx
// ❌ SAI
let courseCache = []; // Global state!

export async function fetchCourses() {
  if (courseCache.length) return courseCache;
  // ...
}

// ✅ ĐÚNG - Service pure
export async function fetchCourses() {
  const response = await apiClient.get('/courses');
  return response.data;
}

// Hook quản lý cache nếu cần
export function useCourses() {
  const [courses, setCourses] = useState([]);
  // ...
  return { courses, loading, error };
}
```

---

### ❌ Mistake 4: Props drilling quá sâu

```tsx
// ❌ SAI - Drilling 4+ levels
<CoursesContainer />
  → <CoursesList courses={} onSelect={} />
    → <CourseItem course={} onSelect={} />
      → <CourseTitle title={} />
        → <TitleText text={} /> {/* Quá sâu! */}

// ✅ ĐÚNG - Max 2-3 levels
<CoursesContainer />
  → <CoursesList courses={} onSelect={} />
    → <CourseCard course={} onClick={} />
```

---

## 📦 Organizing Large Features

Nếu feature quá lớn, có thể tách nhỏ:

```
src/features/lessons/
├── containers/
│   ├── LessonContainer.tsx        # Main container
│   ├── VideoLessonContainer.tsx   # Video-specific
│   └── DocumentLessonContainer.tsx # Document-specific
├── components/
│   ├── lesson-viewer/
│   │   ├── VideoViewer.tsx
│   │   ├── DocumentViewer.tsx
│   │   └── index.ts
│   ├── lesson-sidebar/
│   │   ├── LessonList.tsx
│   │   ├── LessonProgress.tsx
│   │   └── index.ts
│   └── index.ts
└── hooks/
    ├── useLesson.ts
    ├── useLessonProgress.ts
    └── index.ts
```

---

## ✅ Checklist trước khi commit

- [ ] Container có `'use client'` nếu dùng hooks?
- [ ] Component nhận props, không gọi hooks logic?
- [ ] Service chỉ gọi API, không state?
- [ ] Hook gọi service, quản lý state?
- [ ] Types định nghĩa ở `types/index.ts`?
- [ ] Constants định nghĩa ở `constants/index.ts`?
- [ ] Imports dùng `@/` alias?
- [ ] Styling chỉ ở Component, không Container?

---

## 🔗 Useful Commands

```bash
# Dev server
npm run dev

# Build
npm run build

# Linting
npm run lint

# View project structure
tree src/ -I 'node_modules'
```

---

## 📚 Next Steps

1. **Xem file examples** trong `src/features/courses/`
2. **Implement Courses feature** bằng cách copy từ examples
3. **Implement Lessons feature** (video + document)
4. **Setup Auth** (login/register)
5. **Connect real backend** API

---

**Happy coding! 🚀**

