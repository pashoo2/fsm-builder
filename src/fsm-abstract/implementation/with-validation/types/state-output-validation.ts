import type { StateOutputValue } from "../../../types/index.js";

/**
 * Validates if a value respects the requirement.
 *
 * @export
 * @interface ValidatorFSMStateOutput
 * @template {StateOutputValue} O
 */
export interface ValidatorFSMStateOutput<O extends StateOutputValue> {
    /**
     * Perform the checks against the value expected format and other requirements.
     *
     * @param {O} outputValue - a value to check.
     * @memberof ValidatorFSMStateOutput
     * @throws {Error} - if the object hasn't passed the requirements check.
     */
    validate(outputValue: O): void  
}