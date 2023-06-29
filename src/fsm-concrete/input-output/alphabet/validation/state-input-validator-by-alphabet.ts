import { strict as assert } from "assert";
import { ValidatorFSMStateInput } from "../../../../fsm-abstract/index.js";
import { Alphabet } from "../types/index.js";
import { isObject } from "../../../../utils/index.js";

/**
 * Validates whether an FSM state input value belongs to the given alphabet or not.
 *
 * @export
 * @class ValidatorFSMStateInputAgainstAlphabetImpl
 * @implements {ValidatorFSMStateInput<T>}
 * @template T
 */
export class ValidatorFSMStateInputAgainstAlphabetImpl<T> implements ValidatorFSMStateInput<T> {
    constructor(protected alphabet: Alphabet<T>) {
        assert(isObject(alphabet), '"alphabet" parameter should be defined')
    }

    /**
     * Check if the given value belongs to the alphabet.
     *
     * @param {T} inputValue
     * @memberof ValidatorFSMStateInputAgainstAlphabetImpl
     * @throws {Error} - throws an exception if the value doesn't belong to the alphabet.
     */
    public validate(inputValue: T): void {
        assert(this.alphabet.isInAlphabet(inputValue), `The given value "${inputValue}" is not in the alphabet`)
    }
}