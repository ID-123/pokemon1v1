import type { EVs, IVs } from "./stats";

export const STAT_LIMITS = {
  iv: {
    min: 0,
    max: 31,
  },
  ev: {
    min: 0,
    max: 252,
  },
} as const;

export const TOTAL_EV_LIMIT = 510;

export const LEVEL_LIMITS = {
  min: 1,
  max: 100,
} as const;

function isValidIntegerInRange(
  value: number,
  min: number,
  max: number,
): boolean {
  return Number.isInteger(value) && value >= min && value <= max;
}

export function isValidIVs(ivs: IVs): boolean {
  return Object.values(ivs).every((value) =>
    isValidIntegerInRange(value, STAT_LIMITS.iv.min, STAT_LIMITS.iv.max),
  );
}

export function calculateEVTotal(evs: EVs): number {
  return Object.values(evs).reduce((sum, value) => sum + value, 0);
}

export function isValidEVs(evs: EVs): boolean {
  const valuesAreValid = Object.values(evs).every((value) =>
    isValidIntegerInRange(value, STAT_LIMITS.ev.min, STAT_LIMITS.ev.max),
  );

  return valuesAreValid && calculateEVTotal(evs) <= TOTAL_EV_LIMIT;
}

export function isValidLevel(level: number): boolean {
  return isValidIntegerInRange(level, LEVEL_LIMITS.min, LEVEL_LIMITS.max);
}
