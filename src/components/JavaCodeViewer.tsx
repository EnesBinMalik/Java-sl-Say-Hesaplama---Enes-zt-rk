import { useState } from 'react';
import { Copy, Check, Download, Info } from 'lucide-react';
import { javaCodeSnippets } from '../data/javaCodeSnippets';
import { downloadJavaFile } from '../utils/calculator';
import { CodeVariant } from '../types';

export function JavaCodeViewer() {
  const [selectedVariantId, setSelectedVariantId] = useState<'standard' | 'advanced' | 'method'>('standard');
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedLine, setSelectedLine] = useState<number | null>(30); // default focus on the for loop

  const currentSnippet: CodeVariant = javaCodeSnippets.find(
    (s) => s.id === selectedVariantId
  ) || javaCodeSnippets[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    downloadJavaFile(currentSnippet.filename, currentSnippet.code);
  };

  const lines = currentSnippet.code.split('\n');

  return (
    <section id="source-code" className="py-12 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              <span>Java 101 Kaynak Kodları</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400 lowercase">Enes Öztürk İmzalı</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Eksiksiz Java Kaynak Kodu
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Ödev gereksinimlerine birebir uygun, açıklayıcı yorum satırları eklenmiş ve derlenmeye hazır Java kodu.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-700 hover:border-slate-500 hover:text-white rounded-lg transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Kodu Kopyala</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>{currentSnippet.filename} İndir</span>
            </button>
          </div>
        </div>

        {/* Code Variant Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-6 overflow-x-auto">
          {javaCodeSnippets.map((variant) => {
            const isActive = variant.id === selectedVariantId;
            return (
              <button
                key={variant.id}
                onClick={() => {
                  setSelectedVariantId(variant.id);
                  setSelectedLine(null);
                }}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-400/10 text-amber-300 border border-amber-400/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <span>{variant.title}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                  isActive ? 'bg-amber-400/20 text-amber-300' : 'bg-slate-800 text-slate-400'
                }`}>
                  {variant.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Code Window Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Code Viewer (8 cols) */}
          <div className="lg:col-span-8 bg-[#0d1117] rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
            {/* Window title bar */}
            <div className="bg-[#161b22] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-xs font-mono text-slate-300 font-semibold">
                  {currentSnippet.filename}
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Satıra tıklayarak açıklamasını görün
              </span>
            </div>

            {/* Code lines */}
            <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm overflow-x-auto max-h-[600px] overflow-y-auto leading-relaxed">
              {lines.map((line, idx) => {
                const lineNumber = idx + 1;
                const isSelected = selectedLine === lineNumber;
                const hasExplanation = !!currentSnippet.lineExplanations[lineNumber];

                // Simple syntax color highlights
                let formattedLine = line;
                const isComment = line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*');

                return (
                  <div
                    key={lineNumber}
                    onClick={() => {
                      if (hasExplanation) {
                        setSelectedLine(lineNumber);
                      }
                    }}
                    className={`flex items-start gap-4 py-0.5 px-2 rounded cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-amber-500/15 text-amber-200'
                        : hasExplanation
                          ? 'hover:bg-slate-800/60'
                          : ''
                    }`}
                  >
                    <span className="w-8 shrink-0 text-right select-none text-slate-600 font-mono text-xs pt-0.5">
                      {lineNumber}
                    </span>
                    <span
                      className={`whitespace-pre ${
                        isComment
                          ? 'text-slate-500 italic'
                          : line.includes('for (')
                            ? 'text-amber-400 font-bold'
                            : line.includes('public class') || line.includes('import ')
                              ? 'text-purple-400 font-semibold'
                              : line.includes('System.out')
                                ? 'text-sky-300'
                                : line.includes('int ') || line.includes('long ') || line.includes('double ')
                                  ? 'text-amber-300'
                                  : 'text-slate-200'
                      }`}
                    >
                      {formattedLine || '\n'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Line Explanations & Context Side Panel (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Selected Line Inspector */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-3">
                <Info className="w-4 h-4" />
                <span>Kod Satırı İncelemesi</span>
              </div>

              {selectedLine && currentSnippet.lineExplanations[selectedLine] ? (
                <div>
                  <div className="text-xs font-mono text-slate-400 mb-1">
                    Satır {selectedLine}:
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300 mb-3 overflow-x-auto">
                    {lines[selectedLine - 1]}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentSnippet.lineExplanations[selectedLine]}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-slate-400 leading-relaxed">
                  Kod bloğundaki satırlardan birine tıklayarak Java derleyicisinin ve algoritmanın bu satırda ne yaptığını detaylıca okuyabilirsiniz.
                </p>
              )}
            </div>

            {/* Quick Compilation Guide */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                Java Programını Çalıştırma Adımları
              </h4>
              <ol className="text-xs text-slate-400 space-y-2 list-decimal list-inside font-mono">
                <li>
                  <span className="text-slate-300">Dosyayı kaydedin:</span>
                  <div className="mt-1 p-2 rounded bg-slate-950 text-slate-300">
                    {currentSnippet.filename}
                  </div>
                </li>
                <li>
                  <span className="text-slate-300">Terminalde derleyin (javac):</span>
                  <div className="mt-1 p-2 rounded bg-slate-950 text-emerald-400">
                    javac {currentSnippet.filename}
                  </div>
                </li>
                <li>
                  <span className="text-slate-300">Programı başlatın (java):</span>
                  <div className="mt-1 p-2 rounded bg-slate-950 text-amber-400">
                    java {currentSnippet.filename.replace('.java', '')}
                  </div>
                </li>
              </ol>
            </div>

            {/* Homework Signature Stamp */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 text-xs">
              <div className="font-semibold text-amber-300">Ödev Teslim Notu</div>
              <p className="text-slate-400 mt-1">
                Bu ödev Java 101 müfredatı gereğince <code className="text-amber-300 font-mono">for</code> döngüsü ile çözülmüş ve <strong className="text-white">Enes Öztürk</strong> adına tescil edilmiştir.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
