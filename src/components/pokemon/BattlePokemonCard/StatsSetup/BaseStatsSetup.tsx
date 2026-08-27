import {
  calculateBST,
  isValidBST,
  BASE_STAT_LIMITS,
  BST_LIMITS,
  randomizeBST,
} from "@/domain/pokemon";
import type { PokemonSpecies } from "@/domain/pokemon";
import type { BattlePokemonState } from "../hooks";
import { STAT_FIELDS } from "./constants";
import { StatGroup } from "./StatGroup";

interface BaseStatsSetupProps {
  pokemon: PokemonSpecies;
  battlePokemon: BattlePokemonState;
}

interface BSTModalProps {
  pokemonName: string;
  bst: number;
  maxBST: number;
  bstIsValid: boolean;
}

export function BSTModal({
  pokemonName,
  bst,
  maxBST,
  bstIsValid,
}: BSTModalProps) {
  return (
    <div className="mb-6 rounded-lg border border-slate-700 bg-slate-800 p-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm text-slate-400">BST</span>
          <p className="text-xs text-slate-500">{pokemonName}</p>
        </div>

        <span
          className={`text-2xl font-bold ${
            bstIsValid ? "text-white" : "text-red-400"
          }`}
        >
          {bst} / {maxBST}
        </span>
      </div>

      {!bstIsValid && (
        <p className="mt-3 text-sm text-red-400">
          ⚠ Las estadísticas superan el BST permitido para {pokemonName}.
        </p>
      )}

      <p className="mt-2 text-xs text-slate-500">
        Cada stat: {BASE_STAT_LIMITS.min}–{BASE_STAT_LIMITS.max}
      </p>
    </div>
  );
}

export function BaseStatsSetup({
  pokemon,
  battlePokemon,
}: BaseStatsSetupProps) {
  const { stats, updateStat, resetStats } = battlePokemon;

  const bst = calculateBST(stats);
  const maxBST = calculateBST(pokemon.baseStats);

  const bstIsValid = isValidBST(bst, maxBST);
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
