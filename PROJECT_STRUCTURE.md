# Project Structure Tree

```
wecode/
├── 📄 ARCHITECTURE.md          👈 Đọc: Chi tiết cấu trúc 4 tầng
├── 📄 SETUP.md                 👈 Đọc: Hướng dẫn setup
├── 📄 QUICK_START.md           👈 Đọc: Bước-by-bước implement
│
├── src/
│   ├── app/                    # 🔝 TẦNG 1: Next.js Routes (App Router)
│   │   ├── page.tsx            # Home page - ONLY compose Container
│   │   ├── layout.tsx          # Root layout
│   │   ├── globals.css
│   │   ├── auth/
│   │   │   ├── layout.tsx
│   │   │   ├── login/page.tsx          ✅ → LoginContainer
│   │   │   └── register/page.tsx       ✅ → RegisterContainer
│   │   ├── dashboard/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx                ✅ → CoursesListContainer
│   │   └── courses/
│   │       ├── page.tsx                ✅ → CoursesListContainer
│   │       └── [courseId]/
│   │           ├── layout.tsx
│   │           ├── page.tsx            ✅ → CourseDetailContainer
│   │           └── lessons/[lessonId]/
│   │               └── page.tsx        ✅ → LessonContainer
│   │
│   ├── features/                # 🏗️ TẦNG 2-4: Feature Modules
│   │   │
│   │   ├── courses/             # Feature: Courses
│   │   │   ├── index.ts         📤 Export all
│   │   │   ├── types/
│   │   │   │   ├── index.ts     📄 (RỖNG - add your types)
│   │   │   │   └── example.ts   👀 EXAMPLE
│   │   │   ├── constants/
│   │   │   │   ├── index.ts     📄 (RỖNG)
│   │   │   │   └── example.ts   👀 EXAMPLE
│   │   │   ├── services/
│   │   │   │   ├── courseService.ts     📄 (RỖNG)
│   │   │   │   └── example.ts           👀 EXAMPLE: Pure API calls
│   │   │   ├── hooks/
│   │   │   │   ├── useCourses.ts        📄 (RỖNG)
│   │   │   │   └── example.ts           👀 EXAMPLE: State management
│   │   │   ├── components/
│   │   │   │   ├── CourseCard.tsx       📄 (RỖNG)
│   │   │   │   ├── CourseList.tsx       📄 (RỖNG)
│   │   │   │   ├── CourseFilter.tsx     📄 (RỖNG)
│   │   │   │   └── example.tsx          👀 EXAMPLE: UI only
│   │   │   └── containers/
│   │   │       ├── CoursesListContainer.tsx  📄 (RỖNG)
│   │   │       └── example.tsx               👀 EXAMPLE: Compose all
│   │   │
│   │   ├── lessons/             # Feature: Lessons (2 types: video, document)
│   │   │   ├── index.ts         📤 Export all
│   │   │   ├── types/
│   │   │   │   └── index.ts     📄 (RỖNG)
│   │   │   ├── constants/
│   │   │   │   └── index.ts     📄 (RỖNG)
│   │   │   ├── services/
│   │   │   │   └── lessonService.ts     📄 (RỖNG)
│   │   │   ├── hooks/
│   │   │   │   ├── useLesson.ts         📄 (RỖNG)
│   │   │   │   └── useLessonProgress.ts 📄 (RỖNG)
│   │   │   ├── components/
│   │   │   │   ├── LessonPlayer.tsx        📄 (RỖNG)
│   │   │   │   ├── VideoLesson.tsx        📄 (RỖNG)
│   │   │   │   ├── DocumentLesson.tsx     📄 (RỖNG)
│   │   │   │   ├── LessonNavigation.tsx   📄 (RỖNG)
│   │   │   │   └── LessonProgress.tsx     📄 (RỖNG)
│   │   │   └── containers/
│   │   │       ├── LessonContainer.tsx    📄 (Template)
│   │   │       ├── VideoLessonContainer.tsx    📄 (Template)
│   │   │       └── DocumentLessonContainer.tsx 📄 (Template)
│   │   │
│   │   └── auth/                # Feature: Auth
│   │       ├── index.ts         📤 Export all
│   │       ├── types/
│   │       │   └── index.ts     📄 (RỖNG)
│   │       ├── constants/
│   │       │   └── index.ts     📄 (RỖNG)
│   │       ├── services/
│   │       │   └── authService.ts       📄 (RỖNG)
│   │       ├── hooks/
│   │       │   └── useAuth.ts           📄 (RỖNG)
│   │       ├── components/
│   │       │   ├── LoginForm.tsx        📄 (RỖNG)
│   │       │   └── RegisterForm.tsx     📄 (RỖNG)
│   │       └── containers/
│   │           ├── LoginContainer.tsx   📄 (Template)
│   │           └── RegisterContainer.tsx 📄 (Template)
│   │
│   ├── shared/                  # 🔧 Shared Utilities
│   │   ├── index.ts             📤 Export all
│   │   ├── ui/
│   │   │   ├── index.ts         📤 Export all UI components
│   │   │   ├── Button.tsx       📄 (RỖNG)
│   │   │   ├── Card.tsx         📄 (RỖNG)
│   │   │   ├── Input.tsx        📄 (RỖNG)
│   │   │   ├── Spinner.tsx      📄 (RỖNG)
│   │   │   └── Modal.tsx        📄 (RỖNG)
│   │   ├── hooks/
│   │   │   └── useAsync.ts      📄 (RỖNG) Generic async hook
│   │   ├── utils/
│   │   │   └── apiClient.ts     📄 (RỖNG) Axios wrapper
│   │   ├── types/
│   │   │   └── api.ts           📄 (RỖNG) Shared API types
│   │   └── constants/
│   │       └── index.ts         📄 (RỖNG)
│   │
│   ├── services/                # Global API Services
│   │   ├── api.ts               📄 (RỖNG) Axios instance + interceptors
│   │   └── config.ts            📄 (RỖNG) API configuration
│   │
│   ├── types/                   # Global Types
│   │   ├── index.ts             📄 (RỖNG)
│   │   ├── course.ts            📄 (RỖNG)
│   │   ├── lesson.ts            📄 (RỖNG)
│   │   └── user.ts              📄 (RỖNG)
│   │
│   └── constants/               # Global Constants
│       └── index.ts             📄 (RỖNG)
│
├── 📦 package.json
├── 🔧 next.config.ts
├── 🔧 tsconfig.json             (alias @/* already configured)
└── 🔧 tailwind.config.ts
```

