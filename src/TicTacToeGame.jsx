import React from 'react'
import styled from 'styled-components'
import { BoardConsumer } from './TicTacToe/TicTacToeProvider';
import { relatedCoord } from './TicTacToe/game';

const Grid = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Row = styled('div')`
  display: flex;
`

const Cell = styled('div')`
  display: flex;
  width: 100px;
  height: 100px;
  border: 1px solid #dedede;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  background-color: ${({ hovered }) => hovered ? 'whitesmoke' : 'transparent'};
  margin: 5px;
  border-radius: 10px;
`

function Board({ board, onClick }) {
  const [hovered, setHovered] = React.useState(null)
  const isHovered = (coord) => hovered && relatedCoord(hovered)(coord)
  const onMouseEnter = coord => () => setHovered(coord)
  const onMouseLeave = () => setHovered(null)
  return (
    <Grid>
      {board.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {
            row.map((cell, colIndex) => (
              <Cell
                key={colIndex}
                onClick={() => onClick([rowIndex, colIndex])}
                hovered={isHovered([rowIndex, colIndex])}
                onMouseEnter={onMouseEnter([rowIndex, colIndex])}
                onMouseLeave={onMouseLeave}
              >{cell}</Cell>
            ))
          }
        </Row>
      ))}
    </Grid>
  )
}

export default () => (
  <BoardConsumer>
    {({ board, placeAt }) => Board({ board, onClick: placeAt })}
  </BoardConsumer>
)
