import type { FSMContext, FSMState, StateInputValue, StateOutputValue } from "../../../types/index.js";
import { DecoratorValidateConstructorParameterIsObject, isDefined } from "../../../../utils/index.js";
import { FSMContextImpl } from "../../basic/context.js";
import type { ValidatorFSMStateInstance, ValidatorFSMStateInput } from "../types/index.js";
import { assert } from 'console';

export interface FSMContextWithValidationImplConstructorParameters<I extends StateInputValue, O extends StateOutputValue> {
    /**
     * The very first state.
     *
     * @type {FSMState<I, O>}
     * @memberof FSMContextWithValidationImplConstructorParameters
     */
    initialState: FSMState<I, O>;
    /**
     * This validator is used to validate a state each time it is changed by the instance.
     *
     * @type {ValidatorFSMStateInstance}
     * @memberof FSMContextWithValidationImplConstructorParameters
     */
    validatorFSMState: ValidatorFSMStateInstance;
    /**
     * This validator is used to validate an input value before passing it down to the state instance. 
     *
     * @type {ValidatorFSMStateInput<I>}
     * @memberof FSMContextWithValidationImplConstructorParameters
     */
    validatorFSMStateInput: ValidatorFSMStateInput<I>;
}

/**
 * An implementation of the FSMContext interface with validation of FSMState.
 *
 * @export
 * @class FSMContextWithValidationImpl
 * @implements {FSMContext<I, O>}
 * @template I
 * @template O
 */
@DecoratorValidateConstructorParameterIsObject
export class FSMContextWithValidationImpl<I extends StateInputValue, O extends StateOutputValue> extends FSMContextImpl<I, O> implements FSMContext<I, O> {
    protected _validatorFSMState: ValidatorFSMStateInstance;
    protected _validatorFSMStateInput: ValidatorFSMStateInput<I>;
    constructor(parameters: FSMContextWithValidationImplConstructorParameters<I, O>) {
        const { initialState, validatorFSMState, validatorFSMStateInput } = parameters
        
        assert(isDefined(validatorFSMState), '"validatorFSMState" parameter is required')
        assert(isDefined(validatorFSMStateInput), '"validatorFSMStateInput" parameter is required')
        
        validatorFSMState.validate(initialState)
        
        super(initialState);

        this._validatorFSMState = validatorFSMState
        this._validatorFSMStateInput = validatorFSMStateInput
    }

    public override accept(input: I): void {
        this._validatorFSMStateInput.validate(input);
        super.accept(input);
    }

    public override changeState(newState: FSMState<I, O>): void {
        this._validatorFSMState.validate(newState);
        super.changeState(newState);
    }
}