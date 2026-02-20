import { usePokemon } from "../../hooks/usePokemon";
import type { GameCard } from "../../types/pokemon";
import PokemonCard from "./PokemonCard";
import { useCallback, useState } from "react";
import ScoreBoard from "./ScoreBoard";
import confetti from "canvas-confetti";

export default function GameBoard() {
  const { cards, loading, error, setCards, reloadCards } = usePokemon();
  const [moves, setMoves] = useState(0);
  const [bestMoves, setBestMoves] = useState<number>(() => {
    const saved = localStorage.getItem("pokemonMemoryBestMoves");
    return saved ? parseInt(saved, 10) : Infinity;
  });
  const [gameWon, setGameWon] = useState(false);
  const [selectedCards, setSelectedCards] = useState<GameCard[]>([]);
  const [disabled, setDisabled] = useState(false);

  const launchWinConfetti = useCallback(() => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      zIndex: 9999,
      colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
    });

    window.setTimeout(() => {
      confetti({
        particleCount: 90,
        spread: 110,
        origin: { y: 0.5 },
        zIndex: 9999,
      });
    }, 300);
  }, []);

  const handleCardClick = (clickedCard: GameCard) => {
    if (disabled) return;
    if (clickedCard.isFlipped || clickedCard.isMatched) return;

    setCards((prev) =>
      prev.map((c) =>
        c.instanceId === clickedCard.instanceId ? { ...c, isFlipped: true } : c,
      ),
    );

    const newSelected = [...selectedCards, clickedCard];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setDisabled(true);

      const [first, second] = newSelected;
      const isMatch = first.id === second.id;
      const nextMoves = moves + 1;
      setMoves(nextMoves);

      window.setTimeout(() => {
        setCards((prev) => {
          const updatedCards = prev.map((c) => {
            if (
              c.instanceId === first.instanceId ||
              c.instanceId === second.instanceId
            ) {
              return {
                ...c,
                isFlipped: isMatch,
                isMatched: isMatch,
              };
            }
            return c;
          });

          const allMatched = updatedCards.every((c) => c.isMatched);
          if (allMatched) {
            setGameWon(true);
            launchWinConfetti();
            if (nextMoves < bestMoves) {
              setBestMoves(nextMoves);
              localStorage.setItem("pokemonMemoryBestMoves", nextMoves.toString());
            }
          }

          return updatedCards;
        });

        setSelectedCards([]);
        setDisabled(false);
      }, 900);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-4 p-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-gray-200 reounded-xl animate-pulse shadow-sm"
          />
        ))}
        </div>
        <p className="text-center mt-6 text-gray-500">Loading Pokemon cards...</p>
      </div>
    );
  }

  if (error) {
    return <div className="py-10 text-center text-red-500">Error: {error}</div>;
  }

  const startNewGame = () => {
    setMoves(0);
    setSelectedCards([]);
    setDisabled(false);
    setGameWon(false);
    setCards([]);
    reloadCards();
  };
  return (
    <div className="max-w-6xl mx-auto p-4">
      <ScoreBoard
        moves={moves}
        bestMoves={bestMoves}
        gameWon={gameWon}
        onNewGame={startNewGame}
      />
      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-4">
        {cards.map((card) => (
          <PokemonCard
            key={card.instanceId}
            card={card}
            onClick={() => {
              handleCardClick(card);
            }}
            isDisabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}
