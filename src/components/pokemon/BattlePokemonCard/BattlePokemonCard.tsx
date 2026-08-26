import { PokemonSummary } from "./Summary/PokemonSummary";
import { StatsSetup } from "./StatsSetup/StatsSetup";
import { useBattlePokemon } from "./hooks";
import type { PokemonSpecies } from "@/domain/pokemon";
import { FinalStatsDisplay } from "./FinalDisplay/FinalStatsDisplay";

interface BattlePokemonCardProps {
  pokemon: PokemonSpecies;
}

export function BattlePokemonCard({ pokemon }: BattlePokemonCardProps) {
  const battlePokemon = useBattlePokemon(pokemon);
  return (
    <div className="mx-auto w-full rounded-2xl border border-slate-700 bg-slate-900 text-white shadow-lg p-6">
      <header className="mb-6">
        <h2 className="text-2xl font-bold">Pokemon Lab</h2>
        <p className="mt-1 text-sm text-slate-400">Setup your Pokemon</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_2fr_1fr]">
        <PokemonSummary
          pokemon={pokemon}
          nature={battlePokemon.nature}
          finalStats={battlePokemon.finalStats}
        />

        <StatsSetup pokemon={pokemon} battlePokemon={battlePokemon} />

        <FinalStatsDisplay
          stats={battlePokemon.finalStats}
          nature={battlePokemon.nature}
        />
      </div>
    </div>
  );
}
