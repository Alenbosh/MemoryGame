# Pokémon Memory Card Game

A fun, responsive memory matching game built with **React**, **TypeScript**, **Tailwind CSS**, and data from the [PokéAPI](https://pokeapi.co/).

Flip cards to find matching Pokémon pairs. Matches stay revealed; mismatches flip back. Track your moves, beat your best score, and enjoy smooth animations!

## Features
- Dynamic random Pokémon fetching (20 cards / 10 pairs)
- 3D card flip animations with Poké Ball backs
- Moves counter & persistent best score (localStorage)
- Win detection with confetti celebration
- Loading skeleton & error handling
- Responsive grid (mobile + desktop)
- New Game button for fresh rounds

## Tech Stack
- React + Vite (fast dev & build)
- TypeScript (type safety)
- Tailwind CSS (utility-first styling)
- PokéAPI (free Pokémon data & sprites)
- canvas-confetti (win celebration)
- Custom hooks (usePokemon for data, game logic in GameBoard)

## Getting Started
1. Clone the repo:
   ```bash
   git clone https://github.com/YOUR_USERNAME/pokemon-memory-game.git
   cd pokemon-memory-game
