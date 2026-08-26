import type { PokemonSpecies, NatureName, FinalStats } from "@/domain/pokemon";
import FinalStatsDisplay from "./FinalStatsDisplay";

interface PokemonSummaryProps {
  pokemon: PokemonSpecies;
  natureName: NatureName;
  finalStats: FinalStats;
}

function PokemonSummary({
  pokemon,
  natureName,
  finalStats,
}: PokemonSummaryProps) {
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
      <div className="mt-6">
        <p className="text-sm text-slate-400">Nature</p>
        <p className="mt-1 font-semibold capitalize">{natureName}</p>
      </div>
      <FinalStatsDisplay stats={finalStats} />
    </section>
  );
}

export default PokemonSummary;
