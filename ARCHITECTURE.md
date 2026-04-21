# Project Structure - Feature-Based Architecture

## 🎯 Kiến trúc 4 tầng

### 1️⃣ **Page/Route** (`src/app/`)
- **Trách nhiệm**: Chỉ compose các Container
- **Quy tắc**: 
  - ❌ KHÔNG có JSX phức tạp
  - ❌ KHÔNG gọi API trực tiếp
  - ✅ Chỉ import và render Container

```tsx
// ✅ ĐÚNG
export default function CoursesPage() {
  return <CoursesListContainer />;
}

// ❌ SAI
export default function CoursesPage() {
  const [courses, setCourses] = useState();
  useEffect(() => {
    fetch('/api/courses').then(...);
  }, []);
  return <div>{courses.map(...)}</div>;
}
```

---

### 2️⃣ **Container (Feature)** (`src/features/[name]/containers/`)
- **Trách nhiệm**: 
  - Gọi hooks để lấy dữ liệu
  - Xử lý business logic
  - Truyền data xuống UI components
- **Quy tắc**:
  - ❌ KHÔNG có styling phức tạp
  - ❌ KHÔNG render UI trực tiếp (chỉ compose components)
  - ✅ Chỉ logic + composition

```tsx
// ✅ ĐÚNG
'use client';

export function CoursesListContainer() {
  const { courses, loading, error } = useCourses();
  
  return (
    <div>
      <CourseList courses={courses} loading={loading} error={error} />
    </div>
  );
}

// ❌ SAI (styling phức tạp)
export function CoursesListContainer() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* ... */}
    </div>
  );
}
```

---

### 3️⃣ **UI Component** (`src/features/[name]/components/` + `src/shared/ui/`)
- **Trách nhiệm**: Chỉ nhận props và render
- **Quy tắc**:
  - ✅ Props duy nhất (data + handlers)
  - ✅ Tái sử dụng được
  - ❌ KHÔNG biết API tồn tại
  - ❌ KHÔNG gọi hooks (trừ UI hooks như useState)
  - ❌ KHÔNG logic business

```tsx
// ✅ ĐÚNG
interface CourseListProps {
  courses: Course[];
  loading: boolean;
  error?: string;
  onCourseClick: (courseId: string) => void;
}

export function CourseList({ courses, loading, error, onCourseClick }: CourseListProps) {
  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500">{error}</div>;
  
  return (
    <div>
      {courses.map(course => (
        <CourseCard key={course.id} course={course} onClick={onCourseClick} />
      ))}
    </div>
  );
}

// ❌ SAI (có hooks, logic)
export function CourseList() {
  const courses = useCourses(); // ❌ Không được
  return <div>{courses.map(...)}</div>;
}
```

---

### 4️⃣ **Hook + Service** (`src/features/[name]/hooks/` + `src/features/[name]/services/`)

#### **Service** - API thuần túy
- Chỉ gọi API, trả về Promise
- Không có state, không có side-effect
- Tái sử dụng được

```tsx
// src/features/courses/services/courseService.ts
export async function fetchCourses() {
  const response = await apiClient.get('/courses');
  return response.data;
}

export async function fetchCourseById(id: string) {
  const response = await apiClient.get(`/courses/${id}`);
  return response.data;
}
```

#### **Hook** - State + Side-effect
- Gọi service để fetch data
- Quản lý loading, error, data state
- Tái sử dụng được

```tsx
// src/features/courses/hooks/useCourses.ts
export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await courseService.fetchCourses();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { courses, loading, error };
}
```

---

## 📁 Cấu trúc Folder

