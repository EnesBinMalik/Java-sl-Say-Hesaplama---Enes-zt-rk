import { Terminal, Code2, BookOpen } from 'lucide-react';

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden pt-12 pb-10 border-b border-slate-800/80 bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Decorative subtle ambient grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #f59e0b 1px, transparent 0)',
          backgroundSize: '28px 28px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          {/* Metadata line with typographic separators (no static pill) */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-amber-400 mb-3">
            <span>Java 101 Döngüler</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Algoritmalar ve Akış Kontrolü</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300">Ödev Teslimi</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight text-balance mb-4">
            Java ile For Döngüsü Kullanarak <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">
              Üslü Sayı Hesaplama
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6 max-w-2xl">
            Kullanıcının klavyeden girdiği taban ve üs değerlerini alarak, 
            <code className="mx-1 px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 text-sm font-mono font-medium">for</code> 
            döngüsü vasıtasıyla adım adım üs alan programın interaktif simülatörü ve kaynak kodları.
          </p>

          {/* Author signature box */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm">
                EÖ
              </div>
              <div>
                <div className="text-xs text-slate-400">Ödevi Hazırlayan Öğrenci</div>
                <div className="text-sm font-semibold text-white tracking-tight">
                  Enes Öztürk
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Gereksinim:</span>
              <span className="text-slate-200 font-mono bg-slate-800 px-2 py-1 rounded">
                for (int i = 1; i &lt;= us; i++)
              </span>
            </div>
          </div>

          {/* Quick jump actions */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#simulator"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-95 transition-all shadow-sm"
            >
              <Terminal className="w-4 h-4" />
              <span>Simülatörü Çalıştır</span>
            </a>
            <a
              href="#source-code"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-200 bg-slate-800/90 hover:bg-slate-700/90 hover:text-white border border-slate-700/80 transition-all"
            >
              <Code2 className="w-4 h-4 text-amber-400" />
              <span>Java Kodunu İncele</span>
            </a>
            <a
              href="#algorithm"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>Döngü Mantığı</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
