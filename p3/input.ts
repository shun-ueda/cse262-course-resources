import Token, { TokenType } from './Token'

/**
 * `input` defines the user input; the inputs are already split into tokens (using p2!).
 */

// (+ 1 (+ 2 (+ 3 4) 5) (+ 6 7)) (+ 8 9)
export const input: Token[] = [
  {
    type: TokenType.LPAREN
  },
  {
    type: TokenType.IDENTIFIER,
    value: '+'
  },
  {
    type: TokenType.INT,
    value: 1
  },
  {
    type: TokenType.LPAREN
  },
  {
    type: TokenType.IDENTIFIER,
    value: '+'
  },
  {
    type: TokenType.INT,
    value: 2
  },
  {
    type: TokenType.LPAREN
  },
  {
    type: TokenType.IDENTIFIER,
    value: '+'
  },
  {
    type: TokenType.INT,
    value: 3
  },
  {
    type: TokenType.INT,
    value: 4
  },
  {
    type: TokenType.RPAREN
  },
  {
    type: TokenType.INT,
    value: 5
  },
  {
    type: TokenType.RPAREN
  },
  {
    type: TokenType.LPAREN
  },
  {
    type: TokenType.IDENTIFIER,
    value: '+'
  },
  {
    type: TokenType.INT,
    value: 6
  },
  {
    type: TokenType.INT,
    value: 7
  },
  {
    type: TokenType.RPAREN
  },
  {
    type: TokenType.RPAREN
  },
  {
    type: TokenType.LPAREN
  },
  {
    type: TokenType.IDENTIFIER,
    value: '+'
  },
  {
    type: TokenType.INT,
    value: 8
  },
  {
    type: TokenType.INT,
    value: 9
  },
  {
    type: TokenType.RPAREN
  }
]
