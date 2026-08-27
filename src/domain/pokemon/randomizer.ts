import type { BaseStats, IVs, EVs, Stats, StatName } from "./stats";
import { STATS } from "./stats";
import {
  calculateBST,
  RANDOM_BASE_STAT_LIMITS,
  STAT_LIMITS,
  TOTAL_EV_LIMIT,
} from "./stats-rules";

const STAT_COUNT = Object.keys(STATS).length;

// Generate random value between min/max
function randomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fisher-Yates shuffle (random stats assignment order)
function shuffle<T>(items: T[]): T[] {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }

  return result;
}

// Check if generated values are within range
export function isValidRandomStat(
  value: number,
  min: number,
  max: number,
): boolean {
  return value >= min && value <= max;
}

// Check if values are valid
function isDistributableBST(bst: number): boolean {
  const minimumBST = STAT_COUNT * RANDOM_BASE_STAT_LIMITS.min;

  const maximumBST = STAT_COUNT * RANDOM_BASE_STAT_LIMITS.max;

  return bst >= minimumBST && bst <= maximumBST;
}

function randomizeStatDistribution(
  total: number,
  min: number,
  max: number,
): Stats {
  const statNames = shuffle(Object.values(STATS) as StatName[]);
  const result = {} as Stats;
  let remaining = total;

  for (let index = 0; index < statNames.length - 1; index++) {
    const statName = statNames[index];
    const remainingStats = statNames.length - index - 1;

    const minimumForRest = remainingStats * min;
    const maximumForRest = remainingStats * max;

    const minimumForCurrent = Math.max(min, remaining - maximumForRest);

    const maximumForCurrent = Math.min(max, remaining - minimumForRest);

    const value = randomInteger(minimumForCurrent, maximumForCurrent);

    result[statName] = value;
    remaining -= value;
  }

  const lastStat = statNames[statNames.length - 1];

  result[lastStat] = remaining;

  if (!isValidRandomStat(remaining, min, max)) {
    throw new Error(
      `Generated stat ${remaining} is outside the allowed range.`,
    );
  }

  return result;
}

// Random BS generator
export function randomizeBST(baseStats: BaseStats): BaseStats {
  const bst = calculateBST(baseStats);

  if (!isDistributableBST(bst)) {
    throw new Error(
      `BST ${bst} cannot be distributed within the allowed stat limits.`,
    );
  }

  return randomizeStatDistribution(
    bst,
    RANDOM_BASE_STAT_LIMITS.min,
    RANDOM_BASE_STAT_LIMITS.max,
  );
}

// Random IVs
export function randomizeIVs(): IVs {
  return {
    hp: randomInteger(STAT_LIMITS.iv.min, STAT_LIMITS.iv.max),
    attack: randomInteger(STAT_LIMITS.iv.min, STAT_LIMITS.iv.max),
    defense: randomInteger(STAT_LIMITS.iv.min, STAT_LIMITS.iv.max),
    specialAttack: randomInteger(STAT_LIMITS.iv.min, STAT_LIMITS.iv.max),
    specialDefense: randomInteger(STAT_LIMITS.iv.min, STAT_LIMITS.iv.max),
    speed: randomInteger(STAT_LIMITS.iv.min, STAT_LIMITS.iv.max),
  };
}

// Random EVs
export function randomizeEVs(): EVs {
  const total = randomInteger(0, TOTAL_EV_LIMIT);

  return randomizeStatDistribution(
    total,
    STAT_LIMITS.ev.min,
    STAT_LIMITS.ev.max,
  );
}
