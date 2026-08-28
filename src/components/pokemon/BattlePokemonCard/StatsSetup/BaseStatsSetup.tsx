import {
  BASE_STAT_LIMITS,
  BST_LIMITS,
  randomizeBST,
  getBSTInfo,
} from "@/domain/pokemon";
import type { PokemonSpecies } from "@/domain/pokemon";
import type { BattlePokemonState } from "../hooks";
import { STAT_FIELDS } from "./constants";
import { StatGroup } from "./StatGroup";

interface BaseStatsSetupProps {
  pokemon: PokemonSpecies;
  battlePokemon: BattlePokemonState;
}

export function BaseStatsSetup({
  pokemon,
  battlePokemon,
}: BaseStatsSetupProps) {
  const { stats, updateStat, resetStats } = battlePokemon;

  const { bst, bstIsValid } = getBSTInfo(stats, pokemon.baseStats);
  const canRandomizeBST = bstIsValid && bst >= BST_LIMITS.min;

  function handleRandomize() {
    if (!canRandomizeBST) {
      return;
    }
    resetStats(randomizeBST(stats));
  }

  function handleReset() {
    resetStats(pokemon.baseStats);
  }

  return (
    <div>
      {/* Base stats */}
      <StatGroup
        title="Base Stats"
        description={`Estadísticas individuales entre ${BASE_STAT_LIMITS.min} y ${BASE_STAT_LIMITS.max}.`}
        stats={stats}
        fields={STAT_FIELDS}
        min={BASE_STAT_LIMITS.min}
        max={BASE_STAT_LIMITS.max}
        onChange={updateStat}
      />

      {/* Actions */}
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={!canRandomizeBST}
          onClick={handleRandomize}
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Randomize Stats
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="rounded-lg border border-slate-600 px-4 py-2 font-medium transition hover:bg-slate-800"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
