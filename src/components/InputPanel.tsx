import { useState, useEffect, useRef, useMemo } from 'react';
import { UserInputs, TaxSystemsConfig, GrowthConfig } from '../types';
import { validateYearRange, getYearsFromRange, SP500_MIN_YEAR, SP500_MAX_YEAR } from '../data/sp500Returns';

interface InputPanelProps {
  inputs: UserInputs;
  config: TaxSystemsConfig;
  onInputsChange: (inputs: UserInputs) => void;
  onConfigChange: (config: TaxSystemsConfig) => void;
  onRunSimulation: () => void;
}

function NumberInput({
  value,
  onChange,
  displayValue,
  className,
  disabled,
  ...props
}: {
  value: number;
  onChange: (value: number) => void;
  displayValue?: number;
  className?: string;
  disabled?: boolean;
} & Omit<React.ComponentProps<'input'>, 'value' | 'onChange' | 'className' | 'disabled'>) {
  const effectiveValue = displayValue !== undefined ? displayValue : value;
  const formattedValue = Number(effectiveValue.toPrecision(12));
  const [localValue, setLocalValue] = useState<string>(String(formattedValue));
  const isFocused = useRef(false);

  useEffect(() => {
    if (!isFocused.current) {
      setLocalValue(String(formattedValue));
    }
  }, [formattedValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);

    if (newValue === '') {
      onChange(0);
    } else {
      const num = Number(newValue);
      if (!isNaN(num)) {
        onChange(num);
      }
    }
  };

  const handleFocus = () => {
    isFocused.current = true;
  };

  const handleBlur = () => {
    isFocused.current = false;
    setLocalValue(String(formattedValue));
  };

  return (
    <input
      type="number"
      value={localValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={className || "input-field"}
      disabled={disabled}
      {...props}
    />
  );
}

export function InputPanel({
  inputs,
  config,
  onInputsChange,
  onConfigChange,
  onRunSimulation,
}: InputPanelProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateInput = (field: keyof UserInputs, value: number) => {
    onInputsChange({ ...inputs, [field]: value });
  };

  const updateGrowthConfig = (growth: GrowthConfig) => {
    if (growth.mode === 'sp500') {
      const years = getYearsFromRange(growth.startYear, growth.endYear);
      onInputsChange({ ...inputs, growth, years });
    } else {
      onInputsChange({ ...inputs, growth });
    }
  };

  const growthValidation = useMemo(() => {
    if (inputs.growth.mode === 'sp500') {
      return validateYearRange(inputs.growth.startYear, inputs.growth.endYear);
    }
    return { valid: true } as const;
  }, [inputs.growth]);

  const isSimulationDisabled = !growthValidation.valid;
  const isSP500Mode = inputs.growth.mode === 'sp500';

  const updateSystem1Config = (field: keyof TaxSystemsConfig['system1'], value: number) => {
    onConfigChange({
      ...config,
      system1: { ...config.system1, [field]: value },
    });
  };

  const updateSystem2Config = (field: keyof TaxSystemsConfig['system2'], value: number) => {
    onConfigChange({
      ...config,
      system2: { ...config.system2, [field]: value },
    });
  };

  const updateSystem3Config = (field: keyof TaxSystemsConfig['system3'], value: number) => {
    onConfigChange({
      ...config,
      system3: { ...config.system3, [field]: value },
    });
  };

  return (
    <div className="card p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-xl bg-violet-500/20">
          <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-content">Investment Parameters</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="space-y-2">
          <label className="label">Initial Sum (&euro;)</label>
          <NumberInput
            value={inputs.initialSum}
            onChange={(v) => updateInput('initialSum', v)}
            min="0"
            step="100"
            placeholder="10000"
          />
        </div>

        <div className="space-y-2">
          <label className="label">Monthly Deposit (&euro;)</label>
          <NumberInput
            value={inputs.monthlyDeposit}
            onChange={(v) => updateInput('monthlyDeposit', v)}
            min="0"
            step="50"
            placeholder="500"
          />
        </div>

        <div className="space-y-2">
          <label className={`label ${isSP500Mode ? 'text-content-dimmed' : ''}`}>
            Years {isSP500Mode && <span className="text-xs">(from date range)</span>}
          </label>
          <NumberInput
            value={inputs.years}
            onChange={(v) => updateInput('years', v)}
            min="1"
            max="99"
            placeholder="10"
            disabled={isSP500Mode}
            className={isSP500Mode ? 'input-field opacity-50 cursor-not-allowed' : 'input-field'}
          />
        </div>
      </div>

      {/* Growth Rate Section */}
      <div className="mb-8">
        <label className="label mb-3 block">Growth Rate</label>
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => updateGrowthConfig({ mode: 'fixed', annualGrowthRate: 0.07 })}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              inputs.growth.mode === 'fixed'
                ? 'bg-violet-500 text-white'
                : 'bg-surface-active text-content-secondary hover:bg-surface-hover'
            }`}
          >
            Fixed Rate
          </button>
          <button
            onClick={() => updateGrowthConfig({ mode: 'sp500', startYear: 2010, endYear: 2026 })}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              inputs.growth.mode === 'sp500'
                ? 'bg-violet-500 text-white'
                : 'bg-surface-active text-content-secondary hover:bg-surface-hover'
            }`}
          >
            S&P 500 Historical
          </button>
        </div>

        {inputs.growth.mode === 'fixed' ? (
          <div className="space-y-2">
            <label className="label text-content-muted">Annual Growth Rate (%)</label>
            <NumberInput
              value={inputs.growth.annualGrowthRate}
              onChange={(v) => updateGrowthConfig({ mode: 'fixed', annualGrowthRate: v / 100 })}
              displayValue={inputs.growth.annualGrowthRate * 100}
              min="-100"
              max="100"
              step="0.1"
              placeholder="7.0"
            />
          </div>
        ) : (() => {
          const sp500Config = inputs.growth;
          const yearOptions = Array.from(
            { length: SP500_MAX_YEAR - SP500_MIN_YEAR + 1 },
            (_, i) => SP500_MIN_YEAR + i
          );
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="label text-content-muted">Start Year</label>
                  <select
                    value={sp500Config.startYear}
                    onChange={(e) => updateGrowthConfig({
                      mode: 'sp500',
                      startYear: Number(e.target.value),
                      endYear: sp500Config.endYear
                    })}
                    className="input-field"
                  >
                    {yearOptions.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="label text-content-muted">End Year</label>
                  <select
                    value={sp500Config.endYear}
                    onChange={(e) => updateGrowthConfig({
                      mode: 'sp500',
                      startYear: sp500Config.startYear,
                      endYear: Number(e.target.value)
                    })}
                    className="input-field"
                  >
                    {yearOptions.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
              {!growthValidation.valid && (
                <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  {growthValidation.error}
                </div>
              )}
            </div>
          );
        })()}
      </div>

      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="btn-secondary text-sm font-medium flex items-center gap-2 mb-6 group"
      >
        <span className={`transform transition-transform duration-200 ${showAdvanced ? 'rotate-180' : ''}`}>
          &#9660;
        </span>
        {showAdvanced ? 'Hide' : 'Show'} Advanced Tax Options
      </button>

      {showAdvanced && (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
          {/* Box 3 (2028) Config */}
          <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-violet-500 shadow-lg shadow-violet-500/50"></div>
              <h3 className="text-lg font-semibold text-violet-300">
                Box 3 (2028): Unrealized Tax
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="label text-content-muted">Tax Rate (%)</label>
                <NumberInput
                  value={config.system1.taxRate}
                  onChange={(v) => updateSystem1Config('taxRate', v / 100)}
                  displayValue={config.system1.taxRate * 100}
                  min="0"
                  max="100"
                />
              </div>
              <div className="space-y-2">
                <label className="label text-content-muted">Tax Free Allowance (&euro;)</label>
                <NumberInput
                  value={config.system1.taxFreeAllowance}
                  onChange={(v) => updateSystem1Config('taxFreeAllowance', v)}
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <label className="label text-content-muted">Loss Threshold (&euro;)</label>
                <NumberInput
                  value={config.system1.lossThreshold}
                  onChange={(v) => updateSystem1Config('lossThreshold', v)}
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Capital Gain Tax Config */}
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50"></div>
              <h3 className="text-lg font-semibold text-emerald-300">
                Capital Gain Tax (Realized)
              </h3>
            </div>
            <div className="space-y-2">
              <label className="label text-content-muted">Tax Rate (%)</label>
              <NumberInput
                value={config.system2.taxRate}
                onChange={(v) => updateSystem2Config('taxRate', v / 100)}
                displayValue={config.system2.taxRate * 100}
                min="0"
                max="100"
              />
            </div>
          </div>

          {/* Box 3 (Fictitious Return) Config */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50"></div>
              <h3 className="text-lg font-semibold text-amber-300">
                Box 3 (Fictitious Return)
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="label text-content-muted">Tax Free Wealth/Person (&euro;)</label>
                <NumberInput
                  value={config.system3.taxFreeWealthPerPerson}
                  onChange={(v) => updateSystem3Config('taxFreeWealthPerPerson', v)}
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <label className="label text-content-muted">Persons</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateSystem3Config('persons', 1)}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      config.system3.persons === 1
                        ? 'bg-amber-500 text-white'
                        : 'bg-surface-active text-content-secondary hover:bg-surface-hover'
                    }`}
                  >
                    1
                  </button>
                  <button
                    onClick={() => updateSystem3Config('persons', 2)}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      config.system3.persons === 2
                        ? 'bg-amber-500 text-white'
                        : 'bg-surface-active text-content-secondary hover:bg-surface-hover'
                    }`}
                  >
                    2
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="label text-content-muted">Fictional Return Rate (%)</label>
                <NumberInput
                  value={config.system3.fictionalReturnRate}
                  onChange={(v) => updateSystem3Config('fictionalReturnRate', v / 100)}
                  displayValue={config.system3.fictionalReturnRate * 100}
                  min="0"
                  max="100"
                />
              </div>
              <div className="space-y-2">
                <label className="label text-content-muted">Tax Rate (%)</label>
                <NumberInput
                  value={config.system3.taxRate}
                  onChange={(v) => updateSystem3Config('taxRate', v / 100)}
                  displayValue={config.system3.taxRate * 100}
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={onRunSimulation}
        disabled={isSimulationDisabled}
        className={`w-full mt-8 flex items-center justify-center gap-2 ${
          isSimulationDisabled ? 'btn-secondary opacity-50 cursor-not-allowed' : 'btn-primary'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Run Simulation
      </button>
    </div>
  );
}
