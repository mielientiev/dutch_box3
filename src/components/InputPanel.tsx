import { useState, useEffect, useRef } from 'react';
import { UserInputs, TaxSystemsConfig } from '../types';

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
  ...props
}: {
  value: number;
  onChange: (value: number) => void;
  displayValue?: number;
} & Omit<React.ComponentProps<'input'>, 'value' | 'onChange'>) {
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
      className="input-field"
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
        <h2 className="text-2xl font-semibold text-white">Investment Parameters</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="space-y-2">
          <label className="label">Initial Sum (€)</label>
          <NumberInput
            value={inputs.initialSum}
            onChange={(v) => updateInput('initialSum', v)}
            min="0"
            step="100"
            placeholder="10000"
          />
        </div>

        <div className="space-y-2">
          <label className="label">Monthly Deposit (€)</label>
          <NumberInput
            value={inputs.monthlyDeposit}
            onChange={(v) => updateInput('monthlyDeposit', v)}
            min="0"
            step="50"
            placeholder="500"
          />
        </div>

        <div className="space-y-2">
          <label className="label">Annual Growth Rate (%)</label>
          <NumberInput
            value={inputs.annualGrowthRate}
            onChange={(v) => updateInput('annualGrowthRate', v / 100)}
            displayValue={inputs.annualGrowthRate * 100}
            min="0"
            max="100"
            step="0.1"
            placeholder="7.0"
          />
        </div>

        <div className="space-y-2">
          <label className="label">Years</label>
          <NumberInput
            value={inputs.years}
            onChange={(v) => updateInput('years', v)}
            min="1"
            max="50"
            placeholder="10"
          />
        </div>
      </div>

      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="btn-secondary text-sm font-medium flex items-center gap-2 mb-6 group"
      >
        <span className={`transform transition-transform duration-200 ${showAdvanced ? 'rotate-180' : ''}`}>
          ▼
        </span>
        {showAdvanced ? 'Hide' : 'Show'} Advanced Tax Options
      </button>

      {showAdvanced && (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
          {/* System 1 Config */}
          <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-violet-500 shadow-lg shadow-violet-500/50"></div>
              <h3 className="text-lg font-semibold text-violet-300">
                System 1: Unrealized Gains (Annual)
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="label text-slate-400">Tax Rate (%)</label>
                <NumberInput
                  value={config.system1.taxRate}
                  onChange={(v) => updateSystem1Config('taxRate', v / 100)}
                  displayValue={config.system1.taxRate * 100}
                  min="0"
                  max="100"
                />
              </div>
              <div className="space-y-2">
                <label className="label text-slate-400">Tax Free Allowance (€)</label>
                <NumberInput
                  value={config.system1.taxFreeAllowance}
                  onChange={(v) => updateSystem1Config('taxFreeAllowance', v)}
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* System 2 Config */}
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50"></div>
              <h3 className="text-lg font-semibold text-emerald-300">
                System 2: Realized Gains (Deferred)
              </h3>
            </div>
            <div className="space-y-2">
              <label className="label text-slate-400">Tax Rate (%)</label>
              <NumberInput
                value={config.system2.taxRate}
                onChange={(v) => updateSystem2Config('taxRate', v / 100)}
                displayValue={config.system2.taxRate * 100}
                min="0"
                max="100"
              />
            </div>
          </div>

          {/* System 3 Config */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50"></div>
              <h3 className="text-lg font-semibold text-amber-300">
                System 3: Wealth Tax / Fictional Return
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="label text-slate-400">Tax Free Wealth/Person (€)</label>
                <NumberInput
                  value={config.system3.taxFreeWealthPerPerson}
                  onChange={(v) => updateSystem3Config('taxFreeWealthPerPerson', v)}
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <label className="label text-slate-400">Persons</label>
                <NumberInput
                  value={config.system3.persons}
                  onChange={(v) => updateSystem3Config('persons', v)}
                  min="1"
                  max="10"
                />
              </div>
              <div className="space-y-2">
                <label className="label text-slate-400">Fictional Return Rate (%)</label>
                <NumberInput
                  value={config.system3.fictionalReturnRate}
                  onChange={(v) => updateSystem3Config('fictionalReturnRate', v / 100)}
                  displayValue={config.system3.fictionalReturnRate * 100}
                  min="0"
                  max="100"
                />
              </div>
              <div className="space-y-2">
                <label className="label text-slate-400">Tax Rate (%)</label>
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
        className="btn-primary w-full mt-8 flex items-center justify-center gap-2"
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
