import type { PokemonSpecies, Nature, FinalStats } from "@/domain/pokemon";
import { STAT_FIELDS } from "../StatsSetup";
import { FinalStatsDisplay } from "../FinalDisplay";
interface PokemonSummaryProps {
  pokemon: PokemonSpecies;
  nature: Nature;
  finalStats: FinalStats;
}

export function PokemonSummary({
  pokemon,
  finalStats,
  nature,
}: PokemonSummaryProps) {
  const increasedStat = STAT_FIELDS.find(
    (stat) => stat.key === nature.increasedStat,
  );

  const decreasedStat = STAT_FIELDS.find(
    (stat) => stat.key === nature.decreasedStat,
  );

  return (
    <section className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
      <div className="text-center">
        {pokemon.image && (
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="mx-auto h-40 w-40 object-contain"
          />
        )}
        <h2 className="mt-2 text-2xl font-bold capitalize">{pokemon.name}</h2>
        <div className="mt-2 flex justify-center gap-2">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className="rounded-full bg-slate-700 px-3 py-1 text-xs capitalize"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
      <p className="mt-1 font-semibold capitalize">
        {nature.name}

        {increasedStat && decreasedStat && (
          <span className="ml-2 text-sm font-normal text-slate-400">
            (+{increasedStat.label}, -{decreasedStat.label})
          </span>
        )}
      </p>

      <FinalStatsDisplay stats={finalStats} nature={nature} />
    </section>
  );
}
