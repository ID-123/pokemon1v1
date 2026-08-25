import { type BaseStats, type StatName, STATS } from "./stats";
import {
  calculateBST,
  RANDOM_BASE_STAT_LIMITS,
  BST_LIMITS,
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

// Check if values are valid
function isDistributableBST(bst: number): boolean {
  const minimumBST = STAT_COUNT * RANDOM_BASE_STAT_LIMITS.min;

  const maximumBST = STAT_COUNT * RANDOM_BASE_STAT_LIMITS.max;

  return bst >= minimumBST && bst <= maximumBST;
}

// Check if generated values are within range
function isValidRandomBaseStat(value: number): boolean {
  return (
    value >= RANDOM_BASE_STAT_LIMITS.min && value <= RANDOM_BASE_STAT_LIMITS.max
  );
}

// Random BS generator
export function randomizeBST(baseStats: BaseStats): BaseStats {
  const bst = calculateBST(baseStats);

  if (!isDistributableBST(bst)) {
    throw new Error(
      `BST ${bst} cannot be distributed within the allowed stat limits.`,
    );
  }

  const statNames = shuffle(Object.values(STATS)) as StatName[];

  const result: Partial<BaseStats> = {};

  let remaining = bst;

  for (let index = 0; index < statNames.length - 1; index++) {
    const statName = statNames[index];
    const remainingStats = statNames.length - index - 1;
    const minimumForRest = remainingStats * RANDOM_BASE_STAT_LIMITS.min;
    const maximumForCurrent = Math.min(
      RANDOM_BASE_STAT_LIMITS.max,
      remaining - minimumForRest,
    );

    const value = randomInteger(RANDOM_BASE_STAT_LIMITS.min, maximumForCurrent);

    result[statName] = value;
    remaining -= value;
  }

  const lastStat = statNames[statNames.length - 1];

  result[lastStat] = remaining;

  if (!isValidRandomBaseStat(remaining)) {
    throw new Error(
      `Generated stat ${remaining} is outside the allowed range.`,
    );
  }

  return result as BaseStats;
}
