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
