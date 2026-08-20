export interface PokemonSpecies {
  id: number;
  name: string;
  types: {
    main: string;
    secondary?: string;
  };
  baseStats: number;
}
