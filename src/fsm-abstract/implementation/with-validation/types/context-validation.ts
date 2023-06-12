import type { FSMContext } from "../../../types/index.js";

/**
 * Validates if a value conforms to the FSMContext interface and does other checks.
 *
 * @export
 * @interface ValidatorFSMContextInstance
 */
export interface ValidatorFSMContextInstance {
    /**
     * Perform the validation of the given object.
     *
     * @param {FSMContext<unknown, unknown>} fsmContext - a value to check.
     * @memberof ValidatorFSMContextInstance
     * @throws {Error} - if the object hasn't passed the requirements check.
     */
    validate(fsmContext: FSMContext<unknown, unknown>): void  
}