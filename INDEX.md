# 📚 WeCode Documentation

## 📖 Start Here

### 1️⃣ **[QUICK_START.md](./QUICK_START.md)** ⭐ START HERE
   - Step-by-step guide to implement features
   - Code examples with explanations
   - Common mistakes & fixes
   - ~30 min read

### 2️⃣ **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Deep Dive
   - 4-tier architecture explained
   - Rules & best practices
   - Dependency flow
   - Checklist before commit

### 3️⃣ **[SETUP.md](./SETUP.md)** - Project Setup
   - Installation instructions
   - Environment setup
   - Features roadmap
   - API integration guide

### 4️⃣ **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Visual Reference
   - Project folder tree
   - File organization
   - Legend & annotations
   - Learning path

---

## 🎯 The 4-Tier Architecture

```
┌─────────────────────────────────────────┐
│  🔝 Page/Route (app/page.tsx)          │ Compose Container only
├─────────────────────────────────────────┤
│  Container (features/*/containers/)     │ Business logic + composition
├─────────────────────────────────────────┤
│  Component + Hook (features/*/*)        │ UI + State management
├─────────────────────────────────────────┤
│  Service (features/*/services/)         │ Pure API calls
└─────────────────────────────────────────┘
```

**Rule**: Tầng trên dùng tầng dưới, tầng dưới KHÔNG biết tầng trên

---

## 📁 Project Folder Structure

```
src/
├── app/               # Next.js App Router (Page/Route)
├── features/          # Feature modules
│   ├── courses/       # ✅ Course listing, details
│   ├── lessons/       # ✅ Video + Document lessons
│   └── auth/          # ✅ Login/register
├── shared/            # Shared UI, hooks, utilities
├── services/          # Global API services
├── types/             # Global types
└── constants/         # Global constants
```

---

## 🚀 Quick Commands

```bash
# Setup
npm install
npm install axios

# Development
npm run dev

# Build
npm run build

# Linting
npm run lint
```

---

## 📝 Features Roadmap

- [x] Project scaffolding
- [x] Architecture documentation
- [ ] Courses feature
- [ ] Lessons feature (video + document)
- [ ] Auth feature (login/register)
- [ ] Progress tracking
- [ ] Compiler feature

---

## 💡 Key Principles

1. **Separation of Concerns** - Each layer has one responsibility
2. **Reusability** - Components, hooks, services are reusable
3. **Scalability** - Easy to add new features without touching existing code
4. **Type Safety** - Full TypeScript support
5. **No Props Drilling** - Max 2-3 levels deep
6. **No Circular Dependencies** - Dependency flow is one-directional

---

## 🎨 Code Examples

All code examples are in `src/features/courses/`:

- **Types**: `types/example.ts` - How to define interfaces
- **Constants**: `constants/example.ts` - Magic numbers & endpoints
- **Service**: `services/example.ts` - Pure API calls
- **Hook**: `hooks/example.ts` - State management
- **Component**: `components/example.tsx` - UI components
- **Container**: `containers/example.tsx` - Business logic & composition

---

## ❓ FAQ

**Q: Where do I put styling?**
A: Inside UI Components. Containers should NOT have styling (max basic layout).

**Q: Can components call hooks?**
A: Only UI hooks (useState, useCallback). NOT feature hooks like `useCourses()`.

**Q: Can I skip the service layer?**
A: No. Service layer separates API logic from component/hook logic.

**Q: How deep can props drilling go?**
A: Max 2-3 levels. If deeper, consider Context/State Management.

**Q: Should I use Redux/Zustand?**
A: Start with context + hooks. Move to state manager if needed.

---

## 🔗 Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [React Hooks](https://react.dev/reference/react/hooks)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Axios](https://axios-http.com/docs/intro)

---

## ✅ Next Steps

1. Read [QUICK_START.md](./QUICK_START.md)
2. Review code examples in `src/features/courses/`
3. Copy examples and implement Courses feature
4. Implement Lessons feature
5. Implement Auth feature
6. Connect real backend API

---

**Ready? Start with [QUICK_START.md](./QUICK_START.md)! 🚀**
