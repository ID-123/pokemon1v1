import { useState } from "react";
import type { PokemonSpecies } from "@/domain/pokemon";
import {
  BASE_STAT_LIMITS,
  calculateBST,
  isValidBaseStats,
  isValidBST,
  randomizeBST,
  type BaseStats,
  type StatName,
} from "@/domain/pokemon";
import StatInput from "./StatInput";

interface StatRandomizerProps {
  pokemon: PokemonSpecies;
}

const STAT_FIELDS: {
  key: StatName;
  label: string;
}[] = [
  { key: "hp", label: "HP" },
  { key: "attack", label: "Attack" },
  { key: "defense", label: "Defense" },
  { key: "specialAttack", label: "Special Attack" },
  { key: "specialDefense", label: "Special Defense" },
  { key: "speed", label: "Speed" },
];

// function StatRandomizer({ pokemon,}: StatRandomizerProps) {
function StatRandomizer({ pokemon }: StatRandomizerProps) {
  const [stats, setStats] = useState<BaseStats>(pokemon.baseStats);

  const bst = calculateBST(stats);
  const maxBST = calculateBST(pokemon.baseStats);

  const statsAreValid = isValidBaseStats(stats);
  const bstIsValid = isValidBST(bst, maxBST);

  const configurationIsValid = statsAreValid && bstIsValid;

  function handleStatChange(stat: StatName, value: string) {
    const numericValue = Number(value);

    setStats((previous) => ({
      ...previous,
      [stat]: numericValue,
    }));
  }

  function handleRandomize() {
    if (!configurationIsValid) {
      return;
    }
    setStats(randomizeBST(stats));
  }

  function handleReset() {
    setStats(pokemon.baseStats);
  }

  return (
    <section className="mx-auto w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 p-6 text-white shadow-lg">
      <header className="mb-6">
        <h2 className="text-2xl font-bold">Base Stats Lab</h2>

        <p className="mt-1 text-sm text-slate-400">
          Edita las estadísticas o genera una distribución aleatoria manteniendo
          el BST.
        </p>
      </header>

      <div className="mb-6 rounded-lg border border-slate-700 bg-slate-800 p-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-slate-400">BST</span>

            <p className="text-xs text-slate-500">{pokemon.name}</p>
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
            ⚠ Las estadísticas superan el BST permitido para {pokemon.name}.
          </p>
        )}

        <p className="mt-2 text-xs text-slate-500">
          Cada stat: {BASE_STAT_LIMITS.min}–{BASE_STAT_LIMITS.max}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {STAT_FIELDS.map((stat) => {
          const value = stats[stat.key];

          const isValid =
            Number.isInteger(value) &&
            value >= BASE_STAT_LIMITS.min &&
            value <= BASE_STAT_LIMITS.max;

          return (
            <StatInput
              key={stat.key}
              label={stat.label}
              value={value}
              min={BASE_STAT_LIMITS.min}
              max={BASE_STAT_LIMITS.max}
              error={
                isValid
                  ? undefined
                  : `Debe ser un entero entre ${BASE_STAT_LIMITS.min} y ${BASE_STAT_LIMITS.max}.`
              }
              onChange={(value) => handleStatChange(stat.key, value)}
            />
          );
        })}
              
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={!configurationIsValid}
          onClick={handleRandomize}
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Randomize BST
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="rounded-lg border border-slate-600 px-4 py-2 font-medium transition hover:bg-slate-800"
        >
          Reset
        </button>
      </div>

      <div className="mt-6 rounded-lg border border-slate-700 bg-slate-800 p-4">
        <p className="text-sm text-slate-400">Estado</p>

        <p
          className={`mt-1 font-medium ${
            statsAreValid ? "text-green-400" : "text-red-400"
          }`}
        >
          {statsAreValid
            ? "✓ Estadísticas válidas"
            : "✕ Estadísticas inválidas"}
        </p>
      </div>
    </section>
  );
}

export default StatRandomizer;
