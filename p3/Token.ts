/**
 * TS implementation of Tokens. You should (hopefully) know what these are.
 */

export enum TokenType {
  LPAREN = 'LPAREN',
  RPAREN = 'RPAREN',
  INT = 'INT',
  IDENTIFIER = 'IDENTIFIER'
}

export default class Token {
  type: TokenType
  value?: string | number
  constructor(type: TokenType, value?: string | number) {
    this.type = type
    this.value = value
  }
}
