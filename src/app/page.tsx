// src/app/page.tsx
import { HeroSection } from '@/shared/ui/HeroSection';
// import { FeaturedCoursesContainer } from '@/features/courses/containers/FeaturedCoursesContainer';

export default function HomePage() {
  return (
    <>
      <HeroSection
        title="Học lập trình thực chiến"
        subtitle="Từ cơ bản đến đi làm được"
        ctaText="Xem khóa học"
        ctaHref="/courses"
      />
      <section className="py-12">
        <h2>Khóa học nổi bật</h2>
        {/* <FeaturedCoursesContainer /> */}
      </section>
    </>
  );
}