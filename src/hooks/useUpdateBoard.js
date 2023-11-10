import confetti from 'canvas-confetti'
import { useState } from 'react'
import { checkWinner } from '../logic/chechWinner'
import { TURNS } from '../components/constants'

export const useUpdateBoard = () => {
  Array(9).fill(null)
  const [board, setboard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null)

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
  }

  const updateBoard = (index) => {
    // si ya tiene algo o ya hay un ganador no actualizamos la posicion
    if (board[index] || winner) return
    // actualizamos el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setboard(newBoard)
    // cambiamos el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // guardamos la partida en el localStorae
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    // revisamos si hay un ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setboard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  return {
    updateBoard,
    board,
    turn,
    winner,
    resetGame
  }
}
