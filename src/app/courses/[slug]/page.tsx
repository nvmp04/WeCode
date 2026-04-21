// src/app/courses/[slug]/page.tsx
import { CourseDetailContainer } from "@/features/courses/containers/CourseDetailContainer";
export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return < CourseDetailContainer slug={slug} />;
}