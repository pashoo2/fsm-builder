import { strict as assert } from 'assert';
import type { FSMContext } from "../../../types/index.js";
import { isObject, isDefined, DecoratorValidateConstructorParameterIsObject } from "../../../../utils/index.js";
import { ValidatorFSMContextInstance } from "../types/index.js";

/**
 * Additional validation of the FSMContext object.
 *
 * @export
 * @interface ValidateFSMContextImplParametersPerformAdditionalChecks
 */
export interface ValidateFSMContextImplParametersPerformAdditionalChecks {
    (fsmContext: FSMContext<unknown, unknown>): void;
}

export interface ValidatorFSMContextImplConstructorParameters {
    /**
     * Checks if the given value respects additional limitations imposed on the FSMContext implementation.
     *
     * @type {ValidateFSMContextImplParametersPerformAdditionalChecks}
     * @memberof ValidatorFSMContextImplConstructorParameters
     */
    performAdditionalChecks?: ValidateFSMContextImplParametersPerformAdditionalChecks;
}

// TODO: add tests
@DecoratorValidateConstructorParameterIsObject
export class ValidatorFSMContextInstanceImpl implements ValidatorFSMContextInstance {
    protected _performAdditionalChecks?: ValidateFSMContextImplParametersPerformAdditionalChecks;
    constructor(parameters: ValidatorFSMContextImplConstructorParameters) {
        const { performAdditionalChecks: validate } = parameters

        assert(typeof validate === 'function', 'The "validate" parameter is expected to be a function')
        this._performAdditionalChecks = validate;
    }

    public validate(fsmContext: FSMContext<unknown, unknown>): void {
        assert(isDefined(fsmContext), 'The value of FSMContext is not defined')
        assert(isObject(fsmContext), 'The value of FSMContext should be an object')
        assert(isDefined(fsmContext['state']), 'The FSMContext must have the "state" property defined')
        assert(typeof fsmContext['changeState'] === 'function', 'The FSMContext must have the "changeState" method')
        assert(typeof fsmContext['accept'] === 'function', 'The FSMContext must have the "accept" method')
    }
}
