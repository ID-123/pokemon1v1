import type { PokemonSpecies } from "@/domain/pokemon";
import { NatureSelector } from "./NatureSelector";
import type { BattlePokemonState } from "../hooks";
import { IVSetup } from "./IVSetup";
import { EVSetup } from "./EVSetup";
import { BaseStatsSetup } from "./BaseStatsSetup";

interface StatRandomizerProps {
  pokemon: PokemonSpecies;
  battlePokemon: BattlePokemonState;
}

export function StatsSetup({ pokemon, battlePokemon }: StatRandomizerProps) {
  const { natureName, setNatureName } = battlePokemon;

  return (
    <div className="mx-auto w-full max-w-5xl rounded-2xl border border-slate-700 bg-slate-900 p-6 text-white shadow-lg">
      <section className="mt-2">
        <header className="mb-6">
          <h2 className="text-2xl font-bold">Base Stats Lab</h2>

          <p className="mt-1 text-sm text-slate-400">
            Edita las estadísticas o genera una distribución aleatoria
            manteniendo el BST.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          {/* Stat editor */}
          <div>
            {/* BST */}
            <BaseStatsSetup battlePokemon={battlePokemon} pokemon={pokemon} />

            {/* IVs */}
            <IVSetup battlePokemon={battlePokemon} />

            {/* EVs */}
            <EVSetup battlePokemon={battlePokemon} />

            {/* Nature */}
            <NatureSelector value={natureName} onChange={setNatureName} />
          </div>
        </div>
      </section>
    </div>
  );
}
