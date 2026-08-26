import { useEffect, useState } from "react";
import { getPokemon, mapPokemonResponse } from "@/api/pokeapi";
import type { PokemonSpecies } from "@/domain/pokemon";

interface UsePokemonResult {
  pokemon: PokemonSpecies | null;
  loading: boolean;
  error: string | null;
}

export function usePokemon(identifier: string | number): UsePokemonResult {
  const [pokemon, setPokemon] = useState<PokemonSpecies | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadPokemon() {
      setLoading(true);
      setError(null);

      try {
        const response = await getPokemon(identifier);
        const mappedPokemon = mapPokemonResponse(response);

        if (!cancelled) {
          setPokemon(mappedPokemon);
        }
      } catch {
        if (!cancelled) {
          setError("No se pudo cargar el Pokémon.");
          setPokemon(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPokemon();

    return () => {
      cancelled = true;
    };
  }, [identifier]);

  return {
    pokemon,
    loading,
    error,
  };
}
