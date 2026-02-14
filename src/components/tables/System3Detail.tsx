import { System3Result, StockYearData } from '../../types';

interface System3DetailProps {
  results: System3Result[];
  stockData?: StockYearData[];
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

export function System3Detail({ results, stockData }: System3DetailProps) {
  const hasStock = !!stockData;

  return (
    <div className="overflow-x-auto rounded-xl border border-th-border">
      <table className="w-full text-sm">
        <thead className="bg-surface-elevated/50">
          <tr>
            <th className="table-header">Year</th>
            <th className="table-header">Asset Value</th>
            <th className="table-header text-green-400">Tax Free</th>
            <th className="table-header">Fictional Return</th>
            <th className="table-header text-red-400">Tax Paid</th>
            <th className="table-header text-amber-400">End Balance</th>
            {hasStock && <th className="table-header text-blue-400">Stock Price</th>}
            {hasStock && <th className="table-header text-green-400">Shares Bought</th>}
            {hasStock && <th className="table-header text-red-400">Shares Sold</th>}
            {hasStock && <th className="table-header text-amber-400">Shares Owned</th>}
          </tr>
        </thead>
        <tbody>
          {results.map((row, index) => (
            <tr key={row.year} className="table-row">
              <td className="table-cell font-medium text-content">{row.year}</td>
              <td className="table-cell">{formatCurrency(row.assetValue)}</td>
              <td className="table-cell text-green-400">{formatCurrency(row.taxFreeThreshold)}</td>
              <td className="table-cell">{formatCurrency(row.fictionalReturn)}</td>
              <td className="table-cell text-red-400">{formatCurrency(row.taxPaid)}</td>
              <td className="table-cell font-semibold text-amber-300">{formatCurrency(row.endBalance)}</td>
              {hasStock && (
                <td className="table-cell text-blue-300">{formatPrice(stockData[index].stockPrice)}</td>
              )}
              {hasStock && (
                <td className="table-cell text-green-400">{formatShares(stockData[index].sharesBought)}</td>
              )}
              {hasStock && (
                <td className="table-cell text-red-400">{formatShares(stockData[index].sharesSold)}</td>
              )}
              {hasStock && (
                <td className="table-cell font-semibold text-amber-300">{formatShares(stockData[index].sharesOwned)}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
