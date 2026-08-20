# Pokémon Battle Lab

Simulador educativo de combates **Single Pokémon 1v1** construido con React + TypeScript y alimentado por [PokéAPI](https://pokeapi.co/).

El proyecto tiene dos objetivos simultáneos:

1. Construir un pequeño juego funcional y entretenido.
2. Utilizarlo como laboratorio para practicar TypeScript, React, consumo de APIs, asincronía, manejo de estado, modelado de dominio, aleatoriedad y diseño de un motor de reglas.

> **Estado:** Sprint 0 definido. Sprint 1 — modelo de dominio y estructura inicial.

---

## Objetivo

El MVP permitirá configurar dos Pokémon y enfrentarlos en un combate por turnos.

Cada Pokémon podrá configurarse manualmente, parcialmente de forma aleatoria o completamente de forma aleatoria.

El elemento distintivo del proyecto será **Random BST**: redistribuir aleatoriamente los Base Stats de una especie manteniendo exactamente su **Base Stat Total (BST)**.

Ejemplo:

```text
Original
HP 78 / Atk 84 / Def 78 / SpA 109 / SpD 85 / Spe 100
BST = 534

Random BST
HP 121 / Atk 44 / Def 93 / SpA 82 / SpD 79 / Spe 115
BST = 534
```

La especie sigue siendo la misma, pero la distribución de sus stats cambia.

---

## Alcance del MVP

### Configuración

Cada card de Pokémon permitirá configurar:

- Pokémon
- Nivel
- Habilidad
- Naturaleza
- IVs
- EVs
- Distribución de Base Stats
- Objeto
- 4 movimientos

### Modos de configuración

#### Manual

El usuario controla todos los parámetros.

#### Partial Random

El usuario decide qué parámetros serán generados aleatoriamente.

Ejemplo:

```text
✓ Ability
✓ Nature
✗ IVs
✗ EVs
✓ Random BST
✓ Moves
✗ Item
```

#### Full Random

Se generan aleatoriamente:

- Ability
- Nature
- IVs
- EVs
- Random BST
- Moves
- Item

La especie seleccionada **no cambia**.

---

# Reglas de combate

El simulador toma **Generation IX como referencia** para las reglas matemáticas y mecánicas.

Esto no significa implementar todo Pokémon Gen IX. El MVP implementa solamente un subconjunto controlado.

## Estadísticas

Se utilizan:

- HP
- Attack
- Defense
- Special Attack
- Special Defense
- Speed

Las estadísticas finales se calculan a partir de:

```text
Base Stats
+ IVs
+ EVs
+ Level
+ Nature
↓
Final Stats
```

## IVs

- Rango: `0–31`
- Un valor independiente para cada stat.

## EVs

- Máximo por stat: `252`
- Máximo total: `510`
- Se aplican las reglas modernas de cálculo.

## Naturalezas

Se soportan las 25 naturalezas.

Una naturaleza puede:

- aumentar un stat
- reducir otro
- ser neutral

## Random BST

Random BST **no significa randomizar EVs**.

El algoritmo toma el BST original:

```text
BST = HP + Atk + Def + SpA + SpD + Spe
```

y genera una nueva distribución:

```text
S1 + S2 + S3 + S4 + S5 + S6 = BST
```

respetando límites válidos.

La distribución generada sustituye los Base Stats originales **solo dentro de la instancia de combate**.

Los datos originales obtenidos de PokéAPI nunca se modifican.

---

# Combate

El combate es:

```text
1 Pokémon vs 1 Pokémon
```

Cada turno:

1. Ambos jugadores seleccionan un movimiento.
2. Se determina el orden.
3. Se ejecuta el primer movimiento.
4. Se calcula y aplica el daño/efecto.
5. Se comprueba si el objetivo fue derrotado.
6. Se ejecuta el segundo movimiento si corresponde.
7. Se aplican efectos de final de turno.
8. Comienza el siguiente turno.

El combate termina cuando uno de los Pokémon llega a `0 HP`.

---

# Damage Calculator

El MVP soportará:

- Physical moves
- Special moves
- Power
- Attack / Special Attack
- Defense / Special Defense
- STAB
- Type effectiveness
- Critical hits
- Random damage factor

El cálculo de daño será independiente de React.

Conceptualmente:

```text
Move
  +
Attacker
  +
Defender
  +
Battle State
        ↓
Damage Calculator
        ↓
DamageResult
```

---

# Estados

Se implementará inicialmente un subconjunto de estados:

- Burn
- Paralysis
- Poison
- Toxic
- Sleep
- Freeze

También se soportarán inicialmente modificaciones de:

- Attack
- Defense
- Special Attack
- Special Defense
- Speed
- Accuracy
- Evasion

No todos los efectos especiales de movimientos y habilidades estarán disponibles en el MVP.

---

# Habilidades

PokéAPI contiene muchas habilidades.

El MVP implementará solamente un subconjunto de habilidades con efectos de combate soportados.

Una habilidad puede existir en los datos de PokéAPI sin que su comportamiento esté implementado todavía.

El sistema debe diferenciar entre:

```text
Ability available
```

y

```text
Ability behavior implemented
```

---

# Movimientos

PokéAPI contiene una gran cantidad de movimientos.

El MVP soportará inicialmente:

- Physical damage
- Special damage
- Un subconjunto de movimientos de estado
- Prioridad
- Tipo
- Poder
- Precisión

Los movimientos con mecánicas especiales no implementadas podrán marcarse como no soportados en lugar de producir resultados incorrectos.

---

# Objetos

El MVP utilizará inicialmente un subconjunto de objetos, entre ellos:

- Life Orb
- Choice Band
- Choice Specs
- Choice Scarf
- Leftovers
- Sitrus Berry
- Lum Berry
- Focus Sash
- Assault Vest
- Expert Belt

Solo se implementarán las interacciones que formen parte del motor actual.

---

# Battle State

La configuración de un Pokémon y su estado durante el combate son conceptos diferentes.

```text
BattlePokemon
    │
    ├── configuration
    │
    └── battleState
```

El estado de batalla podrá contener:

- HP actual
- Estado alterado
- Stat stages
- Estados volátiles soportados
- Estado de objetos consumibles
- Información necesaria para resolver turnos

La configuración base no debe mutarse durante el combate.

---

# Battle Log

El motor generará información sobre los eventos relevantes del combate.

Ejemplo:

```text
Pikachu used Thunderbolt!

It dealt 84 damage.

Blastoise became paralyzed!

Blastoise has 92 HP remaining.
```

El objetivo es que el motor produzca resultados estructurados y React se encargue de presentarlos.

---

# Arquitectura conceptual

```text
PokéAPI
   │
   ▼
API Services
   │
   ▼
Domain Models
   │
   ├───────────────┐
   ▼               ▼
Pokemon Builder   Battle Engine
   │               │
   └───────┬───────┘
           ▼
        React UI
```

## Separación de responsabilidades

### `services/pokeapi`

Obtiene y transforma información procedente de PokéAPI.

No contiene reglas propias del combate.

### `domain`

Representa las entidades y reglas propias del juego.

### `features/pokemon-builder`

Construye y configura Pokémon para una batalla.

### `features/battle`

Gestiona la interacción de combate y su presentación.

### `Battle Engine`

Resuelve reglas de batalla independientemente de React.

---

# Estructura objetivo

```text
src/
├── app/
│
├── components/
│
├── domain/
│   ├── pokemon/
│   └── battle/
│
├── features/
│   ├── pokemon-builder/
│   └── battle/
│
├── services/
│   └── pokeapi/
│
└── main.tsx
```

La estructura se irá creando progresivamente. No se crearán archivos o abstracciones antes de necesitarlos.

---

# Fuera del MVP

No se implementará inicialmente:

- Teams
- Switching
- Double battles
- Triple battles
- Weather
- Terrain
- Terastallization
- Dynamax
- Mega Evolution
- Z-Moves
- Breeding
- Experience
- Capturing
- Online multiplayer
- Accounts
- Backend propio
- Todas las habilidades
- Todos los movimientos
- Todos los objetos
- Todas las interacciones especiales

Estas características podrán considerarse posteriormente como extensiones.

---

# Principios del proyecto

## 1. PokéAPI no es el motor

PokéAPI proporciona datos.

Nuestro proyecto implementa las reglas del juego.

## 2. API data ≠ Domain data

Los modelos recibidos de PokéAPI no deben convertirse directamente en el estado de nuestra aplicación.

## 3. Configuration ≠ Battle State

La configuración describe cómo entra un Pokémon al combate.

El Battle State describe qué le está ocurriendo durante el combate.

## 4. El motor no depende de React

Las reglas matemáticas y de combate deben poder probarse sin renderizar componentes.

## 5. Datos originales inmutables

Los Base Stats originales obtenidos de PokéAPI nunca se modifican.

Random BST crea una nueva distribución para la instancia de combate.

## 6. No fingir soporte

Si una habilidad, movimiento u objeto todavía no está implementado, el sistema debe reconocerlo como no soportado.

Es preferible una limitación explícita a un resultado incorrecto.

---

# Roadmap

## Sprint 0 — Scope

- [x] Definir objetivo
- [x] Definir reglas
- [x] Definir límites del MVP
- [x] Definir Random BST
- [x] Definir arquitectura conceptual

## Sprint 1 — Domain Model

- [ ] Definir tipos e interfaces
- [ ] Modelar Stats
- [ ] Modelar IVs
- [ ] Modelar EVs
- [ ] Modelar Nature
- [ ] Modelar Ability
- [ ] Modelar Move
- [ ] Modelar Item
- [ ] Modelar BattlePokemon
- [ ] Modelar BattleState
- [ ] Definir estructura inicial de carpetas

## Sprint 2 — PokéAPI

- [ ] API client
- [ ] Pokémon search
- [ ] Pokémon details
- [ ] Moves
- [ ] Abilities
- [ ] Natures
- [ ] Items
- [ ] Type relations
- [ ] Cache

## Sprint 3 — Stats

- [ ] IV calculation
- [ ] EV calculation
- [ ] Nature modifiers
- [ ] Final stats
- [ ] Random BST algorithm
- [ ] Tests del algoritmo

## Sprint 4 — Battle Engine

- [ ] Turn system
- [ ] Move selection
- [ ] Priority
- [ ] Speed
- [ ] Damage calculator
- [ ] STAB
- [ ] Type effectiveness
- [ ] Critical hits
- [ ] Random damage
- [ ] Battle state
- [ ] Battle log

## Sprint 5 — React UI

- [ ] Pokémon search
- [ ] Pokémon cards
- [ ] Configuration UI
- [ ] Randomization controls
- [ ] Stats display
- [ ] Battle arena
- [ ] Move selection
- [ ] Battle log
- [ ] Result screen

## Sprint 6 — Content Expansion

- [ ] More abilities
- [ ] More moves
- [ ] More items
- [ ] More status interactions
- [ ] Better randomization
- [ ] Chaos modes

---

# Educational objective

Este proyecto se utilizará para practicar de forma integrada:

```text
JavaScript
TypeScript
React
Async/Await
Fetch
APIs REST
Data modeling
Immutability
State management
Pure functions
Randomness
Algorithms
Business rules
Testing
Component architecture
```

La prioridad no es construir la mayor cantidad de funcionalidades posible.

La prioridad es **entender cómo se transforma información externa en un modelo de dominio y cómo ese modelo puede utilizarse para construir una aplicación interactiva real**.