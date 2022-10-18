import { readFileSync } from "fs";

export function toSentenceCase(str: string) {
  return str[0].toUpperCase() + str.substring(1).toLowerCase()
}

export function getInputLines<T>(source: string, converter: ((string) => T) = (e) => e): T[] {
  return readFileSync(source)
    .toString()
    .split('\n')
    .filter(Boolean)
    .map(converter)
}