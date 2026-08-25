import type { Nature, NatureName } from "./nature";

export const NATURES: Record<NatureName, Nature> = {
  hardy: {
    name: "hardy",
    increasedStat: null,
    decreasedStat: null,
  },

  lonely: {
    name: "lonely",
    increasedStat: "attack",
    decreasedStat: "defense",
  },

  brave: {
    name: "brave",
    increasedStat: "attack",
    decreasedStat: "speed",
  },

  adamant: {
    name: "adamant",
    increasedStat: "attack",
    decreasedStat: "specialAttack",
  },

  naughty: {
    name: "naughty",
    increasedStat: "attack",
    decreasedStat: "specialDefense",
  },

  bold: {
    name: "bold",
    increasedStat: "defense",
    decreasedStat: "attack",
  },

  docile: {
    name: "docile",
    increasedStat: null,
    decreasedStat: null,
  },

  relaxed: {
    name: "relaxed",
    increasedStat: "defense",
    decreasedStat: "speed",
  },

  impish: {
    name: "impish",
    increasedStat: "defense",
    decreasedStat: "specialAttack",
  },

  lax: {
    name: "lax",
    increasedStat: "defense",
    decreasedStat: "specialDefense",
  },

  timid: {
    name: "timid",
    increasedStat: "speed",
    decreasedStat: "attack",
  },

  hasty: {
    name: "hasty",
    increasedStat: "speed",
    decreasedStat: "defense",
  },

  serious: {
    name: "serious",
    increasedStat: null,
    decreasedStat: null,
  },

  jolly: {
    name: "jolly",
    increasedStat: "speed",
    decreasedStat: "specialAttack",
  },

  naive: {
    name: "naive",
    increasedStat: "speed",
    decreasedStat: "specialDefense",
  },

  bashful: {
    name: "bashful",
    increasedStat: null,
    decreasedStat: null,
  },

  mild: {
    name: "mild",
    increasedStat: "specialAttack",
    decreasedStat: "defense",
  },

  quiet: {
    name: "quiet",
    increasedStat: "specialAttack",
    decreasedStat: "speed",
  },

  rash: {
    name: "rash",
    increasedStat: "specialAttack",
    decreasedStat: "specialDefense",
  },

  modest: {
    name: "modest",
    increasedStat: "specialAttack",
    decreasedStat: "attack",
  },

  calm: {
    name: "calm",
    increasedStat: "specialDefense",
    decreasedStat: "attack",
  },

  gentle: {
    name: "gentle",
    increasedStat: "specialDefense",
    decreasedStat: "defense",
  },

  sassy: {
    name: "sassy",
    increasedStat: "specialDefense",
    decreasedStat: "speed",
  },

  careful: {
    name: "careful",
    increasedStat: "specialDefense",
    decreasedStat: "specialAttack",
  },

  quirky: {
    name: "quirky",
    increasedStat: null,
    decreasedStat: null,
  },
};
