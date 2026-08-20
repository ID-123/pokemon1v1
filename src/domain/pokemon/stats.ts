export const STATS = {
  HP: "hp",
  ATTACK: "attack",
  DEFENSE: "defense",
  SPECIAL_ATTACK: "specialAttack",
  SPECIAL_DEFENSE: "specialDefense",
  SPEED: "speed",
} as const;

export type StatName = (typeof STATS)[keyof typeof STATS];

export interface Stats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export type BaseStats = Stats;
export type IVs = Stats;
export type EVs = Stats;
export type FinalStats = Stats;
