import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { SimulationOutput } from '../types';

interface LineChartProps {
  results: SimulationOutput | null;
}

function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return '€' + (value / 1000000).toFixed(1) + 'M';
  } else if (value >= 1000) {
    return '€' + (value / 1000).toFixed(0) + 'K';
  }
  return '€' + value.toFixed(0);
}

export function LineChart({ results }: LineChartProps) {
  if (!results) {
    return (
      <div className="card p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-slate-700/50">
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-white">Growth Over Time</h2>
        </div>
        <p className="text-slate-400">Run a simulation to see the chart.</p>
      </div>
    );
  }

  const chartData = results.benchmark.map((benchYear, index) => ({
    year: benchYear.year,
    benchmark: results.benchmark[index].endBalance,
    system1: results.system1[index].endBalance,
    system2: results.system2[index].endBalance,
    system3: results.system3[index].endBalance,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-600 rounded-xl shadow-xl p-4">
          <p className="font-semibold text-white mb-3">Year {label}</p>
          {payload.map((entry: any, index: number) => (
            <p
              key={index}
              className="text-sm flex items-center gap-2"
              style={{ color: entry.color }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
              <span className="text-slate-300">{entry.name}:</span>
              <span className="font-semibold text-white">{formatCurrency(entry.value)}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-xl bg-slate-700/50">
          <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-white">Account Balance Over Time</h2>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <RechartsLineChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" strokeOpacity={0.5} />
          <XAxis
            dataKey="year"
            label={{ value: 'Year', position: 'insideBottom', offset: -5, fill: '#94a3b8', fontSize: 12 }}
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8' }}
          />
          <YAxis
            tickFormatter={formatCurrency}
            label={{ value: 'Balance (€)', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 12 }}
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
          />
          <Line
            type="monotone"
            dataKey="benchmark"
            stroke="#64748b"
            strokeWidth={3}
            dot={false}
            name="Benchmark (No Tax)"
            activeDot={{ r: 6, strokeWidth: 0, fill: '#64748b' }}
          />
          <Line
            type="monotone"
            dataKey="system1"
            stroke="#8b5cf6"
            strokeWidth={3}
            dot={false}
            name="System 1 (Unrealized)"
            activeDot={{ r: 6, strokeWidth: 0, fill: '#8b5cf6' }}
          />
          <Line
            type="monotone"
            dataKey="system2"
            stroke="#10b981"
            strokeWidth={3}
            dot={false}
            name="System 2 (Realized)"
            activeDot={{ r: 6, strokeWidth: 0, fill: '#10b981' }}
          />
          <Line
            type="monotone"
            dataKey="system3"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={false}
            name="System 3 (Wealth Tax)"
            activeDot={{ r: 6, strokeWidth: 0, fill: '#f59e0b' }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
