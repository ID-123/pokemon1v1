import type { PokemonSpecies } from "@/domain/pokemon";
import { NatureSelector } from "./NatureSelector";
import type { BattlePokemonState } from "../hooks";
import { IVSetup } from "./IVSetup";
import { EVSetup } from "./EVSetup";
import { BaseStatsSetup, BSTModal } from "./BaseStatsSetup";
import { calculateBST, isValidBST } from "@/domain/pokemon";
interface StatRandomizerProps {
  pokemon: PokemonSpecies;
  battlePokemon: BattlePokemonState;
}

export function StatsSetup({ pokemon, battlePokemon }: StatRandomizerProps) {
  const { natureName, setNatureName } = battlePokemon;
  const bst = calculateBST(battlePokemon.stats);
  const maxBST = calculateBST(pokemon.baseStats);
  const bstIsValid = isValidBST(bst, maxBST);
  return (
    <div className="mx-auto w-full max-w-5xl rounded-2xl border border-slate-700 bg-slate-900 p-6 text-white shadow-lg">
      <section className="mt-2">
        <header className="mb-6 grid grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Base Stats Lab</h2>

            <p className="mt-1 text-sm text-slate-400">
              Edita las estadísticas o genera una distribución aleatoria
              manteniendo el BST.
            </p>
          </div>
          <div>
            <BSTModal
              pokemonName={pokemon.name}
              bst={bst}
              maxBST={maxBST}
              bstIsValid={bstIsValid}
            />
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Stat editor */}
          <div>
            {/* BST */}
            <BaseStatsSetup battlePokemon={battlePokemon} pokemon={pokemon} />

            {/* Nature */}
            <NatureSelector value={natureName} onChange={setNatureName} />
          </div>
          <div>
            {/* IVs */}
            <IVSetup battlePokemon={battlePokemon} />
          </div>
          <div>
            {/* EVs */}
            <EVSetup battlePokemon={battlePokemon} />
          </div>
        </div>
      </section>
    </div>
  );
}
