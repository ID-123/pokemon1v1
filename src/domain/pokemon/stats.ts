export interface Stats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export type BaseStats = Stats
export type IVs = Stats
export type EVs = Stats
export type FinalStats = Stats

export const pikachuBaseStats: BaseStats = {
    hp: 35,
    attack: 55,
    defense: 40,
    specialAttack: 50,
    specialDefense: 50,
    speed: 90
}