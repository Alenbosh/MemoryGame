interface ScoreBoardProps {
    moves: number;
    bestMoves: number;
    onNewGame: () => void;
    gameWon: boolean;
}
export default function ScoreBoard({
    moves,
    bestMoves,
    onNewGame,
    gameWon
}: ScoreBoardProps) {
    return (
        <div className="mb-6 flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="text-center">
                <p className="text-lg font-semibold">Moves </p>
                <p className="text-3xl font-bold text-blue-600">{moves}</p>
            </div>
            <div className="text-center">
                <p className="text-lg font-semibold">Best</p>
                <p className="text-3xl font-bold text-purple-600">
                    {bestMoves === Infinity ? '-' : bestMoves}
                </p>
            </div>
            <button onClick={onNewGame} className="px-6  py-3 bg-green-500  text-white font-bold rounded-lg shadow hover:bg-green-600 transition">
                New Game
            </button>
            {gameWon && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                    <div className="bg-white p-10 rounded-2xl text-center shadow-2xl max-w-md">
                        <h2 className="text-4xl font-bold text-green-600 mb-4">You Won! 🎉</h2>
                        <p className="text-xl mb-6">
                            Completed in <span className="font-bold">{moves}</span> moves
                        </p>
                        <button onClick={onNewGame} className="px-8 py-4 bg-blue-500 text-white font-bold rounded-lg text-lg hover:bg-blue-600">
                            Play Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
