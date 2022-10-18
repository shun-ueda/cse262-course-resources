import Token, { TokenType } from '../lib/Token'
import { tokenToXml } from './tokenToXml'
import { getInputLines } from "../lib/util";

class TokenFragment {
  line: number
  col: number
  value: string
  constructor(value: string, line: number, col: number) {
    this.line = line
    this.col = col
    this.value = value
  }
}

const lines = getInputLines<string>("test/test.scm")

const fragments: TokenFragment[] = []
const delimiters = ['(', ')', ' ', '\n', "'", '"', '\t']
const blank = [' ', '\n', '\t'] // demiliters that are NOT tokens

let temp = ''

for (let i = 0; i < lines.length; i++) {
  const line = lines[i]
  for (let j = 0; j < lines[i].length; j++) {
    if (delimiters.includes(line[j])) {
      if (temp) {
        fragments.push(new TokenFragment(temp, i, j - temp.length))
        temp = ''
      }
      if (!blank.includes(line[j])) {
        fragments.push(new TokenFragment(line[j], i, j))
      }
    } else {
      temp += line[j]
    }
  }
  if (temp) {
    fragments.push(new TokenFragment(temp, i, line.lastIndexOf(temp)))
    temp = ''
  }
}

function evalFragment(fragment: TokenFragment) {
  switch (fragment.value) {
    case '(':
      return new Token(TokenType.LPAREN)
    case ')':
      return new Token(TokenType.RPAREN)
    default:
      return new Token(TokenType.IDENTIFIER, fragment.value)
  }
}

for (const token of fragments.map(evalFragment)) {
  console.log(tokenToXml(token))
}
