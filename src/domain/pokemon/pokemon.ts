import type { Ability } from "./ability";
import type { BaseStats, IVs, EVs } from "./stats";
import type { PokemonType } from "./types";
import type { Item } from "./item";
import type { Move } from "./move";
import type { Nature } from "./nature";

export interface PokemonSpecies {
  id: number;
  name: string;
  types: PokemonType[];
  baseStats: BaseStats;
  abilities: Ability[];
}

export interface BattlePokemon {
  species: PokemonSpecies;
  level: number;

  ability: Ability;
  nature: Nature;

  ivs: IVs;
  evs: EVs;

  baseStats: BaseStats;
  moves: Move[];
  item: Item | null;
}