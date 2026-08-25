import type { FinalStats } from "@/domain/pokemon";

interface FinalStatsDisplayProps {
  stats: FinalStats;
  fields: {
    key: keyof FinalStats;
    label: string;
  }[];
}

function FinalStatsDisplay({ stats, fields }: FinalStatsDisplayProps) {
  return (
    <section className="mt-8">
      <header className="mb-4">
        <h3 className="text-lg font-semibold">Final Stats</h3>

        <p className="text-sm text-slate-400">
          Valores calculados según Base Stats, IVs, EVs, Nature y nivel.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {fields.map((stat) => (
          <div
            key={stat.key}
            className="rounded-lg border border-slate-700 bg-slate-800 p-3"
          >
            <span className="text-sm text-slate-400">{stat.label}</span>

            <p className="mt-1 text-xl font-bold">{stats[stat.key]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FinalStatsDisplay;
