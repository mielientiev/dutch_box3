import { UserInputs, TaxSystemsConfig, SimulationOutput } from '../types';
import { calculateBenchmark } from './benchmark';
import { calculateSystem1 } from './taxSystems/system1';
import { calculateSystem2 } from './taxSystems/system2';
import { calculateSystem3 } from './taxSystems/system3';
import { computeStockTracking } from './stockTracker';

export function runSimulation(inputs: UserInputs, config: TaxSystemsConfig): SimulationOutput {
  // Run all simulations
  const benchmark = calculateBenchmark(inputs);
  const system1 = calculateSystem1(inputs, config.system1);
  const system2 = calculateSystem2(inputs, config.system2);
  const system3 = calculateSystem3(inputs, config.system3);

  // Calculate summaries
  const benchmarkFinalBalance = benchmark[benchmark.length - 1].endBalance;

  const system1FinalBalance = system1[system1.length - 1].endBalance;
  const system1TotalTax = system1.reduce((sum, r) => sum + r.taxPaid, 0);
  const system1Efficiency = (system1FinalBalance / benchmarkFinalBalance) * 100;

  const system2FinalBalance = system2[system2.length - 1].endBalance;
  const system2TotalTax = system2.reduce((sum, r) => sum + r.taxPaid, 0);
  const system2Efficiency = (system2FinalBalance / benchmarkFinalBalance) * 100;

  const system3FinalBalance = system3[system3.length - 1].endBalance;
  const system3TotalTax = system3.reduce((sum, r) => sum + r.taxPaid, 0);
  const system3Efficiency = (system3FinalBalance / benchmarkFinalBalance) * 100;

  const stockTracking = inputs.growth.mode === 'sp500'
    ? computeStockTracking(inputs, { benchmark, system1, system2, system3 })
    : undefined;

  return {
    benchmark,
    system1,
    system2,
    system3,
    stockTracking,
    summary: {
      benchmark: {
        finalBalance: benchmarkFinalBalance,
      },
      system1: {
        finalBalance: system1FinalBalance,
        totalTaxPaid: system1TotalTax,
        efficiencyScore: system1Efficiency,
      },
      system2: {
        finalBalance: system2FinalBalance,
        totalTaxPaid: system2TotalTax,
        efficiencyScore: system2Efficiency,
      },
      system3: {
        finalBalance: system3FinalBalance,
        totalTaxPaid: system3TotalTax,
        efficiencyScore: system3Efficiency,
      },
    },
  };
}

// Default configurations
export const defaultTaxSystemsConfig: TaxSystemsConfig = {
  system1: {
    taxRate: 0.36,
    taxFreeAllowance: 1800,
    lossThreshold: 500,
  },
  system2: {
    taxRate: 0.36,
  },
  system3: {
    taxFreeWealthPerPerson: 59357,
    persons: 2,
    fictionalReturnRate: 0.06,
    taxRate: 0.36,
  },
};

// Default user inputs
export const defaultUserInputs: UserInputs = {
  initialSum: 10000,
  monthlyDeposit: 500,
  years: 10,
  growth: { mode: 'fixed', annualGrowthRate: 0.07 },
};
