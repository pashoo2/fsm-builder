import type { StateInputValue } from "../../../types/index.js";

/**
 * Validates if a value respects the requirement.
 *
 * @export
 * @interface ValidatorFSMStateInput
 * @template I
 */
export interface ValidatorFSMStateInput<I extends StateInputValue> {
    /**
     * Perform the checks against the value expected format and other requirements.
     *
     * @param {I} inputValue - a value to check.
     * @memberof ValidatorFSMStateInput
     * @throws {Error} - if the object hasn't passed the requirements check.
     */
    validate(inputValue: I): void  
}