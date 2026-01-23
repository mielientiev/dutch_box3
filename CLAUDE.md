# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - TypeScript compilation + Vite production build
- `npm run preview` - Preview production build locally

No test framework is configured.

## Architecture

This is a Dutch tax calculator React application that simulates investment growth under 3 different tax regimes and compares them against a tax-free benchmark.

### Tax Systems

The three Dutch tax systems modeled in `src/lib/taxSystems/`:

- **System 1** (Unrealized Gains): Annual tax on gains with loss bucket carryforward and tax-free allowance
- **System 2** (Realized Gains): Deferred taxation - tax only paid in final year on total capital gains
- **System 3** (Wealth Tax): Annual tax based on fictional return rate applied to wealth above threshold

### Core Data Flow

1. `UserInputs` (initial sum, monthly deposit, growth rate, years) + `TaxSystemsConfig` feed into `runSimulation()`
2. `src/lib/simulation.ts` orchestrates all calculations and computes efficiency scores (% of benchmark retained)
3. Each tax system calculator returns year-by-year results with system-specific fields

### Component Structure

- `App.tsx` - Main state holder, connects inputs to simulation results
- `InputPanel` - User inputs + expandable advanced tax config per system
- `SummaryTable` / `LineChart` / `DrillDownTabs` - Results visualization using Recharts

### Types

All TypeScript interfaces in `src/types/index.ts`. Each tax system has its own result interface extending `YearlyResult` with system-specific fields (e.g., `accumulatedLossBucket` for System 1, `deferredTaxLiability` for System 2).

## Tech Stack

- React 18 + TypeScript + Vite
- Tailwind CSS for styling
- Recharts for data visualization
