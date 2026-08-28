import { useState } from "react";
import { DEFAULT_EVS, DEFAULT_IVS, DEFAULT_LVL } from "../StatsSetup/constants";
import type {
  BaseStats,
  EVs,
  IVs,
  NatureName,
  PokemonSpecies,
} from "@/domain/pokemon";
import { calculateFinalStats, NATURES } from "@/domain/pokemon";
import { useStats } from "../StatsSetup/hooks/useStats";

export function useBattlePokemon(pokemon: PokemonSpecies) {
  const {
    stats,
    updateStat,
    reset: resetStats,
  } = useStats<BaseStats>(pokemon.baseStats);

  const {
    stats: ivs,
    updateStat: updateIV,
    reset: resetIV,
  } = useStats<IVs>(DEFAULT_IVS);

  const {
    stats: evs,
    updateStat: updateEV,
    reset: resetEV,
  } = useStats<EVs>(DEFAULT_EVS);

  const [natureName, setNatureName] = useState<NatureName>("hardy");

  const nature = NATURES[natureName];

  const finalStats = calculateFinalStats(stats, ivs, evs, nature, DEFAULT_LVL);

  console.log({
    baseStats: stats,
    ivs,
    evs,
    natureName,
    nature,
    level: DEFAULT_LVL,
  });

  return {
    stats,
    ivs,
    evs,
    nature,
    natureName,
    finalStats,

    updateStat,
    updateIV,
    updateEV,
    setNatureName,

    resetStats,
    resetIV,
    resetEV,
  };
}

export type BattlePokemonState = ReturnType<typeof useBattlePokemon>;
