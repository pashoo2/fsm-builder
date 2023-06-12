/**
 * A set of values.
 *
 * @export
 * @interface Alphabet
 * @template T - the type of an alphabet's item.
 */
export interface Alphabet<T> {
    /**
     * The name of this alphabet.
     *
     * @type {string}
     * @memberof Alphabet
     */
    readonly name: string;
    /**
     * Check if a value belongs to the alphabet.
     *
     * @param {unknown} value
     * @return {boolean}  {value is T}
     * @memberof Alphabet
     */
    isInAlphabet(value: unknown): value is T;
}
