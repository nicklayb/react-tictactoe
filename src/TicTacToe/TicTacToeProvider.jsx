import React from 'react'
import useTicTacToe from './useTicTacToe';

const Context = React.createContext([])

export default function ({ children, symbols, size }) {
  const [state, actions] = useTicTacToe({ symbols, size })

  return (
    <Context.Provider value={[state, actions]}>
      {children}
    </Context.Provider>
  )
}

export function BoardConsumer({ children }) {
  const [{ board, winner, ended }, { placeAt }] = React.useContext(Context)

  return children({
    board,
    ended,
    placeAt: !winner ? placeAt : () => { }
  })
}

export function InfoConsumer({ children }) {
  const [{ players, currentPlayerIndex, ended, winner }] = React.useContext(Context)

  return children({
    winner,
    ended,
    currentPlayer: players[currentPlayerIndex],
  })
}
