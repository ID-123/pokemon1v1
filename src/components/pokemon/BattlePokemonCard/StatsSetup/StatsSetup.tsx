import { DEFAULT_EVS, DEFAULT_IVS, STAT_FIELDS } from "./constants";
import type { PokemonSpecies } from "@/domain/pokemon";
import {
  BASE_STAT_LIMITS,
  calculateBST,
  calculateEVTotal,
  isValidBaseStats,
  isValidBST,
  isValidEVs,
  randomizeBST,
  STAT_LIMITS,
  TOTAL_EV_LIMIT,
  BST_LIMITS,
} from "@/domain/pokemon";
import { StatGroup } from "./StatGroup";
import { NatureSelector } from "./NatureSelector";
import type { BattlePokemonState } from "../hooks";

interface StatRandomizerProps {
  pokemon: PokemonSpecies;
  battlePokemon: BattlePokemonState;
}

export function StatsSetup({ pokemon, battlePokemon }: StatRandomizerProps) {
  const {
    stats,
    ivs,
    evs,
    natureName,
    updateStat,
    updateIV,
    updateEV,
    setNatureName,
    resetStats,
    resetIV,
    resetEV,
  } = battlePokemon;

  const bst = calculateBST(stats);
  const maxBST = calculateBST(pokemon.baseStats);

  const evTotal = calculateEVTotal(evs);
  const evsAreValid = isValidEVs(evs);

  const statsAreValid = isValidBaseStats(stats);
  const bstIsValid = isValidBST(bst, maxBST);
  const configurationIsValid = statsAreValid && bstIsValid && evsAreValid;
  const canRandomizeBST = configurationIsValid && bst >= BST_LIMITS.min;

  function handleRandomize() {
    if (!canRandomizeBST) {
      return;
    }
    resetStats(randomizeBST(stats));
  }

  function handleReset() {
    resetStats(pokemon.baseStats);
    resetIV(DEFAULT_IVS);
    resetEV(DEFAULT_EVS);
  }

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
                  ⚠ Las estadísticas superan el BST permitido para{" "}
                  {pokemon.name}.
                </p>
              )}

              <p className="mt-2 text-xs text-slate-500">
                Cada stat: {BASE_STAT_LIMITS.min}–{BASE_STAT_LIMITS.max}
              </p>
            </div>

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

            {/* Configuration status */}
            <div className="mt-6 rounded-lg border border-slate-700 bg-slate-800 p-4">
              <p className="text-sm text-slate-400">Estado</p>

              <p
                className={`mt-1 font-medium ${
                  configurationIsValid ? "text-green-400" : "text-red-400"
                }`}
              >
                {configurationIsValid
                  ? "✓ Configuración válida"
                  : "✕ Configuración inválida"}
              </p>

              {configurationIsValid && bst < BST_LIMITS.min && (
                <p className="mt-2 text-sm text-amber-400">
                  El BST es válido, pero es demasiado bajo para la distribución
                  aleatoria actual. El mínimo distribuible es {BST_LIMITS.min}.
                </p>
              )}
            </div>

            {/* IVs */}
            <StatGroup
              title="IVs"
              description={`Valores individuales entre ${STAT_LIMITS.iv.min} y ${STAT_LIMITS.iv.max}.`}
              stats={ivs}
              fields={STAT_FIELDS}
              min={STAT_LIMITS.iv.min}
              max={STAT_LIMITS.iv.max}
              onChange={updateIV}
            />

            {/* EVs */}
            <StatGroup
              title="EVs"
              description={`Valores individuales entre ${STAT_LIMITS.ev.min} y ${STAT_LIMITS.ev.max}.`}
              stats={evs}
              fields={STAT_FIELDS}
              min={STAT_LIMITS.ev.min}
              max={STAT_LIMITS.ev.max}
              onChange={updateEV}
            />

            {/* EV total */}
            <div className="mt-4 rounded-lg border border-slate-700 bg-slate-800 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">EV Total</span>

                <span
                  className={`font-semibold ${
                    evsAreValid ? "text-white" : "text-red-400"
                  }`}
                >
                  {evTotal} / {TOTAL_EV_LIMIT}
                </span>
              </div>

              {!evsAreValid && (
                <p className="mt-2 text-sm text-red-400">
                  ⚠ Los EVs superan el límite total permitido.
                </p>
              )}
            </div>

            <NatureSelector value={natureName} onChange={setNatureName} />
          </div>
        </div>
      </section>
    </div>
  );
}
