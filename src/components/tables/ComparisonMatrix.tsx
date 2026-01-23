import { SimulationOutput } from '../../types';

interface ComparisonMatrixProps {
  results: SimulationOutput;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function ComparisonMatrix({ results }: ComparisonMatrixProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-700">
      <table className="w-full text-sm">
        <thead className="bg-slate-900/50">
          <tr>
            <th className="table-header">Year</th>
            <th className="table-header text-violet-400">System 1 Balance</th>
            <th className="table-header text-emerald-400">System 2 Balance</th>
            <th className="table-header text-amber-400">System 3 Balance</th>
          </tr>
        </thead>
        <tbody>
          {results.system1.map((s1, index) => (
            <tr key={s1.year} className="table-row">
              <td className="table-cell font-medium text-white">{s1.year}</td>
              <td className="table-cell text-violet-300">{formatCurrency(s1.endBalance)}</td>
              <td className="table-cell text-emerald-300">{formatCurrency(results.system2[index].endBalance)}</td>
              <td className="table-cell text-amber-300">{formatCurrency(results.system3[index].endBalance)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
