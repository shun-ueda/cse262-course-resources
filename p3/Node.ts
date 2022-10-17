/**
 * This file defines `Node`; be careful, it is different from the `Token`s!
 * The difference between the `Token`s and the `Node`s are that `Node`s are always
 * 'evaluable', in other words, can be evaluated into a value. For instance,
 * `CondToken` is just a keyword, but `CondNode` is evaluable into a value.
 *
 * Let me explain what I mean. Some `Node`s, e.g. `IntNode`, `IdentifierNode` will
 * be exactly same as `Token`s - as they're already a value. On the other hand,
 * some other, e.g. `CondToken` will now have some 'values', e.g. 'test' and
 * 'expressions', which enables the program to understand what to 'test', and
 * which 'expression' to run. In p4, we will be evaluating these and actually
 * interpret scheme. Also, there will be `Node`s that does not have a counterpart
 * in `Token`s, e.g. ApplyNode.
 */

export enum NodeType {
  APPLY = 'APPLY',
  INT = 'INT',
  IDENTIFIER = 'IDENTIFIER'
}

export default class Node {
  type: NodeType
  value?: Node[] | string | number
  constructor(type: NodeType, value?: Node[] | string | number) {
    this.type = type
    this.value = value
  }
}
