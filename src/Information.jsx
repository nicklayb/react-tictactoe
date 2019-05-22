import React from 'react'
import styled from 'styled-components'
import { InfoConsumer } from './TicTacToe/TicTacToeProvider';

const Info = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`

function getStatus({ ended, winner, currentPlayer }) {
  if (winner) return `${winner} has win`
  if (ended) return `No winner`

  return `Turn of ${currentPlayer}`
}

export default () => (
  <InfoConsumer>
    {props => <Info>{getStatus(props)}</Info>}
  </InfoConsumer>
)
