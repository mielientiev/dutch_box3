export interface FixedGrowthConfig {
  mode: 'fixed';
  annualGrowthRate: number; // decimal (0.07 = 7%)
}

export interface SP500GrowthConfig {
  mode: 'sp500';
  startYear: number;
  endYear: number;
}

export type GrowthConfig = FixedGrowthConfig | SP500GrowthConfig;

export interface UserInputs {
  initialSum: number;
  monthlyDeposit: number;
  years: number;
  growth: GrowthConfig;
}

export interface System1Config {
  taxRate: number;          // default 0.36
  taxFreeAllowance: number; // default 1800
  lossThreshold: number;    // default 500 — losses ≤ threshold are written off, losses > threshold carry forward in full
}

export interface System2Config {
  taxRate: number;          // default 0.36
}

export interface System3Config {
  taxFreeWealthPerPerson: number; // default 59357
  persons: number;                // default 1
  fictionalReturnRate: number;    // default 0.06
  taxRate: number;                // default 0.36
}

export interface TaxSystemsConfig {
  system1: System1Config;
  system2: System2Config;
  system3: System3Config;
}

export interface YearlyResult {
  year: number;
  startBalance: number;
  deposits: number;
  grossBalance: number;
  taxPaid: number;
  endBalance: number;
}

export interface System1Result extends YearlyResult {
  grossProfit: number;
  accumulatedLossBucket: number;
  taxableIncome: number;
}

export interface System2Result extends YearlyResult {
  investedCapital: number;
  deferredTaxLiability: number;
}

export interface System3Result extends YearlyResult {
  assetValue: number;
  taxFreeThreshold: number;
  fictionalReturn: number;
}

export interface StockYearData {
  year: number;
  calendarYear: number;
  stockPrice: number;
  sharesOwned: number;
  sharesBought: number;
  sharesSold: number;
}

export interface StockTracking {
  initialPrice: number;
  initialShares: number;
  benchmark: StockYearData[];
  system1: StockYearData[];
  system2: StockYearData[];
  system3: StockYearData[];
}

export interface SimulationOutput {
  benchmark: YearlyResult[];
  system1: System1Result[];
  system2: System2Result[];
  system3: System3Result[];
  summary: {
    benchmark: { finalBalance: number };
    system1: { finalBalance: number; totalTaxPaid: number; efficiencyScore: number };
    system2: { finalBalance: number; totalTaxPaid: number; efficiencyScore: number };
    system3: { finalBalance: number; totalTaxPaid: number; efficiencyScore: number };
  };
  stockTracking?: StockTracking;
}
