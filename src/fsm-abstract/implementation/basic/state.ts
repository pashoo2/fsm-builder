import type { ObjectKeyValue } from "../../../types/index.js";
import { DecoratorValidateConstructorParameterIsObject, isDefined } from "../../../utils/index.js";
import type { FSMContextGetter, FSMContext, FSMState, StateInputValue, StateOutputValue } from '../../types/index.js';
import { strict as assert } from 'assert';

export interface FSMStateAbstractImplConstructorParameters<I, O> extends ObjectKeyValue {
    /**
     * Resolves a context object which holds the state.
     *
     * @type {FSMContextGetter<I, O>}
     * @memberof FSMStateImplConstructorParameters
     */
    getContext: FSMContextGetter<I, O>;
    /**
     * The value that poses the state.
     *
     * @type {O}
     * @memberof FSMStateImplConstructorParameters
     */
    outputValue: O;
}

/**
 * An abstract implementation of the FSMState interface.
 *
 * @export
 * @abstract
 * @class FSMStateAbstractImpl
 * @implements {FSMState<I, O>}
 * @template I
 * @template O
 */
@DecoratorValidateConstructorParameterIsObject
export abstract class FSMStateAbstractImpl<I extends StateInputValue, O extends StateOutputValue> implements FSMState<I, O> {
    public get output(): O {
        return this._outputValue;
    }
    protected _outputValue: O;
    protected _getContext: FSMContextGetter<I, O>
    constructor(parameters: FSMStateAbstractImplConstructorParameters<I, O>) {
        const { getContext, outputValue } = parameters

        //TODO: add a decorator to check if all the properties of a single
        // parameter object are defined
        assert(typeof getContext === 'function', 'The "context" parameter should be a function')
        assert(isDefined(outputValue), 'The "outputValue" parameter is required')

        this._outputValue = outputValue;
        this._getContext = getContext;
    }


    public abstract accept(input: I): void;

    protected _resolveContext(): FSMContext<I, O> {
        return this._getContext();
    }

    protected _changeContextStateTo(nextState: FSMState<I, O>): void {
        this._resolveContext().changeState(nextState)
    }
} 