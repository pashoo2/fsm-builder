import type { ObjectKeyValue } from "./index.js"

/**
 * Any value that is defined.
 */
export type DefinedValue<T> = Exclude<T, never | undefined | null>

/**
 * Any object that has the format of an object:
 * `{ "key": 'any value' }`.
 */
export type DefinedKeyValueObject<T> = T extends ObjectKeyValue ? DefinedValue<T> : never
