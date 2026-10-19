import { Download } from 'lucide-react';
import { javaCodeSnippets } from '../data/javaCodeSnippets';
import { downloadJavaFile } from '../utils/calculator';

export function Header() {
  const handleDownloadStandard = () => {
    const std = javaCodeSnippets[0];
    downloadJavaFile(std.filename, std.code);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single brand wordmark */}
        <a href="#" className="flex items-center gap-2.5 text-base font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-amber-400 transition-colors">
          <span className="w-7 h-7 rounded-md bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-xs font-mono font-black text-slate-950 shadow-sm">
            ☕
          </span>
          <span>Enes Öztürk · Java Lab</span>
        </a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <a href="#simulator" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Döngü Simülatörü
          </a>
          <a href="#terminal" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Java Konsolu
          </a>
          <a href="#source-code" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Java Kaynak Kodu
          </a>
          <a href="#algorithm" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            For Döngüsü Anatomisi
          </a>
          <a href="#quiz" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Öğrenme Testi
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleDownloadStandard}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 rounded-lg hover:bg-amber-300 active:scale-95 transition-all shadow-sm whitespace-nowrap shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.java Dosyasını İndir</span>
          </button>
        </div>
      </div>
    </header>
  );
}
