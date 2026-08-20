export type PokemonType =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";

  // Check types and combination (single or dual && diferent )
export function isValidPokemonTypes(types: PokemonType[]): boolean {
  if (types.length < 1 || types.length > 2) {
    return false;
  }

  return new Set(types).size === types.length;
}