import { DecoratorValidateConstructorParameterIsObject } from "../../../utils/index.js";
import { strict as assert } from 'assert';
import { 
    type FSMState,
    FSMStateWithValidationAbstractImpl,
    type FSMStateWithValidationAbstractImplConstructorParameters,
    type StateInputValue,
    type StateOutputValue,
} from "../../../fsm-abstract/index.js";
import { FSMStateTransitionFunctionGetter, type FSMStateTransitionFunction } from "../types/index.js";

export interface FSMStateWithTransitionFunctionAndValidationImplConstructorParameters<I, O> extends FSMStateWithValidationAbstractImplConstructorParameters<I, O> {
    /**
     * A function that is exploited by the instance to determine a next state based on the given input and 
     * this state.
     *
     * @type {FSMStateTransitionFunction<I, O>}
     * @memberof FSMStateWithTransitionFunctionAndValidationImplConstructorParameters
     */
    getTransitionFunction: FSMStateTransitionFunctionGetter<I, O>
}

/**
 * An implementation of the FSMState interface exploiting a state transition function.
 *
 * @export
 * @abstract
 * @class FSMStateWithTransitionFunctionAndValidationImpl
 * @implements {FSMState<I, O>}
 * @template I
 * @template O
 */
@DecoratorValidateConstructorParameterIsObject
export class FSMStateWithTransitionFunctionAndValidationImpl<I extends StateInputValue, O extends StateOutputValue> extends FSMStateWithValidationAbstractImpl<I, O> implements FSMState<I, O> {
    protected readonly _getTransitionFunction: FSMStateTransitionFunctionGetter<I, O>
    constructor(parameters: FSMStateWithTransitionFunctionAndValidationImplConstructorParameters<I, O>) {
        const { getTransitionFunction } = parameters

        assert(typeof getTransitionFunction === 'function', '"transitionFunction" parameter is not defined')
    
        super(parameters)

        this._getTransitionFunction = getTransitionFunction;
    }


    public accept(input: I): void {
        const transitionFunction: FSMStateTransitionFunction<I, O> = this._getTransitionFunction()

        const nextState: FSMState<I, O> = transitionFunction(this, input)
        this._changeContextStateTo(nextState)
    }
} 