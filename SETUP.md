# WeCode - Course Learning Platform

Platform bán khóa học lập trình (MVP) với hỗ trợ **video lessons** (YouTube private) và **document lessons**.

## 🚀 Stack

- **Framework**: Next.js 16.2 + App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **HTTP Client**: Axios (cần cài thêm)
- **State**: Custom hooks + context (tùy nhu cầu)

## 📋 Features MVP

- [ ] **Course Management**
  - [ ] Danh sách khóa học
  - [ ] Chi tiết khóa học
  - [ ] Phân loại/tìm kiếm

- [ ] **Lessons (2 types)**
  - [ ] Video Lesson (YouTube private links)
  - [ ] Document Lesson (HTML, Markdown)

- [ ] **Auth** (optional)
  - [ ] Login
  - [ ] Register
  - [ ] Progress tracking

- [ ] **Future**: Compiler (code editor + execution)

## ⚙️ Setup

1. **Install dependencies**
```bash
npm install
npm install axios  # Thêm axios cho API calls
```

2. **Environment variables** (tạo `.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
# Backend API URL của bạn
```

3. **Run dev server**
```bash
npm run dev
```

4. **Open browser**
```
http://localhost:3000
```

## 📁 Project Structure

Xem [ARCHITECTURE.md](./ARCHITECTURE.md) để hiểu chi tiết về cấu trúc 4 tầng:

```
src/
├── app/              # Routes (Next.js App Router)
├── features/         # Feature modules (courses, lessons, auth)
├── shared/           # Shared UI, hooks, utilities
├── services/         # Global API services
├── types/            # Global types
└── constants/        # Global constants
```

## 🎯 Quy tắc Architecture

### **Tầng 1: Page/Route** (`app/`)
- ✅ Compose Container
- ❌ Không JSX phức tạp, không gọi API

### **Tầng 2: Container** (`features/[name]/containers/`)
- ✅ Business logic, gọi hooks
- ❌ Không styling phức tạp, không API trực tiếp

### **Tầng 3: Component** (`features/[name]/components/` + `shared/ui/`)
- ✅ Props only, render
- ❌ Không hooks logic, không API

### **Tầng 4: Hook + Service** (`hooks/` + `services/`)
- ✅ Hook: state + side-effect
- ✅ Service: API calls thuần túy

## 📝 Workflow

### Thêm feature mới

1. **Tạo thư mục feature**
```bash
mkdir -p src/features/myfeature/{containers,components,hooks,services,types,constants}
```

2. **Định nghĩa types** → `types/index.ts`
3. **Viết Service** (API calls) → `services/myService.ts`
4. **Viết Hook** (state) → `hooks/useMyFeature.ts`
5. **Viết Components** (UI) → `components/MyComponent.tsx`
6. **Viết Container** (compose) → `containers/MyContainer.tsx`
7. **Thêm Route** → `app/myfeature/page.tsx`

### Ví dụ: Thêm "My Courses" feature

```tsx
// 1. Type: src/features/myCourses/types/index.ts
export interface MyCourse {
  courseId: string;
  progress: number;
  enrolledAt: string;
}

// 2. Service: src/features/myCourses/services/myCoursesService.ts
export async function fetchMyCourses() {
  const res = await apiClient.get('/me/courses');
  return res.data;
}

// 3. Hook: src/features/myCourses/hooks/useMyCourses.ts
export function useMyCourses() {
  const [courses, setCourses] = useState<MyCourse[]>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await myCoursesService.fetchMyCourses();
      setCourses(data);
      setLoading(false);
    };
    load();
  }, []);
  
  return { courses, loading };
}

// 4. Component: src/features/myCourses/components/MyCoursesList.tsx
export function MyCoursesList({ courses, loading }: Props) {
  if (loading) return <Spinner />;
  return <div>{courses.map(c => <CourseCard key={c.courseId} {...c} />)}</div>;
}

// 5. Container: src/features/myCourses/containers/MyCoursesContainer.tsx
export function MyCoursesContainer() {
  const { courses, loading } = useMyCourses();
  return <MyCoursesList courses={courses} loading={loading} />;
}

// 6. Route: src/app/dashboard/my-courses/page.tsx
import { MyCoursesContainer } from '@/features/myCourses/containers/MyCoursesContainer';

export default function MyCoursesPage() {
  return <MyCoursesContainer />;
}
```

## 🎨 Styling

- **Tailwind CSS** → Chỉ dùng trong UI Components
- **No inline CSS** - Dùng className + Tailwind
- **Container không styling** - chỉ composition

```tsx
// ✅ ĐÚNG (Component)
export function CourseCard() {
  return (
    <div className="rounded-lg border p-4 shadow-md">
      {/* ... */}
    </div>
  );
}

// ❌ SAI (Container)
export function CoursesListContainer() {
  return (
    <div className="grid grid-cols-3 gap-4"> {/* ❌ Styling */}
      {/* ... */}
    </div>
  );
}
```

## 🔗 API Integration

### Setup Axios client

```tsx
// src/services/api.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

// Interceptors for auth, error handling
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle logout
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

### Use in Service

```tsx
// src/features/courses/services/courseService.ts
import apiClient from '@/services/api';

export async function fetchCourses() {
  const response = await apiClient.get('/courses');
  return response.data;
}

export async function fetchCourseById(id: string) {
  const response = await apiClient.get(`/courses/${id}`);
  return response.data;
}
```

## 🧪 Testing (Optional)

```bash
npm install --save-dev jest @testing-library/react
```

## 📚 Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Follow architecture guidelines in [ARCHITECTURE.md](./ARCHITECTURE.md)
2. Keep components small and reusable
3. Keep services pure (no side effects)
4. Use TypeScript for type safety
5. Use `@/` path alias for imports

## 📄 License

MIT

---

**Happy Coding! 🚀**
