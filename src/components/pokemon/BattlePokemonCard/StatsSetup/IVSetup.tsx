import {
  calculateIVTotal,
  randomizeIVs,
  STAT_LIMITS,
  TOTAL_IV_LIMIT,
} from "@/domain/pokemon";
import type { BattlePokemonState } from "../hooks";
import { DEFAULT_IVS, STAT_FIELDS } from "./constants";
import { StatGroup } from "./StatGroup";

interface IVSetupProps {
  battlePokemon: BattlePokemonState;
}

export function IVSetup({ battlePokemon }: IVSetupProps) {
  const { ivs, updateIV, resetIV } = battlePokemon;

  const ivTotal = calculateIVTotal(ivs);

  function handleRandomize() {
    resetIV(randomizeIVs());
  }

  function handleReset() {
    resetIV(DEFAULT_IVS);
  }

  return (
    <section>
      <StatGroup
        title="IVs"
        description={`Valores individuales entre ${STAT_LIMITS.iv.min} y ${STAT_LIMITS.iv.max}.`}
        stats={ivs}
        fields={STAT_FIELDS}
        min={STAT_LIMITS.iv.min}
        max={STAT_LIMITS.iv.max}
        onChange={updateIV}
      />
      <div className="mt-4 rounded-lg border border-slate-700 bg-slate-800 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-400">IV Total</span>

          <span className="font-semibold">
            {ivTotal} / {TOTAL_IV_LIMIT}
          </span>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={handleRandomize}
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium transition hover:bg-blue-500"
        >
          Randomize IVs
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="rounded-lg border border-slate-600 px-4 py-2 font-medium transition hover:bg-slate-800"
        >
          Reset IVs
        </button>
      </div>
    </section>
  );
}
