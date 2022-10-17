import Node, { NodeType } from './Node'
import format from 'xml-formatter'

/**
 * TS implementation of AST to XML
 */
export default function astToXml(ast: Node): string {
  let xmlFragments = []
  if (ast.type === NodeType.APPLY) {
    xmlFragments.push("<Apply>")
    xmlFragments.push((ast.value as Node[]).map(childNode => {
      xmlFragments.push(astToXml(childNode))
    }).join(''))
    xmlFragments.push("</Apply>")
  } else {
    xmlFragments.push(`<${toSentenceCase(ast.type)} value='${ast.value}' />`)
  }
  return format(xmlFragments.join(''), {
    indentation: '  ',
  })
}

function toSentenceCase(str: string) {
  return str[0].toUpperCase() + str.substring(1).toLowerCase()
}