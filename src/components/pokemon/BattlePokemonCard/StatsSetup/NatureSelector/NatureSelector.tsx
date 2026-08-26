import type { NatureName } from "@/domain/pokemon";
import { NATURES } from "@/domain/pokemon";

interface NatureSelectorProps {
  value: NatureName;
  onChange: (nature: NatureName) => void;
}

export function NatureSelector({ value, onChange }: NatureSelectorProps) {
  return (
    <section className="mt-8">
      <h3 className="text-lg font-semibold">Nature</h3>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value as NatureName)}
        className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2"
      >
        {Object.keys(NATURES).map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </section>
  );
}
