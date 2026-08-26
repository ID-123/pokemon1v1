import type { EVs, IVs, StatName } from "@/domain/pokemon";

export const STAT_FIELDS: {
  key: StatName;
  label: string;
}[] = [
  { key: "hp", label: "HP" },
  { key: "attack", label: "Attack" },
  { key: "defense", label: "Defense" },
  { key: "specialAttack", label: "Special Attack" },
  { key: "specialDefense", label: "Special Defense" },
  { key: "speed", label: "Speed" },
];

export const DEFAULT_IVS: IVs = {
  hp: 31,
  attack: 31,
  defense: 31,
  specialAttack: 31,
  specialDefense: 31,
  speed: 31,
};

export const DEFAULT_EVS: EVs = {
  hp: 0,
  attack: 0,
  defense: 0,
  specialAttack: 0,
  specialDefense: 0,
  speed: 0,
};

export const DEFAULT_LVL = 50;
