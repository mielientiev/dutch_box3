import { System3Result } from '../../types';

interface System3DetailProps {
  results: System3Result[];
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function System3Detail({ results }: System3DetailProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-700">
      <table className="w-full text-sm">
        <thead className="bg-slate-900/50">
          <tr>
            <th className="table-header">Year</th>
            <th className="table-header">Asset Value</th>
            <th className="table-header text-green-400">Tax Free</th>
            <th className="table-header">Fictional Return</th>
            <th className="table-header text-red-400">Tax Paid</th>
            <th className="table-header text-amber-400">End Balance</th>
          </tr>
        </thead>
        <tbody>
          {results.map((row) => (
            <tr key={row.year} className="table-row">
              <td className="table-cell font-medium text-white">{row.year}</td>
              <td className="table-cell">{formatCurrency(row.assetValue)}</td>
              <td className="table-cell text-green-400">{formatCurrency(row.taxFreeThreshold)}</td>
              <td className="table-cell">{formatCurrency(row.fictionalReturn)}</td>
              <td className="table-cell text-red-400">{formatCurrency(row.taxPaid)}</td>
              <td className="table-cell font-semibold text-amber-300">{formatCurrency(row.endBalance)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
