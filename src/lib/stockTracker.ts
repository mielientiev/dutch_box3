import { UserInputs, YearlyResult, StockYearData, StockTracking } from '../types';
import { getYearEndPrice } from '../data/sp500Prices';

function buildStockData(
  yearlyResults: YearlyResult[],
  startYear: number,
): StockYearData[] {
  return yearlyResults.map((row) => {
    const calendarYear = startYear + row.year - 1;
    const stockPrice = getYearEndPrice(calendarYear);
    return {
      year: row.year,
      calendarYear,
      stockPrice,
      sharesOwned: row.endBalance / stockPrice,
      sharesBought: row.deposits / stockPrice,
      sharesSold: row.taxPaid / stockPrice,
    };
  });
}

export function computeStockTracking(
  inputs: UserInputs,
  results: {
    benchmark: YearlyResult[];
    system1: YearlyResult[];
    system2: YearlyResult[];
    system3: YearlyResult[];
  },
): StockTracking {
  if (inputs.growth.mode !== 'sp500') {
    throw new Error('Stock tracking is only available in S&P 500 mode');
  }

  const startYear = inputs.growth.startYear;
  const initialPrice = getYearEndPrice(startYear - 1);
  const initialShares = inputs.initialSum / initialPrice;

  return {
    initialPrice,
    initialShares,
    benchmark: buildStockData(results.benchmark, startYear),
    system1: buildStockData(results.system1, startYear),
    system2: buildStockData(results.system2, startYear),
    system3: buildStockData(results.system3, startYear),
  };
}
