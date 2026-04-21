// src/features/lessons/components/VideoPlayer.tsx
import { Lesson } from '@/features/lessons/types';

export function VideoPlayer({ lesson }: { lesson: Lesson }) {
  if (lesson.type === 'document') return null;

  const src = lesson.youtubeId
    ? `https://www.youtube.com/embed/${lesson.youtubeId}?rel=0`
    : `https://iframe.videodelivery.net/${lesson.cloudflareVideoId}`;

  return (
    <div className="aspect-video w-full bg-black">
      <iframe
        src={src}
        className="w-full h-full"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
      />
    </div>
  );
}