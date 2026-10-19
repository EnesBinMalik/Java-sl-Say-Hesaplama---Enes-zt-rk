import { loopComponents, mathematicalInsights } from '../data/algorithmGuide';
import { ArrowRight, HelpCircle } from 'lucide-react';

export function LoopExplainer() {
  return (
    <section id="algorithm" className="py-12 bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            <span>Algoritma Mantığı</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400 lowercase">for döngüsünün iç yapısı</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Java'da For Döngüsü Anatomisi
          </h2>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            For döngüsü, bir işlemin belirli bir sayıda tekrarlanması gereken durumlarda kullanılır.
            Üs alma algoritmasında sayacımız 1'den başlayarak girilen kuvvet değerine kadar adımları yineler.
          </p>
        </div>

        {/* Visual For Loop Header Block */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 mb-10 shadow-lg">
          <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">
            For Döngüsü Sözdizimi (Syntax)
          </div>
          
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-base sm:text-lg flex flex-wrap items-center gap-3">
            <span className="text-amber-400 font-bold">for</span>
            <span className="text-slate-400">(</span>
            
            <div className="px-2 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300">
              int i = 1; <span className="text-[10px] text-slate-400 block font-sans">1. Başlatma</span>
            </div>

            <div className="px-2 py-1 rounded bg-sky-500/10 border border-sky-500/30 text-sky-300">
              i &lt;= us; <span className="text-[10px] text-slate-400 block font-sans">2. Koşul</span>
            </div>

            <div className="px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
              i++ <span className="text-[10px] text-slate-400 block font-sans">4. Artırma</span>
            </div>

            <span className="text-slate-400">)</span>
            <span className="text-slate-400">{'{'}</span>
            
            <div className="w-full pl-6 my-1">
              <span className="px-2 py-1 rounded bg-purple-500/10 border border-purple-500/30 text-purple-300 inline-block">
                sonuc *= taban; <span className="text-[10px] text-slate-400 ml-2 font-sans">3. Gövde</span>
              </span>
            </div>

            <span className="text-slate-400">{'}'}</span>
          </div>
        </div>

        {/* 4 Loop Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {loopComponents.map((component, idx) => (
            <div
              key={idx}
              className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="text-xs font-mono font-bold text-amber-400 mb-1">
                  {component.title}
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 font-mono text-xs text-white my-2.5">
                  {component.syntax}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {component.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{component.roleInProgram}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 3 Critical Algorithm Rules */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Mülakatlarda ve Sınavlarda Çıkan Kritik Sorular</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mathematicalInsights.map((insight, idx) => (
              <div
                key={idx}
                className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5"
              >
                <div className="text-xs font-mono text-amber-400 font-bold bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded inline-block mb-3">
                  {insight.formula}
                </div>
                <h4 className="text-sm font-semibold text-white mb-2">
                  {insight.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {insight.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
