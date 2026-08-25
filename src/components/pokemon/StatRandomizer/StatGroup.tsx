import type { Stats, StatName } from "@/domain/pokemon";
import StatInput from "./StatInput";

interface StatField {
  key: StatName;
  label: string;
}

interface StatGroupProps<T extends Stats> {
  title: string;
  description: string;
  stats: T;
  fields: StatField[];
  min: number;
  max: number;
  onChange: (stat: StatName, value: string) => void;
}

function StatGroup<T extends Stats>({
  title,
  description,
  stats,
  fields,
  min,
  max,
  onChange,
}: StatGroupProps<T>) {
  return (
    <section className="mt-8">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>

        <p className="text-sm text-slate-400">{description}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((stat) => {
          const value = stats[stat.key];

          const isValid =
            Number.isInteger(value) && value >= min && value <= max;

          return (
            <StatInput
              key={stat.key}
              label={stat.label}
              value={value}
              min={min}
              max={max}
              error={
                isValid
                  ? undefined
                  : `Debe ser un entero entre ${min} y ${max}.`
              }
              onChange={(value) => onChange(stat.key, value)}
            />
          );
        })}
      </div>
    </section>
  );
}

export default StatGroup;
