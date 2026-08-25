import type { BaseStats, EVs, IVs, FinalStats } from "./stats";
import type { Nature } from "./nature";
import { NATURE_MODIFIERS } from "./nature";

function calculateHP(
  base: number,
  iv: number,
  ev: number,
  level: number,
): number {
  return (
    Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) +
    level +
    10
  );
}

function calculateStat(
  base: number,
  iv: number,
  ev: number,
  level: number,
  modifier: number,
): number {
  const baseValue =
    Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + 5;
  return Math.floor(baseValue * modifier);
}

function getNatureModifier(stat: keyof BaseStats, nature: Nature): number {
  if (nature.increasedStat === stat) {
    return NATURE_MODIFIERS.increased;
  }
  if (nature.decreasedStat === stat) {
    return NATURE_MODIFIERS.decreased;
  }

  return NATURE_MODIFIERS.neutral;
}

export function calculateFinalStats(
  baseStats: BaseStats,
  ivs: IVs,
  evs: EVs,
  nature: Nature,
  level: number,
): FinalStats {
  return {
    hp: calculateHP(baseStats.hp, ivs.hp, evs.hp, level),
    attack: calculateStat(
      baseStats.attack,
      ivs.attack,
      evs.attack,
      level,
      getNatureModifier("attack", nature),
    ),
    defense: calculateStat(
      baseStats.defense,
      ivs.defense,
      evs.defense,
      level,
      getNatureModifier("defense", nature),
    ),
    specialAttack: calculateStat(
      baseStats.specialAttack,
      ivs.specialAttack,
      evs.specialAttack,
      level,
      getNatureModifier("specialAttack", nature),
    ),
    specialDefense: calculateStat(
      baseStats.specialDefense,
      ivs.specialDefense,
      evs.specialDefense,
      level,
      getNatureModifier("specialDefense", nature),
    ),
    speed: calculateStat(
      baseStats.speed,
      ivs.speed,
      evs.speed,
      level,

      getNatureModifier("speed", nature),
    ),
  };
}
