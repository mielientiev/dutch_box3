import { SimulationOutput, StockTracking } from '../../types';

interface ComparisonMatrixProps {
  results: SimulationOutput;
  stockTracking?: StockTracking;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatShares(value: number): string {
  return value.toFixed(2);
}

function formatPrice(value: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function ComparisonMatrix({ results, stockTracking }: ComparisonMatrixProps) {
  const hasStock = !!stockTracking;

  return (
    <div className="overflow-x-auto rounded-xl border border-th-border">
      <table className="w-full text-sm">
        <thead className="bg-surface-elevated/50">
          <tr>
            <th className="table-header">Year</th>
            {hasStock && <th className="table-header text-blue-400">Price</th>}
            <th className="table-header text-violet-400">Box 3 (2028)</th>
            {hasStock && <th className="table-header text-violet-400">Shares</th>}
            <th className="table-header text-emerald-400">Capital Gain Tax</th>
            {hasStock && <th className="table-header text-emerald-400">Shares</th>}
            <th className="table-header text-amber-400">Box 3 (Fictitious)</th>
            {hasStock && <th className="table-header text-amber-400">Shares</th>}
          </tr>
        </thead>
        <tbody>
          {results.system1.map((s1, index) => (
            <tr key={s1.year} className="table-row">
              <td className="table-cell font-medium text-content">{s1.year}</td>
              {hasStock && (
                <td className="table-cell text-blue-300">{formatPrice(stockTracking.system1[index].stockPrice)}</td>
              )}
              <td className="table-cell text-violet-300">{formatCurrency(s1.endBalance)}</td>
              {hasStock && (
                <td className="table-cell text-violet-300">{formatShares(stockTracking.system1[index].sharesOwned)}</td>
              )}
              <td className="table-cell text-emerald-300">{formatCurrency(results.system2[index].endBalance)}</td>
              {hasStock && (
                <td className="table-cell text-emerald-300">{formatShares(stockTracking.system2[index].sharesOwned)}</td>
              )}
              <td className="table-cell text-amber-300">{formatCurrency(results.system3[index].endBalance)}</td>
              {hasStock && (
                <td className="table-cell text-amber-300">{formatShares(stockTracking.system3[index].sharesOwned)}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
