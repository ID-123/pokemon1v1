import StatRandomizer from "./components/pokemon/StatRandomizer/StatRandomizer";
import type { PokemonSpecies } from "./domain/pokemon";

const PIKACHU: PokemonSpecies = {
  id: 25,
  name: "Pikachu",
  types: [],
  baseStats: {
    hp: 35,
    attack: 55,
    defense: 40,
    specialAttack: 50,
    specialDefense: 50,
    speed: 90,
  },
  abilities: [],
};

function App() {
  return (
    <main className="min-h-screen bg-slate-950 p-8">
      <StatRandomizer pokemon={PIKACHU}/>
    </main>
  );
}

export default App;
