import { strict as assert } from "assert";
import { ValidatorFSMStateOutput } from "../../../../fsm-abstract/index.js";
import { Alphabet } from "../types/index.js";
import { isObject } from "../../../../utils/index.js";

/**
 * Validates whether an FSM state output value belongs to the given alphabet or not.
 *
 * @export
 * @class ValidatorFSMStateOutputAgainstAlphabetImpl
 * @implements {ValidatorFSMStateOutput<T>}
 * @template T
 */
export class ValidatorFSMStateOutputAgainstAlphabetImpl<T> implements ValidatorFSMStateOutput<T> {
    constructor(protected alphabet: Alphabet<T>) {
        assert(isObject(alphabet), '"alphabet" parameter should be defined')
    }

    /**
     * Check if the given value belongs to the alphabet.
     *
     * @param {T} inputValue
     * @memberof ValidatorFSMStateOutputAgainstAlphabetImpl
     * @throws {Error} - throws an exception if the value doesn't belong to the alphabet.
     */
    public validate(inputValue: T): void {
        assert(this.alphabet.isInAlphabet(inputValue), `The given value "${inputValue}" is not in the alphabet`)
    }
}