import { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';
import { quizQuestions } from '../data/quizQuestions';

export function QuizSection() {
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleReset = () => {
    setUserAnswers({});
    setShowResults(false);
  };

  const answeredCount = Object.keys(userAnswers).length;
  const isAllAnswered = answeredCount === quizQuestions.length;

  const correctCount = quizQuestions.filter(
    (q) => userAnswers[q.id] === q.correctIndex
  ).length;

  return (
    <section id="quiz" className="py-12 bg-slate-950 border-b border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            <Award className="w-4 h-4" />
            <span>Bilgi Pekiştirme</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400 lowercase">döngü mantığı testi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Java For Döngüsü Sınavı
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Kodun mantığını ne kadar anladığınızı sınamak için 4 soruluk hızlı testi çözün.
          </p>
        </div>

        {/* Questions list */}
        <div className="space-y-6">
          {quizQuestions.map((q, qIndex) => {
            const selectedOpt = userAnswers[q.id];
            const isAnswered = selectedOpt !== undefined;
            const isCorrect = selectedOpt === q.correctIndex;

            return (
              <div
                key={q.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs font-bold flex items-center justify-center">
                      0{qIndex + 1}
                    </span>
                    <h3 className="text-sm font-semibold text-white leading-relaxed">
                      {q.question}
                    </h3>
                  </div>

                  {isAnswered && (
                    <div className="shrink-0">
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Doğru</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-400">
                          <XCircle className="w-4 h-4" />
                          <span>Yanlış</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  {q.options.map((opt, optIndex) => {
                    const isSelected = selectedOpt === optIndex;
                    const isThisCorrect = optIndex === q.correctIndex;

                    let buttonStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white';
                    
                    if (isAnswered) {
                      if (isThisCorrect) {
                        buttonStyle = 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 font-medium';
                      } else if (isSelected) {
                        buttonStyle = 'bg-rose-950/40 border-rose-500/50 text-rose-300 font-medium';
                      } else {
                        buttonStyle = 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={optIndex}
                        onClick={() => handleSelectOption(q.id, optIndex)}
                        className={`text-left p-3.5 rounded-xl border text-xs transition-all ${buttonStyle}`}
                      >
                        <span className="font-mono text-slate-500 mr-2">
                          {String.fromCharCode(65 + optIndex)})
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {isAnswered && (
                  <div className="mt-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                    <strong className="text-amber-400">Açıklama: </strong>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Results summary bar */}
        <div className="mt-8 p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="text-xs text-slate-400">Toplam Başarı:</div>
            <div className="text-lg font-bold text-white mt-0.5">
              {answeredCount === 0 ? (
                'Soruları yanıtlayarak testinizi başlatın'
              ) : (
                <span>
                  {quizQuestions.length} sorudan <span className="text-amber-400 font-mono">{correctCount}</span> tanesi doğru
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Testi Sıfırla</span>
          </button>
        </div>

      </div>
    </section>
  );
}
