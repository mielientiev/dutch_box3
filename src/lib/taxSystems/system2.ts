import { UserInputs, System2Config, System2Result } from '../../types';

export function calculateSystem2(inputs: UserInputs, config: System2Config): System2Result[] {
  const results: System2Result[] = [];
  let currentBalance = inputs.initialSum;

  // Calculate total invested capital (initial + all monthly deposits)
  const totalInvested = inputs.initialSum + (inputs.monthlyDeposit * 12 * inputs.years);

  for (let year = 1; year <= inputs.years; year++) {
    const startBalance = currentBalance;
    const deposits = inputs.monthlyDeposit * 12;

    // Apply growth
    const growth = startBalance * inputs.annualGrowthRate;
    currentBalance = startBalance + growth + deposits;

    // Track invested capital at each year
    const investedCapitalSoFar = inputs.initialSum + (inputs.monthlyDeposit * 12 * year);

    let taxPaid = 0;
    let deferredTaxLiability = 0;

    // Only calculate tax liability but don't pay until final year
    if (year < inputs.years) {
      // Accumulate the gain but don't pay tax yet
      const unrealizedGain = currentBalance - investedCapitalSoFar;
      deferredTaxLiability = Math.max(0, unrealizedGain * config.taxRate);
    } else {
      // Final year - pay tax on total capital gain
      const totalCapitalGain = currentBalance - totalInvested;
      taxPaid = Math.max(0, totalCapitalGain * config.taxRate);
      currentBalance -= taxPaid;
    }

    results.push({
      year,
      startBalance,
      deposits,
      grossBalance: currentBalance + taxPaid, // Before tax
      taxPaid,
      endBalance: currentBalance,
      investedCapital: investedCapitalSoFar,
      deferredTaxLiability,
    });
  }

  return results;
}
