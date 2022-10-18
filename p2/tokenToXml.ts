import Token, { TokenType } from '../lib/Token'
import { toSentenceCase } from '../lib/util'

export function tokenToXml(token: Token) {
  if (token.type === TokenType.LPAREN || token.type === TokenType.RPAREN) {
    return `<${toSentenceCase(token.type)} />`
  } else {
    return `<${toSentenceCase(token.type)} val="${token.value}" />`
  }
}
