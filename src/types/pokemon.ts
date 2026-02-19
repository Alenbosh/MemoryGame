export interface PokemonSprites {
  front_default: string | null;
  other?: {
    dream_world?: { front_default: string | null };
    "official-artwork"?: { front_default: string | null };
  };
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: PokemonSprites;
  types?: Array<{ type: { name: string } }>;
}

export interface GameCard extends Pokemon {
  instanceId: string;
  isFlipped: boolean;
  isMatched: boolean;
}
