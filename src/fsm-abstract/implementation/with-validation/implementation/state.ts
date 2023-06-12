import { DecoratorValidateConstructorParameterIsObject, isDefined } from "../../../../utils/index.js";
import type { FSMContext, FSMState, StateInputValue, StateOutputValue } from '../../../types/index.js';
import { strict as assert } from 'assert';
import { FSMStateAbstractImpl, type FSMStateAbstractImplConstructorParameters } from "../../basic/state.js";
import { ValidatorFSMContextInstance, ValidatorFSMStateOutput } from "../index.js";

export interface FSMStateWithValidationAbstractImplConstructorParameters<I, O> extends FSMStateAbstractImplConstructorParameters<I, O> {
    /**
     * Validates instance
     *
     * @type {ValidatorFSMContextInstance}
     * @memberof FSMStateWithValidationAbstractImplConstructorParameters
     */
    validatorFSMContextInstance: ValidatorFSMContextInstance;
    /**
     * Validate the output
     *
     * @type {ValidatorFSMStateOutput<O>}
     * @memberof FSMStateWithValidationAbstractImplConstructorParameters
     */
    validatorFSMStateOutput: ValidatorFSMStateOutput<O>;
}

/**
 * An abstract implementation of the FSMState interface.
 *
 * @export
 * @abstract
 * @class FSMStateWithValidationAbstractImpl
 * @implements {FSMState<I, O>}
 * @template I
 * @template O
 */
@DecoratorValidateConstructorParameterIsObject
export abstract class FSMStateWithValidationAbstractImpl<I extends StateInputValue, O extends StateOutputValue> extends FSMStateAbstractImpl<I, O> implements FSMState<I, O> {
    protected readonly _validatorFSMContextInstance: ValidatorFSMContextInstance;
    constructor(parameters: FSMStateWithValidationAbstractImplConstructorParameters<I, O>) {
        const { validatorFSMContextInstance, validatorFSMStateOutput, outputValue } = parameters

        assert(isDefined(validatorFSMContextInstance), '"validatorFSMContextInstance" parameter is not defined')
        assert(isDefined(validatorFSMStateOutput), '"validatorFSMContextInstance" parameter is not defined')

        validatorFSMStateOutput.validate(outputValue)

        super(parameters)

        this._validatorFSMContextInstance = validatorFSMContextInstance
    }


    public abstract accept(input: I): void;

    protected override _resolveContext(): FSMContext<I, O> {
        const context: FSMContext<I, O> = super._resolveContext();
        
        this._validatorFSMContextInstance.validate(context)
        return context;
    }
} 