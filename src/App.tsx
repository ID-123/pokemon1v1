import { StatRandomizer } from "./components/pokemon/BattlePokemonCard/StatsSetup/StatRandomizer";
import { usePokemon } from "./hooks/pokemon/usePokemon";

function App() {
  const { pokemon, loading, error } = usePokemon("slaking");

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Cargando Pokémon...
      </main>
    );
  }

  if (error || !pokemon) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-red-400">
        {error ?? "No se encontró el Pokémon."}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 p-8">
      <StatRandomizer pokemon={pokemon} />
    </main>
  );
}

export default App;
