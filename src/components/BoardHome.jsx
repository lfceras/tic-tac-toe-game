import { useUpdateBoard } from '../hooks/useUpdateBoard'
import { Square } from './Square'
import WinnerModal from './WinnerModal'
import { TURNS } from './constants'

const BoardHome = () => {
  const { board, turn, updateBoard, winner, resetGame } = useUpdateBoard()
  return (
    <main className='board'>
      <h1>Tic Tac Toe Game</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>
      <section className='game'>
        {board.map((_, index) => (
          <Square key={index} index={index} updateBoard={updateBoard}>
            {board[index]}
          </Square>
        ))}
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default BoardHome