```
src/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Home page (compose Container)
│   ├── layout.tsx                # Root layout
│   ├── auth/
│   │   ├── layout.tsx
│   │   ├── login/page.tsx        # Compose LoginContainer
│   │   └── register/page.tsx     # Compose RegisterContainer
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── courses/
│   │   ├── page.tsx              # Courses catalog
│   │   └── [courseId]/
│   │       ├── layout.tsx
│   │       ├── page.tsx          # Course overview
│   │       └── lessons/[lessonId]/
│   │           └── page.tsx      # Lesson page (compose LessonContainer)
│   └── globals.css
│
├── features/                     # Feature modules
│   ├── courses/                  # Course feature
│   │   ├── containers/
│   │   │   └── CoursesListContainer.tsx
│   │   ├── components/
│   │   │   ├── CourseCard.tsx
│   │   │   ├── CourseList.tsx
│   │   │   └── CourseFilter.tsx
│   │   ├── hooks/
│   │   │   ├── useCourses.ts
│   │   │   └── useCourseDetail.ts
│   │   ├── services/
│   │   │   └── courseService.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── constants/
│   │       └── index.ts
│   │
│   ├── lessons/                  # Lesson feature (2 types: video, document)
│   │   ├── containers/
│   │   │   ├── LessonContainer.tsx
│   │   │   ├── VideoLessonContainer.tsx
│   │   │   └── DocumentLessonContainer.tsx
│   │   ├── components/
│   │   │   ├── LessonPlayer.tsx
│   │   │   ├── VideoLesson.tsx
│   │   │   ├── DocumentLesson.tsx
│   │   │   ├── LessonNavigation.tsx
│   │   │   └── LessonProgress.tsx
│   │   ├── hooks/
│   │   │   ├── useLesson.ts
│   │   │   └── useLessonProgress.ts
│   │   ├── services/
│   │   │   └── lessonService.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── constants/
│   │       └── index.ts
│   │
│   └── auth/                     # Auth feature
│       ├── containers/
│       │   ├── LoginContainer.tsx
│       │   └── RegisterContainer.tsx
│       ├── components/
│       │   ├── LoginForm.tsx
│       │   └── RegisterForm.tsx
│       ├── hooks/
│       │   └── useAuth.ts
│       ├── services/
│       │   └── authService.ts
│       ├── types/
│       │   └── index.ts
│       └── constants/
│           └── index.ts
│
├── shared/                       # Shared utilities & components
│   ├── ui/                       # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Spinner.tsx
│   │   └── index.ts
│   ├── hooks/
│   │   └── useAsync.ts           # Generic async hook
│   ├── utils/
│   │   └── apiClient.ts          # Axios wrapper
│   ├── types/
│   │   └── api.ts                # Shared API types
│   └── constants/
│       └── index.ts
│
├── services/                     # Global services
│   ├── api.ts                    # Axios instance
│   └── config.ts                 # API config
│
├── types/                        # Global types
│   ├── index.ts
│   ├── course.ts
│   ├── lesson.ts
│   └── user.ts
│
└── constants/                    # Global constants
    └── index.ts
```

---

## 🔄 Quy tắc Dependency

```
Page/Route
    ↓
Container (Feature)
    ↓
Component + Hook
    ↓
Service (API calls)
```

**Quy tắc**: **Tầng trên dùng tầng dưới, tầng dưới KHÔNG biết tầng trên tồn tại**

```
✅ ĐÚNG:
- Container dùng Hook, Component
- Hook dùng Service
- Component nhận props từ Container

❌ SAI:
- Component gọi Hook
- Hook gọi Component
- Service gọi Hook/Component
```

---

## 🚀 Cách mở rộng

### Thêm feature mới (ví dụ: Compiler)
```
src/features/compiler/
├── containers/
│   └── CompilerContainer.tsx
├── components/
│   ├── CodeEditor.tsx
│   ├── ConsoleOutput.tsx
│   └── CompilerControls.tsx
├── hooks/
│   └── useCompiler.ts
├── services/
│   └── compilerService.ts
├── types/
│   └── index.ts
└── constants/
    └── index.ts

# Thêm route
src/app/courses/[courseId]/lessons/[lessonId]/compiler/page.tsx
```

### Thêm UI component mới
```
# Chung cho toàn app
src/shared/ui/Textarea.tsx

# Chỉ cho feature nào đó
src/features/lessons/components/SubtitleList.tsx
```

---

## 📝 Quy ước Naming

| Loại | Pattern | Ví dụ |
|------|---------|-------|
| Container | `[Feature]Container.tsx` | `CoursesListContainer.tsx` |
| Component | `[PascalCase].tsx` | `CourseCard.tsx` |
| Hook | `use[Feature].ts` | `useCourses.ts` |
| Service | `[featureName]Service.ts` | `courseService.ts` |
| Type | `index.ts` hoặc `[name].ts` | `types/index.ts` |
| Constant | `index.ts` | `constants/index.ts` |

---

## 💡 Best Practices

1. **Một Container per trang/feature**
2. **UI Components nhỏ, tái sử dụng được**
3. **Hooks chỉ fetch + manage state**
4. **Services chỉ API calls**
5. **Types tập trung tại top level**
6. **Props drilling qua component là bình thường**
7. **Tạo Context/State Manager khi cần shared state giữa nhiều feature**

---

## 🔗 Alias Path (đã cấu hình)

```json
{
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

**Dùng**:
```tsx
import { Button } from '@/shared/ui';
import { useCourses } from '@/features/courses/hooks/useCourses';
import { courseService } from '@/features/courses/services/courseService';
```

---

## 📦 Dependencies cần cài

```bash
npm install axios react-query  # Nếu dùng React Query
# hoặc
npm install axios              # Chỉ axios
```

---

## ✅ Checklist khi code

- [ ] Container: chỉ compose + pass props?
- [ ] Component: nhận props, render, không logic?
- [ ] Hook: gọi service, manage state?
- [ ] Service: API calls thuần túy?
- [ ] Imports: dùng alias `@/`?
- [ ] Types: định nghĩa ở `features/[name]/types` hoặc `types/`?