---

## 📝 Legend

- 📄 **RỖNG** - File rỗng, chờ bạn implement
- 📤 **Export all** - Convenience export file
- 👀 **EXAMPLE** - Xem file này để hiểu cách implement
- 📦 **Feature Module** - Một feature hoàn chỉnh (courses, lessons, auth)
- 🔝 **Tầng 1** - Page/Route (Next.js App Router)
- 🏗️ **Tầng 2-4** - Container, Component, Hook, Service

---

## 🚀 Bắt đầu

### Step 1: Đọc tài liệu
1. Đọc [QUICK_START.md](./QUICK_START.md)
2. Xem [ARCHITECTURE.md](./ARCHITECTURE.md) để chi tiết
3. Xem [SETUP.md](./SETUP.md) để cài dependencies

### Step 2: Xem ví dụ
Tất cả file `example.*` trong `src/features/courses/` có comment chi tiết:
- `src/features/courses/types/example.ts` - Types definition
- `src/features/courses/constants/example.ts` - Constants
- `src/features/courses/services/example.ts` - Pure API service
- `src/features/courses/hooks/example.ts` - State management
- `src/features/courses/components/example.tsx` - UI component
- `src/features/courses/containers/example.tsx` - Container composition

### Step 3: Copy examples
Rename `example.*` → `index.*` và thay thế với code của bạn

### Step 4: Implement features
1. **Courses** - Danh sách khóa học
2. **Lessons** - Video + Document lessons
3. **Auth** - Login/register
4. **Future** - Compiler feature

---

## 💡 Key Principles

| Tầng | Trách nhiệm | ✅ Do | ❌ Don't |
|------|-----------|--------|-----------|
| **Page/Route** | Compose Container | Render Container | JSX logic, API calls |
| **Container** | Business logic | Call hooks, compose components, handle state | Styling, API calls |
| **Component** | Render UI | Props only, render | Hooks, API calls, logic |
| **Hook** | State + Effects | Manage state, call service | Component logic, API |
| **Service** | API calls | HTTP requests only | State, components |

---

## 📚 Learning Path

```
1. Read QUICK_START.md
        ↓
2. Understand 4-tier architecture
        ↓
3. Copy example files & understand each layer
        ↓
4. Implement Courses feature
        ↓
5. Implement Lessons feature (video + document)
        ↓
6. Implement Auth feature
        ↓
7. Connect real backend API
        ↓
8. Add Compiler feature
```

---

**Ready to code? Start with [QUICK_START.md](./QUICK_START.md)! 🚀**
