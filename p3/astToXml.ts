import Node, { NodeType } from '../lib/Node'
import format from 'xml-formatter'
import { toSentenceCase } from '../lib/util'

/**
 * TS implementation of AST to XML
 */
export default function astToXml(ast: Node): string {
  let xmlFragments = []
  if (ast.type === NodeType.APPLY) {
    xmlFragments.push('<Apply>')
    xmlFragments.push(
      (ast.value as Node[])
        .map(childNode => {
          xmlFragments.push(astToXml(childNode))
        })
        .join('')
    )
    xmlFragments.push('</Apply>')
  } else {
    xmlFragments.push(`<${toSentenceCase(ast.type)} value='${ast.value}' />`)
  }
  return format(xmlFragments.join(''), {
    indentation: '  '
  })
}
