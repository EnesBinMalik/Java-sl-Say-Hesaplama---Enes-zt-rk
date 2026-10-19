/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { SimulatorSection } from './components/SimulatorSection';
import { JavaCodeViewer } from './components/JavaCodeViewer';
import { LoopExplainer } from './components/LoopExplainer';
import { QuizSection } from './components/QuizSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950">
      <Header />
      <main className="flex-1">
        <HeroBanner />
        <SimulatorSection />
        <JavaCodeViewer />
        <LoopExplainer />
        <QuizSection />
      </main>
      <Footer />
    </div>
  );
}
