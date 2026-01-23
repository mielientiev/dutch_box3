import { System2Result } from '../../types';

interface System2DetailProps {
  results: System2Result[];
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function System2Detail({ results }: System2DetailProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-700">
      <table className="w-full text-sm">
        <thead className="bg-slate-900/50">
          <tr>
            <th className="table-header">Year</th>
            <th className="table-header">Invested Capital</th>
            <th className="table-header">Account Value</th>
            <th className="table-header text-yellow-400">Deferred Tax</th>
            <th className="table-header text-emerald-400">End Balance</th>
          </tr>
        </thead>
        <tbody>
          {results.map((row) => (
            <tr key={row.year} className="table-row">
              <td className="table-cell font-medium text-white">{row.year}</td>
              <td className="table-cell">{formatCurrency(row.investedCapital)}</td>
              <td className="table-cell">{formatCurrency(row.grossBalance)}</td>
              <td className="table-cell text-yellow-400">{formatCurrency(row.deferredTaxLiability)}</td>
              <td className="table-cell font-semibold text-emerald-300">{formatCurrency(row.endBalance)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
