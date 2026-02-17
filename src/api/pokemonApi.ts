import type { Pokemon } from "../types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchPokemon(id: number): Promise<Pokemon> {
  const response = await fetch(`${BASE_URL}/pokemon/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon #${id}: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchPokemonBatch(ids: number[]): Promise<Pokemon[]> {
  const promises = ids.map(fetchPokemon);
  return Promise.all(promises);
}

export function formatName(name: string): string {
  return name
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}
