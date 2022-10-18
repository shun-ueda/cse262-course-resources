import Token, { TokenType } from '../lib/Token'

export function xmlToToken(xml: string): Token {
  const tokenType = TokenType[xml.substring(1, xml.indexOf(' ')).toUpperCase()]
  if (xml.includes('val')) {
    const val = xml.substring(xml.indexOf('"') + 1, xml.lastIndexOf('"'))
    return new Token(tokenType, val)
  }
  return new Token(tokenType)
}
