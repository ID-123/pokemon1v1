import { useState } from "react";

import {
  BASE_STAT_LIMITS,
  calculateBST,
  isValidBaseStats,
  randomizeBST,
  type BaseStats,
  type StatName,
} from "@/domain/pokemon";

const DEFAULT_STATS: BaseStats = {
  hp: 120,
  attack: 120,
  defense: 120,
  specialAttack: 120,
  specialDefense: 120,
  speed: 120,
};

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

function StatRandomizer() {
  const [stats, setStats] = useState<BaseStats>(DEFAULT_STATS);

  const bst = calculateBST(stats);
  const statsAreValid = isValidBaseStats(stats);

  function handleStatChange(stat: StatName, value: string) {
    const numericValue = Number(value);

    setStats((previous) => ({
      ...previous,
      [stat]: numericValue,
    }));
  }

  function handleRandomize() {
    setStats(randomizeBST(stats));
  }

  function handleReset() {
    setStats(DEFAULT_STATS);
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
          <span className="text-sm text-slate-400">BST</span>

          <span className="text-2xl font-bold">{bst}</span>
        </div>

        <p className="mt-2 text-xs text-slate-500">
          Base Stats permitidas: {BASE_STAT_LIMITS.min}–{BASE_STAT_LIMITS.max}
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
            <label key={stat.key} className="flex flex-col gap-2">
              <span className="text-sm font-medium">{stat.label}</span>

              <input
                type="number"
                min={BASE_STAT_LIMITS.min}
                max={BASE_STAT_LIMITS.max}
                step={1}
                value={value}
                onChange={(event) =>
                  handleStatChange(stat.key, event.target.value)
                }
                className={`rounded-lg border bg-slate-800 px-3 py-2 outline-none transition ${
                  isValid
                    ? "border-slate-600 focus:border-blue-500"
                    : "border-red-500"
                }`}
              />

              <span className="text-xs text-slate-500">
                Rango: {BASE_STAT_LIMITS.min}–{BASE_STAT_LIMITS.max}
              </span>

              {!isValid && (
                <span className="text-xs text-red-400">
                  Debe ser un entero entre {BASE_STAT_LIMITS.min} y{" "}
                  {BASE_STAT_LIMITS.max}.
                </span>
              )}
            </label>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={!statsAreValid}
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
