import { UserInputs, YearlyResult } from '../types';

export function calculateBenchmark(inputs: UserInputs): YearlyResult[] {
  const results: YearlyResult[] = [];
  let currentBalance = inputs.initialSum;

  for (let year = 1; year <= inputs.years; year++) {
    const startBalance = currentBalance;
    const deposits = inputs.monthlyDeposit * 12;

    // Apply growth to starting balance
    const growth = startBalance * inputs.annualGrowthRate;

    // Add deposits (simplified: deposits added at end of year, no growth in first year)
    currentBalance = startBalance + growth + deposits;

    results.push({
      year,
      startBalance,
      deposits,
      grossBalance: currentBalance,
      taxPaid: 0,
      endBalance: currentBalance,
    });
  }

  return results;
}
