import { useState, useEffect, useCallback } from "react";
import { fetchPokemonBatch } from "../api/pokemonApi";
import type  { GameCard,Pokemon } from "../types/pokemon";
import { shuffleArray } from "../utils/shuffle";
import { PAIRS_COUNT, TOTAL_POKEMON } from "../constants/gameConfig";

export function usePokemon() {
  const [cards, setCards] = useState<GameCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPokemonCards = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const selectedIds = new Set<number>();
      while (selectedIds.size < PAIRS_COUNT) {
        const randomId = Math.floor(Math.random() * TOTAL_POKEMON) + 1;
        selectedIds.add(randomId);
      }
      const pokemonData = await fetchPokemonBatch([...selectedIds]);

      const pairedCards: GameCard[] = pokemonData.flatMap((poke: Pokemon) => [
        { ...poke, isFlipped: false, isMatched: false },
        { ...poke, isFlipped: false, isMatched: false },
      ]);

      const shuffled = shuffleArray(pairedCards);

      setCards(shuffled);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "unknown errror loading Pokemon";
      setError(message);
      console.error("Pokemon fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    loadPokemonCards();
  }, [loadPokemonCards]);
  return {
    cards,
    setCards,
    loading,
    error,
    reloadCards: loadPokemonCards,
  };
}
