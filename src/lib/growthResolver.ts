import { GrowthConfig } from '../types';
import { getReturnForYear } from '../data/sp500Returns';

export interface GrowthRateResolver {
  getRate(simulationYear: number): number;
}

export function createGrowthResolver(growth: GrowthConfig): GrowthRateResolver {
  if (growth.mode === 'fixed') {
    return {
      getRate: () => growth.annualGrowthRate,
    };
  }

  // SP500 mode
  return {
    getRate: (simulationYear: number) => {
      const calendarYear = growth.startYear + simulationYear - 1;
      return getReturnForYear(calendarYear);
    },
  };
}
