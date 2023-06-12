import type { FSMState } from "../../../types/index.js";

/**
 * Validates if a value conforms to the FSMState interface and does other checks.
 *
 * @export
 * @interface ValidatorFSMStateInstance
 */
export interface ValidatorFSMStateInstance {
    /**
     * Perform the validation of the given object.
     *
     * @param {FSMState<unknown, unknown>} fsmState - a value to check.
     * @memberof ValidatorFSMStateInstance
     * @throws {Error} - if the object hasn't passed the requirements check.
     */
    validate(fsmState: FSMState<unknown, unknown>): void  
}
