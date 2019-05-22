import * as R from 'ramda'

const BOARD_SIZE = 3

const createList = (createValue = () => null) => length => Array.from({ length }).map((v, index) => createValue(index))
const createVector = length => func => createList(func)(length)

export const createBoard = (size = BOARD_SIZE) => createList(() => createList()(size))(size)

export const map = func => board => (
  board.map((row, rowIndex) =>
    row.map((col, colIndex) =>
      func(col, [rowIndex, colIndex])
    )
  )
)

export const reduce = func => initialValue => board => (
  board.reduce((acc, row, rowIndex) =>
    row.reduce((acc, col, colIndex) =>
      func(acc, col, [rowIndex, colIndex])
    , acc)
  , initialValue)
)

export const isFilled = reduce((acc, value) => acc === true && value !== null)(true)

export const relatedCoord = ([firstRow, firstCol]) => ([secondRow, secondCol]) => (
  firstRow === secondRow || firstCol === secondCol
)

export const putAt = (symbol, targetCoord) => map((currentSymbol, coord) => (
  R.equals(targetCoord, coord) ? symbol : currentSymbol
))

const horizontalCell = rowIndex => board => colIndex => board[rowIndex][colIndex]
const vertialCell = colIndex => board => rowIndex => board[rowIndex][colIndex]
const centerCell = board => index => board[index][index]
const reverseCenterCell = board => index => (board[index][(board.length - 1) - index])

export const winnerInRow = row => R.all(R.identical(row[0]), row) ? row[0] : null
export const getRow = rowIndex => board => createVector(board.length)(horizontalCell(rowIndex)(board))
export const getCol = colIndex => board => createVector(board.length)(vertialCell(colIndex)(board))
export const getDiagonal = board => createVector(board.length)(centerCell(board))
export const getReverseDiagonal = board => createVector(board.length)(reverseCenterCell(board))

const winChecks = board => ([
  getDiagonal,
  getReverseDiagonal,
  ...createVector(board.length)(getRow),
  ...createVector(board.length)(getCol)
])

export const winnerSymbol = board => R.reduce((currentSymbol, validator) => {
  if (currentSymbol === null) {
    return winnerInRow(validator(board))
  }

  return currentSymbol
}, null, winChecks(board))

