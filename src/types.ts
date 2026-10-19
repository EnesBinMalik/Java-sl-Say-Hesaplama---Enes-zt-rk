export interface IterationStep {
  stepNumber: number;
  i: number;
  condition: boolean;
  previousSonuc: number;
  operationText: string;
  newSonuc: number;
  explanation: string;
}

export interface CalculationResult {
  taban: number;
  us: number;
  finalResult: number;
  isOverflow: boolean;
  steps: IterationStep[];
  formattedFormula: string;
}

export interface Preset {
  label: string;
  taban: number;
  us: number;
  note: string;
}

export interface CodeVariant {
  id: 'standard' | 'advanced' | 'method';
  title: string;
  badge: string;
  description: string;
  filename: string;
  code: string;
  lineExplanations: Record<number, string>;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
