import { useState } from 'react';
import { SimulationOutput } from '../types';
import { ComparisonMatrix } from './tables/ComparisonMatrix';
import { System1Detail } from './tables/System1Detail';
import { System2Detail } from './tables/System2Detail';
import { System3Detail } from './tables/System3Detail';

interface DrillDownTabsProps {
  results: SimulationOutput | null;
}

type TabType = 'comparison' | 'system1' | 'system2' | 'system3';

const tabs = [
  { id: 'comparison' as TabType, label: 'Comparison', color: 'text-slate-400', bg: 'bg-slate-500' },
  { id: 'system1' as TabType, label: 'System 1', color: 'text-violet-400', bg: 'bg-violet-500' },
  { id: 'system2' as TabType, label: 'System 2', color: 'text-emerald-400', bg: 'bg-emerald-500' },
  { id: 'system3' as TabType, label: 'System 3', color: 'text-amber-400', bg: 'bg-amber-500' },
];

export function DrillDownTabs({ results }: DrillDownTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('comparison');

  if (!results) {
    return (
      <div className="card p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-slate-700/50">
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-white">Detailed Breakdown</h2>
        </div>
        <p className="text-slate-400">Run a simulation to see detailed breakdowns.</p>
      </div>
    );
  }

  return (
    <div className="card p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-xl bg-slate-700/50">
          <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-white">Detailed Breakdown</h2>
      </div>

      {/* Tab Buttons */}
      <div className="flex flex-wrap gap-2 mb-8 p-1 bg-slate-900/50 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-slate-700 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${tab.bg} ${activeTab === tab.id ? 'shadow-lg' : ''}`}></span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={`animate-in fade-in slide-in-from-bottom-2 duration-300`}>
        {activeTab === 'comparison' && <ComparisonMatrix results={results} />}
        {activeTab === 'system1' && <System1Detail results={results.system1} />}
        {activeTab === 'system2' && <System2Detail results={results.system2} />}
        {activeTab === 'system3' && <System3Detail results={results.system3} />}
      </div>
    </div>
  );
}
