export type XorO = 'X' | 'O'

export type Winner = XorO | undefined | 'Draw'

export type Tile = XorO | undefined

export type Board = Tile[][]

export type GameState = {
  board: (XorO | undefined)[][]
  player: XorO
  winner?: Winner
}