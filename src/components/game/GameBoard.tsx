import { usePokemon } from "../../hooks/usePokemon";
import { formatName } from "../../api/pokemonApi";

export default function GameBoard() {
    const { cards, loading, error } = usePokemon();
    if (loading) {
        return <div className="text-center py 10">Loading Pokemon...🎴</div>;
    }
    if (error) {
        return <div className="text-red-500 text-center py-10">Error:{error}</div>
    }
    return (
        <div className="grid grid-clos-2 sm:grid-cols-5 md:grid-cols-6 lg:grid:cols-8 gap-4 p-4 max-w-7x1 mx-auto">
            {cards.map((card, index) => (
                <div key={`${card.id}-${index}`}
                    className="aspect-square bg-white rounded-x1 whadaow-lg overflow-hidden border-gray-200 flex flex-col items-center justify-center p-2 hover:shadow-x1 transition-shadow">
                    <img src={card.sprites.other?.['official-artwork']?.front_default ??
                        card.sprites.front_default ??
                        'https://via.placeholder.com/150?text=?'
                    }
                        alt={card.name}
                        className="w-4/5 h-4/5 object-contain"
                        onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/150?text=?';
                        }}
                    />
                    <p className="mt-2 font-semibold text-center text-sm">
                        {formatName(card.name)}
                    </p>
                </div>
            ))}
        </div>
    );
}
