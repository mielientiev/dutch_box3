import { UserInputs, System1Config, System1Result } from '../../types';
import { createGrowthResolver } from '../growthResolver';

export function calculateSystem1(inputs: UserInputs, config: System1Config): System1Result[] {
  const results: System1Result[] = [];
  let currentBalance = inputs.initialSum;
  let accumulatedLossBucket = 0;
  const growthResolver = createGrowthResolver(inputs.growth);

  for (let year = 1; year <= inputs.years; year++) {
    const startBalance = currentBalance;
    const deposits = inputs.monthlyDeposit * 12;

    // Balance after deposits but before growth
    const balanceAfterDeposits = startBalance + deposits;

    // Apply growth
    const growthRate = growthResolver.getRate(year);
    const growth = balanceAfterDeposits * growthRate;
    const grossBalance = balanceAfterDeposits + growth;

    // Calculate gross profit for the year
    const grossProfit = grossBalance - balanceAfterDeposits;

    // Calculate taxable income with loss bucket
    let taxableIncome = 0;

    if (grossProfit < 0) {
      // Loss this year - only carry forward if loss exceeds threshold
      const absLoss = Math.abs(grossProfit);
      if (absLoss > config.lossThreshold) {
        accumulatedLossBucket += absLoss;
      }
      // else: loss ≤ threshold, written off entirely
      taxableIncome = 0;
    } else {
      // Gain this year - offset with loss bucket
      const netGain = grossProfit - accumulatedLossBucket;

      if (netGain < 0) {
        // Still have losses left
        accumulatedLossBucket = Math.abs(netGain);
        taxableIncome = 0;
      } else {
        // Loss bucket exhausted
        accumulatedLossBucket = 0;
        taxableIncome = netGain;
      }
    }

    // Calculate tax after allowance
    const taxableAfterAllowance = Math.max(0, taxableIncome - config.taxFreeAllowance);
    const taxPaid = taxableAfterAllowance * config.taxRate;

    // Final balance after tax
    currentBalance = grossBalance - taxPaid;

    results.push({
      year,
      startBalance,
      deposits,
      grossBalance,
      taxPaid,
      endBalance: currentBalance,
      grossProfit,
      accumulatedLossBucket,
      taxableIncome,
    });
  }

  return results;
}
