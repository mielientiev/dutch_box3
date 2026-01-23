import { useState } from 'react';
import { InputPanel } from './components/InputPanel';
import { SummaryTable } from './components/SummaryTable';
import { LineChart } from './components/LineChart';
import { DrillDownTabs } from './components/DrillDownTabs';
import { runSimulation, defaultUserInputs, defaultTaxSystemsConfig } from './lib/simulation';
import { UserInputs, TaxSystemsConfig, SimulationOutput } from './types';

function App() {
  const [inputs, setInputs] = useState<UserInputs>(defaultUserInputs);
  const [config, setConfig] = useState<TaxSystemsConfig>(defaultTaxSystemsConfig);
  const [results, setResults] = useState<SimulationOutput | null>(null);

  const handleRunSimulation = () => {
    const simulationResults = runSimulation(inputs, config);
    setResults(simulationResults);
    // Scroll to results smoothly
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/25 mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400 mb-4">
            Dutch Tax Calculator
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Compare 3 Dutch tax regimes and optimize your investment strategy
          </p>
        </header>

        <div className="space-y-8">
          <InputPanel
            inputs={inputs}
            config={config}
            onInputsChange={setInputs}
            onConfigChange={setConfig}
            onRunSimulation={handleRunSimulation}
          />

          {results && (
            <div id="results" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <SummaryTable results={results} />
              <LineChart results={results} />
              <DrillDownTabs results={results} />
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-slate-500 space-y-2">
          <div className="flex flex-wrap justify-center gap-6 text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-500"></span>
              <span><strong className="text-slate-300">System 1:</strong> Unrealized Gains (Annual)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span><strong className="text-slate-300">System 2:</strong> Realized Gains (Deferred)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span><strong className="text-slate-300">System 3:</strong> Wealth Tax</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
