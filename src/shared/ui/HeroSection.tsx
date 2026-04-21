// src/shared/ui/HeroSection.tsx
interface Props {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
}

export function HeroSection({ title, subtitle, ctaText, ctaHref }: Props) {
  return (
    <section className="py-20 text-center">
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <a href={ctaHref}>{ctaText}</a>
    </section>
  );
}