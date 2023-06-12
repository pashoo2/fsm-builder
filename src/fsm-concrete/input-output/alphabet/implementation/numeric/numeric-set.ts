import { Alphabet } from "../../types/alphabet.js";
import { AlphabetImpl } from "../abstract.js";

/**
 * A set of certain numbers is the possible values of this alphabet.
 *
 * @export
 * @class AlphabetNumericSetImpl
 * @extends {AlphabetImpl<T>}
 * @implements {Alphabet<T>}
 * @template T
 */
export class AlphabetNumericSetImpl<T extends number> extends AlphabetImpl<T> implements Alphabet<T> {
}
