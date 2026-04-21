// src/app/learn/[slug]/[lessonId]/page.tsx
import { LessonContainer } from '@/features/lessons/containers/LessonContainer';

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lessonId: string }>;
}) {
  const { slug, lessonId } = await params;
  return <LessonContainer courseSlug={slug} lessonId={lessonId} />;
}