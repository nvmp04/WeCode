import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-zinc-800 text-zinc-400 py-16 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-4 space-y-6">
            <Link href="/" className="group flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white font-bold group-hover:bg-indigo-500 transition-colors">
                C_
              </div>
              <span className="text-xl font-bold tracking-tighter text-white uppercase">
                Conquer<span className="text-indigo-500">.dev</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">
              Nền tảng kết nối gia sư và học viên, giúp bạn chinh phục mọi kỹ năng lập trình thực chiến.
              <code className="block mt-2 text-zinc-500 font-mono">
                const mission = "Build the next generation of devs";
              </code>
            </p>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-200 font-mono">
                // Khóa học
              </h4>
              <ul className="space-y-2 text-sm font-mono">
                <li>
                  <Link href="/courses?level=beginner" className="group flex items-center hover:text-white transition-colors">
                    <span className="opacity-0 group-hover:opacity-100 transition-all text-indigo-500 mr-2">-&gt;</span>
                    01. Cơ bản
                  </Link>
                </li>
                <li>
                  <Link href="/courses?level=intermediate" className="group flex items-center hover:text-white transition-colors">
                    <span className="opacity-0 group-hover:opacity-100 transition-all text-indigo-500 mr-2">-&gt;</span>
                    02. Trung cấp
                  </Link>
                </li>
                <li>
                  <Link href="/courses?level=advanced" className="group flex items-center hover:text-white transition-colors">
                    <span className="opacity-0 group-hover:opacity-100 transition-all text-indigo-500 mr-2">-&gt;</span>
                    03. Nâng cao
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-200 font-mono">
                // Cộng đồng
              </h4>
              <ul className="space-y-2 text-sm font-mono">
                <li>
                  <Link href="/about" className="group flex items-center hover:text-white transition-colors">
                    <span className="opacity-0 group-hover:opacity-100 transition-all text-indigo-500 mr-2">-&gt;</span>
                    Về chúng tôi
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="group flex items-center hover:text-white transition-colors">
                    <span className="opacity-0 group-hover:opacity-100 transition-all text-indigo-500 mr-2">-&gt;</span>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="group flex items-center hover:text-white transition-colors">
                    <span className="opacity-0 group-hover:opacity-100 transition-all text-indigo-500 mr-2">-&gt;</span>
                    Tuyển dụng
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-200 font-mono">
                // Hỗ trợ
              </h4>
              <ul className="space-y-2 text-sm font-mono">
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Điều khoản</Link></li>
                <li>
                  <a href="mailto:support@conquer.vn" className="hover:text-indigo-400 transition-colors flex items-center gap-1">
                    Contact<span className="animate-pulse">_</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-[10px] font-mono tracking-tight">
              &copy; {currentYear} CONQUER_PLATFORM. ALL_RIGHTS_RESERVED.
            </p>
          </div>

          <div className="flex gap-3">
            {['GH', 'FB', 'IN'].map((label) => (
              <div key={label} className="px-2 py-1 border border-zinc-800 rounded hover:border-indigo-500 hover:text-indigo-500 transition-all cursor-pointer font-mono text-[10px]">
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}