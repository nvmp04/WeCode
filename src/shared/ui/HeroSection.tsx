import Link from 'next/link';

interface Props {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
}

export function HeroSection({
  title,
  subtitle,
  ctaText,
  ctaHref,
}: Props) {
  return (
    <section className="relative overflow-hidden border-b border-[#30363d] bg-[#0d1117]">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(88,166,255,0.12),transparent_35%)]" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#30363d] bg-[#161b22] px-4 py-2 text-xs font-mono text-[#58a6ff]">
            <span className="w-2 h-2 rounded-full bg-[#3fb950]" />
            launch.learning()
          </div>

          {/* Title */}
          <h1 className="mt-8 text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg md:text-xl leading-8 text-[#8b949e]">
            {subtitle}
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={ctaHref}
              className="px-6 py-3 rounded-xl bg-[#238636] text-white font-semibold hover:bg-[#2ea043] transition-all hover:scale-[1.02]"
            >
              {ctaText}
            </Link>

            <Link
              href="/courses"
              className="px-6 py-3 rounded-xl border border-[#30363d] bg-[#161b22] text-[#c9d1d9] hover:border-[#58a6ff]/50 hover:text-white transition-all"
            >
              Explore Courses
            </Link>
          </div>

          {/* Code Snippet */}
          <div className="mt-14 text-left rounded-2xl border border-[#30363d] bg-[#161b22] overflow-hidden shadow-xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#30363d]">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-3 text-xs font-mono text-[#8b949e]">
                future.tsx
              </span>
            </div>

            <div className="p-5 font-mono text-sm leading-7">
              <div>
                <span className="text-[#58a6ff]">const</span>{' '}
                <span className="text-white">developer</span>{' '}
                <span className="text-[#8b949e]">=</span>{' '}
                <span className="text-[#8b949e]">{'{'}</span>
              </div>

              <div className="pl-5">
                <span className="text-white">mindset</span>
                <span className="text-[#8b949e]">:</span>{' '}
                <span className="text-[#3fb950]">
                  "build everyday"
                </span>
                ,
              </div>

              <div className="pl-5">
                <span className="text-white">mission</span>
                <span className="text-[#8b949e]">:</span>{' '}
                <span className="text-[#3fb950]">
                  "learn & ship"
                </span>
              </div>

              <div>
                <span className="text-[#8b949e]">{'}'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}