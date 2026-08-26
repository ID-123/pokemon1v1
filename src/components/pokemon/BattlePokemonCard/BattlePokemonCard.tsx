import { PokemonSummary } from "./Summary/PokemonSummary";
import { StatRandomizer } from "./StatsSetup/StatRandomizer";
import { useBattlePokemon } from "./hooks";
import type { PokemonSpecies } from "@/domain/pokemon";

interface BattlePokemonCardProps {
  pokemon: PokemonSpecies;
}

export function BattlePokemonCard({ pokemon }: BattlePokemonCardProps) {
  const {
    stats,
    nature,
    finalStats,
    updateStat,
    resetStats,
    natureName,
    setNatureName,
  } = useBattlePokemon(pokemon);

  return (
    <div className="mx-auto w-full max-w-6xl rounded-2xl border border-slate-700 bg-slate-900 text-white shadow-lg p-6">
      <header className="mb-6">
        <h2 className="text-2xl font-bold">Pokemon Lab</h2>
        <p className="mt-1 text-sm text-slate-400">Setup your Pokemon</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Summary */}
        <PokemonSummary
          pokemon={pokemon}
          nature={nature}
          finalStats={finalStats}
        />

        {/* Configuration */}
        <div className="lg:col-span-3">
          <StatRandomizer
            pokemon={pokemon}
            stats={stats}
            onStatChange={updateStat}
            onStatsReset={resetStats}
            natureName={natureName}
            onNatureChange={setNatureName}
          />
        </div>
      </div>
    </div>
  );
}
