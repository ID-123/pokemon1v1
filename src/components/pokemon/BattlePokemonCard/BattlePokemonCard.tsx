import type { PokemonSpecies } from "@/domain/pokemon";
import { PokemonSummary } from "./PokemonSummary";
import { StatRandomizer } from "../StatRandomizer/StatRandomizer";

interface BattlePokemonCardProps {
  pokemon: PokemonSpecies;
}

export function BattlePokemonCard({ pokemon }: BattlePokemonCardProps) {
  return (
    <div className="mx-auto w-full max-w-6xl rounded-2xl border border-slate-700 bg-slate-900 text-white shadow-lg">
      <header className="mb-6">
        <h2 className="text-2xl font-bold">Pokemon Lab</h2>
        <p className="mt-1 text-sm text-slate-400">Setup your Pokemon</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Summary */}
        <PokemonSummary
          pokemon={pokemon}
          natureName="hardy"
          finalStats={pokemon.baseStats}
        />

        {/* Configuration */}
        <div className="lg:col-span-3">
          <StatRandomizer pokemon={pokemon} />
        </div>
      </div>
    </div>
  );
}
