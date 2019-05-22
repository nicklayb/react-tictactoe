import React from 'react'
import { createBoard, putAt, winnerSymbol, isFilled } from './game';

const initialState = (players, size = 3) => ({
  board: createBoard(size),
  players,
  currentPlayerIndex: 0,
})


const rotatePlayer = state => {
  const { players, currentPlayerIndex } = state
  const nextPlayerIndex = ((currentPlayerIndex + 1) >= players.length) ? 0 : currentPlayerIndex + 1
  return {
    ...state,
    currentPlayerIndex: nextPlayerIndex
  }
}

const currentPlayer = ({ currentPlayerIndex, players }) => players[currentPlayerIndex]

const placePiece = coord => state => {
  const nextState = rotatePlayer(state)

  return {
    ...nextState,
    board: putAt(currentPlayer(state), coord)(state.board)
  }
}

export default function ({ symbols, size = 3 }) {
  const [state, setState] = React.useState(initialState(symbols, size))

  const actions = {
    placeAt: coord => setState(placePiece(coord))
  }

  const winner = winnerSymbol(state.board)

  return [{
    ...state,
    winner: winner,
    ended: isFilled(state.board) || winner
  }, actions]
}
