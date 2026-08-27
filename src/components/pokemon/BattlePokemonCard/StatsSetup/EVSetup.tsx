import {
  calculateEVTotal,
  isValidEVs,
  STAT_LIMITS,
  TOTAL_EV_LIMIT,
} from "@/domain/pokemon";
import type { BattlePokemonState } from "../hooks";
import { DEFAULT_EVS, STAT_FIELDS } from "./constants";
import { StatGroup } from "./StatGroup";

interface EVSetupProps {
  battlePokemon: BattlePokemonState;
}

export function EVSetup({ battlePokemon }: EVSetupProps) {
  const { evs, updateEV, resetEV } = battlePokemon;

  const evTotal = calculateEVTotal(evs);
  const evsAreValid = isValidEVs(evs);

  function handleReset() {
    resetEV(DEFAULT_EVS);
  }

  return (
    <section>
      <StatGroup
        title="EVs"
        description={`Valores individuales entre ${STAT_LIMITS.ev.min} y ${STAT_LIMITS.ev.max}.`}
        stats={evs}
        fields={STAT_FIELDS}
        min={STAT_LIMITS.ev.min}
        max={STAT_LIMITS.ev.max}
        onChange={updateEV}
      />

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

      <div className="mt-4 flex gap-3">
        <button
          type="button"
          disabled
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium opacity-50"
        >
          Randomize EVs
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="rounded-lg border border-slate-600 px-4 py-2 font-medium transition hover:bg-slate-800"
        >
          Reset EVs
        </button>
      </div>
    </section>
  );
}
