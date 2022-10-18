import Token, { TokenType } from '../lib/Token'
import Node, { NodeType } from '../lib/Node'
import clone from '@ungap/structured-clone'
import astToXml from './astToXml'
import { getInputLines } from "../lib/util";
import { xmlToToken } from "./xmlToToken";

/**
 * Minimal TypeScript implementation for p3. I took the recursive
 * approach, which seemed to be the most resonable approach.
 *
 * Here's the breakdown of the process:
 *
 * (+ 1 (+ 2 3))
 *
 * 1. ( expr )
 * 2. ( ε ε ( term ) )
 * 3. ( ε ε ( ε ε ) )
 * 4. ( ε ε applyNode )
 * 5. ( applyNode )
 *
 * To minimize the risk of plagiarism, I wrote this is TypeScript (not only to
 * prevent plagiarism though; TS stands in between Python and Java as its grammer
 * is not as strict as Java but stricter than Python, so this code can be used as
 * a reference for both parts) but I know some of you may try to directly translate
 * this into Java/Python, PLEASE STOP. I might get fired, and you'll get caught
 * and nobody is happy, use this code as a reference!
 */

/**
 * Convert a evaluable `Token` in to a `Node`.  This includes: `Int`, `String`,
 * `Double`, etc.
 */
function evalToken(token: Token): Node {
  switch (token.type) {
    case TokenType.IDENTIFIER:
      return new Node(NodeType.IDENTIFIER, token.value)
    case TokenType.INT:
      return new Node(NodeType.INT, token.value)
    default:
      throw new Error(`TokenType ${token.type} not supported`)
  }
}

/**
 * Evaluate `Node`s (term) into a `Node`. This implementation only deals with `ApplyNode`
 * - the rest are left for you.
 */
function evalTerm(nodes: Node[]): Node {
  return new Node(NodeType.APPLY, nodes)
}

/**
 * Create terms from the collection of tokens.
 */
function createTerms(tokens: Token[]): Token[][] {
  let depth = 0
  const temp: Token[] = []
  const terms: Token[][] = []
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type === TokenType.LPAREN) {
      depth++
      temp.push(tokens[i])
      for (i++; depth > 0 && i < tokens.length; i++) {
        temp.push(tokens[i])
        if (tokens[i].type === TokenType.LPAREN) {
          depth++
        } else if (tokens[i].type === TokenType.RPAREN) {
          depth--
        }
        if (depth === 0) {
          terms.push(clone(temp))
          temp.length = 0
          break
        }
      }
    } else {
      terms.push([tokens[i]])
    }
  }
  return terms
}

function parse(tokens: Token[]): Node[] {
  const nodes: Node[] = []
  for (const term of createTerms(tokens)) {
    if (
      term[0].type === TokenType.LPAREN &&
      term.at(-1).type === TokenType.RPAREN
    ) {
      nodes.push(evalTerm(parse(term.slice(1, -1))))
    } else {
      for (const subterm of createTerms(term)) {
        if (subterm.length === 1) {
          nodes.push(evalToken(subterm[0]))
        } else {
          nodes.push(evalTerm(parse(subterm.slice(1, -1))))
        }
      }
    }
  }
  return nodes
}

const input = getInputLines<Token>('p2/out.scan', xmlToToken)

for (const expr of parse(input)) {
  console.log(astToXml(expr))
}
