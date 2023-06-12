import { strict as assert } from 'assert';
import type { FSMState } from "../../../types/index.js";
import { isObject, isDefined, DecoratorValidateConstructorParameterIsObject } from "../../../../utils/index.js";
import type { ValidatorFSMStateInstance } from "../types/state-validation.js";

/**
 * Additional validation of the FSMContext object.
 *
 * @export
 * @interface ValidateFSMStateInstanceImplParametersPerformAdditionalChecks
 */
export interface ValidateFSMStateInstanceImplConstructorParametersPerformAdditionalChecks {
    (fsmState: FSMState<unknown, unknown>): void;
}

export interface ValidatorFSMStateInstanceImplConstructorParameters {
    /**
     * Checks if the given value respects additional limitations imposed on the FSMContext implementation.
     *
     * @type {ValidateFSMStateInstanceImplConstructorParametersPerformAdditionalChecks}
     * @memberof ValidatorFSMStateInstanceImplConstructorParameters
     */
    performAdditionalChecks?: ValidateFSMStateInstanceImplConstructorParametersPerformAdditionalChecks;
}

// TODO: add tests
@DecoratorValidateConstructorParameterIsObject
export class ValidatorFSMStateInstanceImpl implements ValidatorFSMStateInstance {
    protected _performAdditionalChecks?: ValidateFSMStateInstanceImplConstructorParametersPerformAdditionalChecks;
    constructor(parameters: ValidatorFSMStateInstanceImplConstructorParameters) {
        const { performAdditionalChecks: validate } = parameters

        assert(typeof validate === 'function', 'The "validate" parameter is expected to be a function')
        this._performAdditionalChecks = validate;
    }

    public validate(fsmState: FSMState<unknown, unknown>): void {
        assert(isDefined(fsmState), 'The value of FSMContext is not defined')
        assert(isObject(fsmState), 'The value of FSMContext should be an object')
        assert(typeof fsmState['accept'] === 'function', 'The FSMContext must have the "accept" method')
    }
}
