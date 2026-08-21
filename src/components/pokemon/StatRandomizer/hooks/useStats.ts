import { useState } from "react";
import type { Stats, StatName } from "@/domain/pokemon";

interface UseStatsResult<T extends Stats> {
  stats: T;
  updateStat: (stat: StatName, value: string) => void;
  reset: (nextStats: T) => void;
}

function useStats<T extends Stats>(initialStats: T): UseStatsResult<T> {
  const [stats, setStats] = useState<T>(initialStats);

  function updateStat(stat: StatName, value: string) {
    const numericValue = Number(value);

    setStats((previous) => ({
      ...previous,
      [stat]: numericValue,
    }));
  }

  function reset(nextStats: T) {
    setStats(nextStats);
  }

  return {
    stats,
    updateStat,
    reset,
  };
}

export default useStats;