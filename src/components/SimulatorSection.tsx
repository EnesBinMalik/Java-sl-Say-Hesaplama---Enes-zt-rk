import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Terminal as TerminalIcon, Cpu, Zap, CheckCircle2 } from 'lucide-react';
import { calculatePower } from '../utils/calculator';
import { Preset } from '../types';

const PRESETS: Preset[] = [
  { label: '3⁴ = 81', taban: 3, us: 4, note: 'Standart örnek' },
  { label: '2⁸ = 256', taban: 2, us: 8, note: 'Byte sınırı' },
  { label: '5³ = 125', taban: 5, us: 3, note: 'Küp alma' },
  { label: '10⁴ = 10.000', taban: 10, us: 4, note: 'Onluk taban' },
  { label: '7⁰ = 1', taban: 7, us: 0, note: 'Sıfırıncı üs kuralı' },
  { label: '2¹⁰ = 1024', taban: 2, us: 10, note: '1 Kilobyte' },
];

export function SimulatorSection() {
  const [taban, setTaban] = useState<number>(3);
  const [us, setUs] = useState<number>(4);
  const [activeTab, setActiveTab] = useState<'visual' | 'terminal'>('visual');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playSpeed, setPlaySpeed] = useState<number>(1000); // 1000ms per step

  // Terminal log state
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [terminalRunning, setTerminalRunning] = useState<boolean>(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Calculation result
  const result = useMemo(() => {
    return calculatePower(taban, us);
  }, [taban, us]);

  const totalSteps = result.steps.length;

  // Handle step autoplay
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && totalSteps > 0) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= totalSteps) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, totalSteps, playSpeed]);

  // Reset step index when inputs change
  useEffect(() => {
    setCurrentStepIndex(totalSteps); // default to finished state
    setIsPlaying(false);
  }, [taban, us, totalSteps]);

  // Virtual memory state at currentStepIndex
  const currentMemory = useMemo(() => {
    if (totalSteps === 0 || currentStepIndex === 0) {
      return {
        taban,
        us,
        i: 1,
        conditionMet: us >= 1,
        sonuc: 1,
        stepDetail: us === 0 
          ? 'Başlangıç: us = 0 olduğundan (1 <= 0) koşulu sağlanmaz. sonuc = 1 olarak kalır.'
          : 'Döngü öncesi başlangıç: int i = 1, long sonuc = 1;'
      };
    }

    const currentStep = result.steps[currentStepIndex - 1];
    const isCompleted = currentStepIndex >= totalSteps;

    return {
      taban,
      us,
      i: currentStep ? currentStep.i : totalSteps + 1,
      conditionMet: !isCompleted,
      sonuc: currentStep ? currentStep.newSonuc : result.finalResult,
      stepDetail: currentStep ? currentStep.explanation : `Döngü sonlandı. Nihai sonuç: ${result.finalResult}`
    };
  }, [currentStepIndex, result, taban, us, totalSteps]);

  // Terminal Simulator Runner
  const runTerminalSimulation = () => {
    setTerminalRunning(true);
    setTerminalLogs([
      '$ javac UsluSayiHesaplama.java',
      '$ java UsluSayiHesaplama',
      '=========================================',
      '  Java Üslü Sayı Hesaplama Programı     ',
      '  Hazırlayan: Enes Öztürk                ',
      '=========================================',
      `Üssü alınacak sayı (Taban): ${taban}`,
      `Üs olacak sayı (Kuvvet): ${us}`,
      'For döngüsü başlatılıyor...'
    ]);

    let step = 0;
    const interval = setInterval(() => {
      if (step < result.steps.length) {
        const s = result.steps[step];
        setTerminalLogs((prev) => [
          ...prev,
          `--> [Döngü Adımı ${s.i}] i=${s.i} (i <= ${us}: DOĞRU) | sonuc = ${s.previousSonuc} * ${taban} = ${s.newSonuc}`
        ]);
        step++;
      } else {
        clearInterval(interval);
        setTerminalLogs((prev) => [
          ...prev,
          `--> [Döngü Çıkışı] i=${result.steps.length + 1} (${result.steps.length + 1} <= ${us}: YANLIŞ)`,
          '-----------------------------------------',
          `Sonuç (${taban}^${us}) : ${result.finalResult}`,
          '[İşlem başarıyla tamamlandı - Enes Öztürk]',
          '$ _'
        ]);
        setTerminalRunning(false);
      }
    }, 400);
  };

  useEffect(() => {
    if (activeTab === 'terminal' && terminalLogs.length === 0) {
      runTerminalSimulation();
    }
  }, [activeTab]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs]);

  return (
    <section id="simulator" className="py-12 bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              <Cpu className="w-4 h-4" />
              <span>İnteraktif Çalışma Alanı</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400 lowercase">for döngüsü görselleştirici</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Değerleri Girin ve Döngüyü İzleyin
            </h2>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800 shrink-0">
            <button
              onClick={() => setActiveTab('visual')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'visual'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Döngü & Bellek Simülatörü</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('terminal');
                runTerminalSimulation();
              }}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'terminal'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>Java Konsolu (CLI)</span>
            </button>
          </div>
        </div>

        {/* Input Parameters Box */}
        <div className="bg-slate-950/70 rounded-2xl border border-slate-800 p-6 mb-8 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Input 1: Taban */}
            <div className="lg:col-span-4">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                1. Taban Sayısı (Üssü Alınacak Sayı)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={taban}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    setTaban(val);
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-lg font-mono font-bold text-amber-300 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  placeholder="Örn: 3"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-500">
                  taban (int)
                </span>
              </div>
            </div>

            {/* Input 2: Üs */}
            <div className="lg:col-span-4">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                2. Üs Değeri (Kuvvet / Kaç Kez Çarpılacağı)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={us}
                  onChange={(e) => {
                    const val = Math.max(0, parseInt(e.target.value) || 0);
                    setUs(val);
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-lg font-mono font-bold text-amber-300 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  placeholder="Örn: 4"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-500">
                  us (int)
                </span>
              </div>
            </div>

            {/* Math Result Preview */}
            <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-center">
              <div className="text-xs text-slate-400 mb-1">Hesaplanan Değer:</div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black font-mono text-white">
                  {taban}
                  <sup className="text-amber-400 text-base">{us}</sup>
                </span>
                <span className="text-slate-500">=</span>
                <span className="text-2xl font-black font-mono text-amber-400 truncate">
                  {result.finalResult.toLocaleString('tr-TR')}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1 truncate">
                Döngü tur sayısı: <span className="text-slate-300 font-mono">{us}</span> adım
              </div>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium mr-1">Hızlı Örnekler:</span>
            {PRESETS.map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  setTaban(preset.taban);
                  setUs(preset.us);
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all ${
                  taban === preset.taban && us === preset.us
                    ? 'bg-amber-400 text-slate-950 font-bold border-amber-300 shadow-sm'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500 hover:text-white'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* View 1: Visual Loop Simulator */}
        {activeTab === 'visual' && (
          <div className="space-y-6">
            
            {/* Step Controls Deck */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>For Döngüsü Adım İnceleyicisi</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    For döngüsünün her adımda değişkenleri nasıl değiştirdiğini gözlemleyin.
                  </p>
                </div>

                {/* Playback Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsPlaying(false);
                      setCurrentStepIndex(0);
                    }}
                    title="Başa Al"
                    className="p-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setIsPlaying(false);
                      setCurrentStepIndex((prev) => Math.max(0, prev - 1));
                    }}
                    disabled={currentStepIndex === 0}
                    title="Önceki Adım"
                    className="p-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 disabled:opacity-40 text-slate-300 hover:text-white transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      if (currentStepIndex >= totalSteps) {
                        setCurrentStepIndex(0);
                      }
                      setIsPlaying(!isPlaying);
                    }}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      isPlaying
                        ? 'bg-orange-500 text-white'
                        : 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                    }`}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5" />
                        <span>Duraklat</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>{currentStepIndex >= totalSteps ? 'Yeniden Oynat' : 'Oynat'}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setIsPlaying(false);
                      setCurrentStepIndex((prev) => Math.min(totalSteps, prev + 1));
                    }}
                    disabled={currentStepIndex >= totalSteps}
                    title="Sonraki Adım"
                    className="p-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 disabled:opacity-40 text-slate-300 hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Speed Selector */}
                  <select
                    value={playSpeed}
                    onChange={(e) => setPlaySpeed(Number(e.target.value))}
                    className="bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 rounded-lg px-2.5 py-2 focus:outline-none"
                  >
                    <option value={1500}>0.5x Yavaş</option>
                    <option value={1000}>1x Normal</option>
                    <option value={500}>2x Hızlı</option>
                  </select>
                </div>
              </div>

              {/* Progress Slider */}
              <div className="mt-6 mb-8">
                <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
                  <span>Adım {currentStepIndex} / {totalSteps}</span>
                  <span className="text-amber-400 font-semibold">
                    {totalSteps === 0 
                      ? 'Döngü Koşulu Sağlanmadı (us = 0)' 
                      : currentStepIndex === totalSteps 
                        ? 'Döngü Tamamlandı' 
                        : `i = ${currentStepIndex + 1} için çalışıyor`}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
                    style={{
                      width: totalSteps === 0 ? '100%' : `${(currentStepIndex / totalSteps) * 100}%`
                    }}
                  />
                </div>
              </div>

              {/* JVM Virtual RAM & Register State */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                
                {/* Register: taban */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Bellek: taban (int)</div>
                  <div className="text-xl font-mono font-bold text-white mt-1">{currentMemory.taban}</div>
                  <div className="text-[11px] text-slate-500 mt-1">Sabit çarpan</div>
                </div>

                {/* Register: us */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Bellek: us (int)</div>
                  <div className="text-xl font-mono font-bold text-white mt-1">{currentMemory.us}</div>
                  <div className="text-[11px] text-slate-500 mt-1">Döngü üst sınırı</div>
                </div>

                {/* Register: i (Sayaç) */}
                <div className="bg-slate-900/90 border border-amber-500/40 rounded-xl p-4 relative overflow-hidden">
                  <div className="text-[11px] font-mono text-amber-400 uppercase">Sayaç: i (int)</div>
                  <div className="text-xl font-mono font-bold text-amber-300 mt-1">
                    {currentStepIndex === 0 ? '1' : currentStepIndex <= totalSteps ? currentStepIndex : `${totalSteps + 1} (bitti)`}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Koşul: {currentStepIndex <= totalSteps ? `${currentStepIndex} <= ${us} (✓)` : `${currentStepIndex} <= ${us} (✕)`}
                  </div>
                </div>

                {/* Register: sonuc */}
                <div className="bg-slate-900/90 border border-emerald-500/40 rounded-xl p-4">
                  <div className="text-[11px] font-mono text-emerald-400 uppercase">Sonuç: sonuc (long)</div>
                  <div className="text-xl font-mono font-bold text-emerald-300 mt-1 truncate">
                    {currentMemory.sonuc.toLocaleString('tr-TR')}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {currentStepIndex === 0 ? 'İlk değer (etkisiz eleman)' : `Adım ${currentStepIndex} çıktısı`}
                  </div>
                </div>
              </div>

              {/* Step Commentary Card */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase">Adım Açıklaması</div>
                  <div className="text-sm text-slate-200 mt-0.5 font-medium leading-relaxed">
                    {currentMemory.stepDetail}
                  </div>
                </div>
              </div>
            </div>

            {/* Iteration History Table */}
            {totalSteps > 0 && (
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 overflow-hidden">
                <h4 className="text-sm font-bold text-white mb-4">
                  Tüm For Döngüsü Adımlarının Dökümü
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="py-2.5 px-3">Adım (i)</th>
                        <th className="py-2.5 px-3">Koşul (i &lt;= us)</th>
                        <th className="py-2.5 px-3">Önceki sonuc</th>
                        <th className="py-2.5 px-3">İşlem (sonuc *= taban)</th>
                        <th className="py-2.5 px-3 text-right">Yeni sonuc</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {result.steps.map((step) => {
                        const isCurrent = step.stepNumber === currentStepIndex;
                        return (
                          <tr
                            key={step.stepNumber}
                            className={`transition-colors ${
                              isCurrent
                                ? 'bg-amber-500/10 text-amber-300 font-semibold'
                                : 'text-slate-300 hover:bg-slate-900/50'
                            }`}
                          >
                            <td className="py-2 px-3">
                              <span className="inline-flex items-center gap-1.5">
                                {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                                i = {step.i}
                              </span>
                            </td>
                            <td className="py-2 px-3 text-emerald-400">
                              {step.i} &lt;= {us} (true)
                            </td>
                            <td className="py-2 px-3 text-slate-400 tabular-nums">
                              {step.previousSonuc.toLocaleString('tr-TR')}
                            </td>
                            <td className="py-2 px-3 text-slate-200">
                              {step.previousSonuc} × {taban}
                            </td>
                            <td className="py-2 px-3 text-right text-amber-400 font-bold tabular-nums">
                              {step.newSonuc.toLocaleString('tr-TR')}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* View 2: Java Terminal Mode (CLI) */}
        {activeTab === 'terminal' && (
          <div id="terminal" className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
            {/* Terminal Window Top Bar */}
            <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-xs font-mono text-slate-400">
                  enes-ozturk@java-terminal: ~/odev/UsluSayiHesaplama
                </span>
              </div>
              <button
                onClick={runTerminalSimulation}
                disabled={terminalRunning}
                className="px-2.5 py-1 text-xs font-mono bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-amber-300 rounded border border-slate-700 transition-colors"
              >
                {terminalRunning ? 'Çalışıyor...' : 'Yeniden Çalıştır'}
              </button>
            </div>

            {/* Terminal Output */}
            <div className="p-6 font-mono text-xs sm:text-sm text-slate-200 min-h-[360px] max-h-[500px] overflow-y-auto space-y-1.5 leading-relaxed bg-[#0b0f19]">
              {terminalLogs.map((log, idx) => {
                const isHighlight = log.startsWith('Sonuç') || log.startsWith('==');
                const isStep = log.startsWith('-->');
                return (
                  <div
                    key={idx}
                    className={`${
                      isHighlight
                        ? 'text-amber-400 font-bold'
                        : isStep
                          ? 'text-sky-300'
                          : log.startsWith('$')
                            ? 'text-emerald-400'
                            : 'text-slate-300'
                    }`}
                  >
                    {log}
                  </div>
                );
              })}
              <div ref={terminalEndRef} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
