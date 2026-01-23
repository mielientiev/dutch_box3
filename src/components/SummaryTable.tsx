import { SimulationOutput } from '../types';

interface SummaryTableProps {
  results: SimulationOutput | null;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercent(value: number): string {
  return value.toFixed(1) + '%';
}

export function SummaryTable({ results }: SummaryTableProps) {
  if (!results) {
    return (
      <div className="card p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-slate-700/50">
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-white">Simulation Results</h2>
        </div>
        <p className="text-slate-400">Run a simulation to see results.</p>
      </div>
    );
  }

  const { summary } = results;

  const rows = [
    {
      name: 'Benchmark (No Tax)',
      color: 'bg-slate-400',
      shadow: 'shadow-slate-400/50',
      finalBalance: summary.benchmark.finalBalance,
      totalTaxPaid: 0,
      efficiencyScore: 100,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      name: 'System 1 (Unrealized)',
      color: 'bg-violet-500',
      shadow: 'shadow-violet-500/50',
      finalBalance: summary.system1.finalBalance,
      totalTaxPaid: summary.system1.totalTaxPaid,
      efficiencyScore: summary.system1.efficiencyScore,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      name: 'System 2 (Realized)',
      color: 'bg-emerald-500',
      shadow: 'shadow-emerald-500/50',
      finalBalance: summary.system2.finalBalance,
      totalTaxPaid: summary.system2.totalTaxPaid,
      efficiencyScore: summary.system2.efficiencyScore,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      name: 'System 3 (Wealth)',
      color: 'bg-amber-500',
      shadow: 'shadow-amber-500/50',
      finalBalance: summary.system3.finalBalance,
      totalTaxPaid: summary.system3.totalTaxPaid,
      efficiencyScore: summary.system3.efficiencyScore,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="card p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-xl bg-slate-700/50">
          <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-white">Simulation Summary</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="table-header pl-4">System</th>
              <th className="table-header text-right pr-4">Final Net Balance</th>
              <th className="table-header text-right pr-4">Total Tax Paid</th>
              <th className="table-header text-right pr-4">Efficiency Score</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="table-row">
                <td className="table-cell pl-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${row.color} ${row.shadow}`}>
                      {row.icon}
                    </div>
                    <span className="font-medium text-white">{row.name}</span>
                  </div>
                </td>
                <td className="table-cell text-right pr-4">
                  <span className="text-lg font-bold text-white">
                    {formatCurrency(row.finalBalance)}
                  </span>
                </td>
                <td className="table-cell text-right pr-4">
                  <span className={row.totalTaxPaid > 0 ? 'text-red-400' : 'text-slate-500'}>
                    {formatCurrency(row.totalTaxPaid)}
                  </span>
                </td>
                <td className="table-cell text-right pr-4">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-semibold ${
                      row.efficiencyScore >= 90
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : row.efficiencyScore >= 70
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {row.efficiencyScore === 100 ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : null}
                    {formatPercent(row.efficiencyScore)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
