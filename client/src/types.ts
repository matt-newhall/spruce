export type XorO = 'X' | 'O'

export type Winner = XorO | undefined | 'Draw'

export type Tile = XorO | undefined

export type Board = Tile[][]

export type GameState = {
  board: (XorO | undefined)[][];
  player: XorO;
  winner?: Winner;
}

export type Stats = {
  totalGames: number;
  playerXWins: number;
  playerOWins: number;
  draws: number;
}
