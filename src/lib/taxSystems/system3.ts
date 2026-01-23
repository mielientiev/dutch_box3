import { UserInputs, System3Config, System3Result } from '../../types';

export function calculateSystem3(inputs: UserInputs, config: System3Config): System3Result[] {
  const results: System3Result[] = [];
  let currentBalance = inputs.initialSum;
  const taxFreeThreshold = config.taxFreeWealthPerPerson * config.persons;

  for (let year = 1; year <= inputs.years; year++) {
    const startBalance = currentBalance;
    const deposits = inputs.monthlyDeposit * 12;

    // Apply growth
    const growth = startBalance * inputs.annualGrowthRate;
    const grossBalance = startBalance + growth + deposits;

    // Calculate tax based on wealth above threshold
    const taxableAssets = Math.max(0, grossBalance - taxFreeThreshold);
    const fictionalReturn = taxableAssets * config.fictionalReturnRate;
    const taxPaid = fictionalReturn * config.taxRate;

    // Final balance after tax
    currentBalance = grossBalance - taxPaid;

    results.push({
      year,
      startBalance,
      deposits,
      grossBalance,
      taxPaid,
      endBalance: currentBalance,
      assetValue: grossBalance,
      taxFreeThreshold,
      fictionalReturn,
    });
  }

  return results;
}
