export interface PokeApiStatResponse {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokeApiTypeResponse {
  slot: number;
  type: {
    name: string;
  };
}

export interface PokeApiAbilityResponse {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokeApiSpriteResponse {
  front_default: string | null;
}

export interface PokeApiPokemonResponse {
  id: number;
  name: string;
  sprites: PokeApiSpriteResponse;
  stats: PokeApiStatResponse[];
  types: PokeApiTypeResponse[];
  abilities: PokeApiAbilityResponse[];
}
