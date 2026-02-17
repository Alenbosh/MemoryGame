import  GameBoard  from '../components/game/GameBoard';
import '../App.css'

function App() {
    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4'>
            <h1 className='text-4x1 front-bold text-center mb-8 text-gray-800'>
                Pokemon Memory Game
            </h1>
            <GameBoard />
        </div >
    );
}

export default App;
