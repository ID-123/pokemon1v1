import type { StatName } from "./stats";

export type NatureName =
  | "hardy"
  | "lonely"
  | "brave"
  | "adamant"
  | "naughty"
  | "bold"
  | "docile"
  | "relaxed"
  | "impish"
  | "lax"
  | "timid"
  | "hasty"
  | "serious"
  | "jolly"
  | "naive"
  | "bashful"
  | "mild"
  | "quiet"
  | "rash"
  | "modest"
  | "calm"
  | "gentle"
  | "sassy"
  | "careful"
  | "quirky";

export interface Nature {
    name: NatureName
    increasedStat: StatName | null
    decreasedStat: StatName | null
}

