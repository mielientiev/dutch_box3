import { System1Result } from '../../types';

interface System1DetailProps {
  results: System1Result[];
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function System1Detail({ results }: System1DetailProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-700">
      <table className="w-full text-sm">
        <thead className="bg-slate-900/50">
          <tr>
            <th className="table-header">Year</th>
            <th className="table-header">Gross Profit</th>
            <th className="table-header">Loss Bucket</th>
            <th className="table-header">Taxable Income</th>
            <th className="table-header text-red-400">Tax Paid</th>
            <th className="table-header text-violet-400">End Balance</th>
          </tr>
        </thead>
        <tbody>
          {results.map((row) => (
            <tr key={row.year} className="table-row">
              <td className="table-cell font-medium text-white">{row.year}</td>
              <td className="table-cell">{formatCurrency(row.grossProfit)}</td>
              <td className="table-cell">{formatCurrency(row.accumulatedLossBucket)}</td>
              <td className="table-cell">{formatCurrency(row.taxableIncome)}</td>
              <td className="table-cell text-red-400">{formatCurrency(row.taxPaid)}</td>
              <td className="table-cell font-semibold text-violet-300">{formatCurrency(row.endBalance)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
