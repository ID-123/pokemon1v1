import type { PokemonSpecies } from "@/domain/pokemon";
import type { PokeApiPokemonResponse } from "./types";

function extractIdFromUrl(url: string): number {
  const segments = url.split("/").filter(Boolean);
  const id = Number(segments.at(-1));

  if (!Number.isInteger(id)) {
    throw new Error(`Invalid resource URL: ${url}`);
  }

  return id;
}

export function mapPokemonResponse(
  pokemon: PokeApiPokemonResponse,
): PokemonSpecies {
  const baseStats = {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  };

  for (const stat of pokemon.stats) {
    switch (stat.stat.name) {
      case "hp":
        baseStats.hp = stat.base_stat;
        break;
      case "attack":
        baseStats.attack = stat.base_stat;
        break;
      case "defense":
        baseStats.defense = stat.base_stat;
        break;
      case "special-attack":
        baseStats.specialAttack = stat.base_stat;
        break;
      case "special-defense":
        baseStats.specialDefense = stat.base_stat;
        break;
      case "speed":
        baseStats.speed = stat.base_stat;
        break;
    }
  }

  return {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.front_default ?? undefined,

    types: pokemon.types.map(
      (type) => type.type.name as PokemonSpecies["types"][number],
    ),

    abilities: pokemon.abilities.map((ability) => ({
      id: extractIdFromUrl(ability.ability.url),
      name: ability.ability.name,
    })),

    baseStats,
  };
}
