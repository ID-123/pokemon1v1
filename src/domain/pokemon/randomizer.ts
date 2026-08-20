import type { BaseStats, StatName } from "./stats";
import { calculateBST } from "./stats-rules";

const RANDOM_BASE_STAT_LIMITS = {
  min: 1,
  max: 255,
} as const;

function shuffle<T>(items: T[]): T[] {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }

  return result;
}

function randomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomizeBST(baseStats: BaseStats): BaseStats {
  const bst = calculateBST(baseStats);
  const statNames = shuffle(Object.keys(baseStats) as StatName[]);

  const result: BaseStats = {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  };

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

  return result;
}