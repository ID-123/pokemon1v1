import type { EVs, IVs, BaseStats } from "./stats";

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

export const BASE_STAT_LIMITS = {
  min: 1,
  max: 255,
} as const;

export const RANDOM_BASE_STAT_LIMITS = {
  min: 15,
  max: 255,
} as const;

export const BST_LIMITS = {
  min: RANDOM_BASE_STAT_LIMITS.min * 6,
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

export function isValidEVs(evs: EVs): boolean {
  const valuesAreValid = Object.values(evs).every((value) =>
    isValidIntegerInRange(value, STAT_LIMITS.ev.min, STAT_LIMITS.ev.max),
  );

  return valuesAreValid && calculateEVTotal(evs) <= TOTAL_EV_LIMIT;
}

export function isValidLevel(level: number): boolean {
  return isValidIntegerInRange(level, LEVEL_LIMITS.min, LEVEL_LIMITS.max);
}

export function isValidBaseStats(stats: BaseStats): boolean {
  return Object.values(stats).every(
    (value) =>
      Number.isInteger(value) &&
      value >= BASE_STAT_LIMITS.min &&
      value <= BASE_STAT_LIMITS.max,
  );
}

export function calculateBST(stats: BaseStats): number {
  return Object.values(stats).reduce((total, value) => total + value, 0);
}

export function calculateEVTotal(evs: EVs): number {
  return Object.values(evs).reduce((sum, value) => sum + value, 0);
}

export function isValidBST(bst: number, maxBST: number): boolean {
  return Number.isInteger(bst) && bst >= BST_LIMITS.min && bst <= maxBST;
}
