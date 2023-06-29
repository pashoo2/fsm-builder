/**
 * Check if the value is a number of any kind.
 * 
 * NaN, Infinity are included into the set of valid.
 *
 * @export
 * @param {unknown} value
 * @return {boolean}  - true if the value belongs to a numeric type.
 */
// TODO: write a test
export function isNumber(value: unknown): value is number {
    return typeof value === 'number';
}