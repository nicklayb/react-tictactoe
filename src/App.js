import React from 'react';
import TicTacToeProvider from './TicTacToe/TicTacToeProvider';
import TicTacToeGame from './TicTacToeGame';
import Information from './Information';

function App() {
  return (
    <TicTacToeProvider symbols={['⚪️', '⚫']} size={3}>
      <TicTacToeGame />
      <Information />
    </TicTacToeProvider>
  );
}

export default App;
