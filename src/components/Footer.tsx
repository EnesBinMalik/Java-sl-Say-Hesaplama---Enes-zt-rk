export function Footer() {
  return (
    <footer className="py-8 bg-slate-950 text-slate-400 text-xs border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left side info */}
        <div>
          <div className="font-semibold text-slate-200">
            Java ile Üslü Sayı Hesaplama Programı (For Döngüsü)
          </div>
          <div className="flex items-center gap-2 text-slate-500 mt-1">
            <span>Ödev Teslimi</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-400 font-medium">Hazırlayan: Enes Öztürk</span>
            <span aria-hidden="true">·</span>
            <span>Java 101</span>
          </div>
        </div>

        {/* Right side navigation */}
        <div className="flex items-center gap-6">
          <a href="#simulator" className="hover:text-amber-400 transition-colors">
            Simülatör
          </a>
          <a href="#source-code" className="hover:text-amber-400 transition-colors">
            Kaynak Kodu
          </a>
          <a href="#algorithm" className="hover:text-amber-400 transition-colors">
            Döngü Mantığı
          </a>
          <a href="#" className="hover:text-white transition-colors text-slate-500">
            Yukarı Çık ↑
          </a>
        </div>

      </div>
    </footer>
  );
}
