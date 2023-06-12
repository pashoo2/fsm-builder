import type { DefinedValue } from "../../types/index.js"

/**
 * Checks if the given value is defined.
 *
 * @export
 * @param {unknown} value - a value to check.
 * @return {boolean} - true if the value is not undefined or null.
 */
export function isDefined(value: unknown): value is DefinedValue<typeof value> {
    if (typeof value === 'number' && Number.isNaN(value)) {
        return false;
    }
    return value !== undefined && value !== null;
} 