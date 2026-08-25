import type { PokeApiPokemonResponse } from "./types";

const POKEAPI_URL = "https://pokeapi.co/api/v2";

export async function getPokemon(
  identifier: string | number,
): Promise<PokeApiPokemonResponse> {
  const response = await fetch(`${POKEAPI_URL}/pokemon/${identifier}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokémon: ${response.status}`);
  }

  return response.json() as Promise<PokeApiPokemonResponse>;
}
