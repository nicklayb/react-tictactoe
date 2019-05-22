import { winnerInRow, winnerSymbol, getRow, getCol, createBoard, putAt, map, isFilled } from './game';

const X = 'X'
const O = 'O'

describe('putAt', () => {
  it('should put in the center', () => {
    const board = createBoard()
    const expected = [
      [null, null, null],
      [null, X, null],
      [null, null, null],
    ]
    expect(putAt(X, [1, 1])(board)).toStrictEqual(expected)
  })
})

describe('isFilled', () => {
  it('should be filled', () => {
    const board = createBoard()
    const fullBoard = map(() => X)(board)
    expect(isFilled(fullBoard)).toBe(true)
  })
  it('should not be filled', () => {
    const board = createBoard()
    expect(isFilled(board)).toBe(false)
  })
})

describe('winnerInRow', () => {
  it('should return the winner in row', () => {
    const NO_WINNER = [null, 'X', 'O']
    const X_WINNER = ['X', 'X', 'X']
    expect(winnerInRow(NO_WINNER)).toBe(null)
    expect(winnerInRow(X_WINNER)).toBe(X)
  })
})

describe('getRow', () => {
  it('should get row', () => {
    const expected = [1, 2, 3]
    const board = [
      [null, null, null],
      expected,
      [null, null, null],
    ]

    expect(getRow(1)(board)).toStrictEqual(expected)
  })
})

describe('getCol', () => {
  it('should get col', () => {
    const expected = [1, 2, 3]
    const board = [
      [null, null, 1],
      [null, null, 2],
      [null, null, 3],
    ]

    expect(getCol(2)(board)).toStrictEqual(expected)
  })
})

describe('winnerSymbol', () => {
  it('should return the winner symbol in row', () => {
    const board = [
      [X, X, X],
      [null, null, null],
      [null, null, null],
    ]
    expect(winnerSymbol(board)).toBe(X)
  })
  it('should return the winner symbol in col', () => {
    const board = [
      [null, O, X],
      [null, O, null],
      [null, O, null],
    ]
    expect(winnerSymbol(board)).toBe(O)
  })
  it('should return the winner symbol in diagonal', () => {
    const board = [
      [O, null, X],
      [null, O, null],
      [null, O, O],
    ]
    expect(winnerSymbol(board)).toBe(O)
  })
})
