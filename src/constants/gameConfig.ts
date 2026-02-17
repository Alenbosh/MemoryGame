export const TOTAL_POKEMON = 1025;
export const PAIRS_COUNT = 10;
export const GAME_MODES = {
  easy:6,
  medium:10,// starts with default 20 cards
  hard:15,
} as const;

export type GameMode = keyof typeof GAME_MODES;
