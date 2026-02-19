import { formatName } from "../../api/pokemonApi";
import type { GameCard } from "../../types/pokemon";

interface PokemonCardProps {
  card: GameCard;
  onClick: () => void;
  isDisabled: boolean;
}
export default function PokemonCard({
  card,
  onClick,
  isDisabled,
}: PokemonCardProps) {
  return (
    <div
      className={`card-scene relative aspect-square cursor-pointer overflow-hidden rounded-xl shadow-lg ${
        isDisabled ? "pointer-events-none" : ""
      }`}
      onClick={
        !isDisabled && !card.isMatched && !card.isFlipped ? onClick : undefined
      }
    >
      <div className={`card-inner ${card.isFlipped ? "is-flipped" : ""}`}>
        <div className="card-face flex items-center justify-center bg-gradient-to-br from-red-500 via-white to-red-500">
          <div className="relative h-[65%] w-[65%] overflow-hidden rounded-full border-8 border-black bg-white shadow-inner">
            <div className="absolute inset-x-0 top-0 h-1/2 bg-red-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-1/4 w-1/4 items-center justify-center rounded-full bg-black shadow-md">
                <div className="h-3/5 w-3/5 rounded-full bg-white" />
              </div>
            </div>
          </div>
        </div>
        <div className="card-face card-face-front flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white p-3">
          <img
            src={
              card.sprites.other?.["official-artwork"]?.front_default ||
              card.sprites.front_default ||
              "/vite.svg"
            }
            alt={card.name}
            className="h-5/6 w-5/6 object-contain drop-shadow-lg"
            loading="lazy"
            onError={(e) => {
              if (e.currentTarget.src.endsWith("/vite.svg")) return;
              e.currentTarget.src = "/vite.svg";
            }}
          />
          <p className="mt-2 text-center text-sm font-semibold text-gray-800">
            {formatName(card.name)}
          </p>
        </div>
      </div>
    </div>
  );
}
