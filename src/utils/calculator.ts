import { CalculationResult, IterationStep } from '../types';

export function calculatePower(taban: number, us: number): CalculationResult {
  const steps: IterationStep[] = [];
  let currentSonuc = 1;
  const isNegative = us < 0;
  const loopLimit = Math.min(Math.abs(us), 50); // limit to reasonable iterations for step-by-step display
  let isOverflow = false;

  if (us === 0) {
    return {
      taban,
      us,
      finalResult: 1,
      isOverflow: false,
      steps: [],
      formattedFormula: `${taban}⁰ = 1 (Döngü koşulu 1 <= 0 sağlanmadığı için doğrudan 1 kalır)`
    };
  }

  for (let i = 1; i <= loopLimit; i++) {
    const prev = currentSonuc;
    currentSonuc = currentSonuc * taban;

    if (!Number.isFinite(currentSonuc) || Math.abs(currentSonuc) > 9.223372036854776e18) {
      isOverflow = true;
    }

    steps.push({
      stepNumber: i,
      i,
      condition: i <= loopLimit,
      previousSonuc: prev,
      operationText: `${prev} × ${taban} = ${currentSonuc}`,
      newSonuc: currentSonuc,
      explanation: `Adım ${i}: i sayacı ${i}. Koşul (${i} <= ${Math.abs(us)}) DOĞRU. Sonuç ${prev} sayısından ${currentSonuc} sayısına güncellendi.`
    });
  }

  const finalResult = isNegative ? 1 / currentSonuc : currentSonuc;

  // Build visual math formula like: 3 * 3 * 3 * 3 = 81
  const factors = Array.from({ length: Math.min(Math.abs(us), 8) }, () => `${taban}`);
  let factorsText = factors.join(' × ');
  if (Math.abs(us) > 8) {
    factorsText += ` × ... (${Math.abs(us)} adet ${taban})`;
  }

  const formattedFormula = isNegative
    ? `${taban}^(${us}) = 1 / (${factorsText}) = ${finalResult}`
    : `${taban}^${us} = ${factorsText} = ${finalResult}`;

  return {
    taban,
    us,
    finalResult,
    isOverflow,
    steps,
    formattedFormula
  };
}

export function downloadJavaFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
