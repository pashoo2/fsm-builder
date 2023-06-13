import { isNumber } from "../../../../../utils/checkers/is-number.js";
import { Alphabet } from "../../types/alphabet.js";
import { AlphabetImpl, AlphabetImplConstructorParameters } from "../abstract.js";

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
    constructor(parameters: AlphabetImplConstructorParameters<T>) {
        super(parameters)
        const { alphabetValues } = parameters
        alphabetValues.forEach(v => {
            if (!isNumber(v)) {
                throw new Error(`Each value of the set should be a number, but the given value is not "${v}"`)
            }
        })
    }
}
