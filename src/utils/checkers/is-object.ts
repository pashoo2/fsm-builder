import type { DefinedKeyValueObject } from "../../types/index.js";

/**
 * Checks if the given value is a non-null object.
 *
 * @export
 * @param {unknown} value - a value to check.
 * @return {boolean}  - true if the given value is an object.
 */
export function isObject(value: unknown): value is DefinedKeyValueObject<typeof value> {
    return value !== null && typeof value === 'object'; 
}