import type { PokemonType } from "./types";

export type MoveCategory = "physical" | "special" | "status";

export interface Move {
  id: number;
  name: string;
  type: PokemonType;
  category: MoveCategory;
  power: number | null;
  accuracy: number | null;
  priority: number;
}

// Check if valid moveset (between 1 and 4)
export function isValidMoveSet(moves: Move[]): boolean {
  return moves.length >= 1 && moves.length <= 4;
}