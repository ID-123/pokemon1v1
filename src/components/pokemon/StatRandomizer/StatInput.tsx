interface StatInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  error?: string;
  onChange: (value: string) => void;
}

function StatInput({
  label,
  value,
  min,
  max,
  error,
  onChange,
}: StatInputProps) {
  const hasError = Boolean(error);

  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium">{label}</span>
      <input
        type="number"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`rounded-lg border bg-slate-800 px-3 py-2 outline-none transition ${hasError ? "border-red-500" : "border-slate-600 focus:border-blue-500"}`}
      />
    </label>
  );
}

export default StatInput;
