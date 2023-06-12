import { FSMState, StateInputValue, StateOutputValue } from "./state.js";

/**
 * An instantiated FSM.
 *
 * @export
 * @interface FSMContext
 * @extends {FSMState<V>}
 * @template {StateInputValue} I - possible input values for FSM states.
 * @template {StateOutputValue} O - possible output values for FSM states.
 */
export interface FSM<I extends StateInputValue, O extends StateOutputValue> extends FSMState<I, O> {
    /**
     * The current state of the FSM.
     *
     * @type {FSMState<V> | undefined} - the state not defined means that the FSM isn't initialized yet. 
     * @memberof FSMContext
     */
    readonly state: FSMState<I, O>;
}

/**
 * An object that provides a certain functionality to a concrete FSMState state
 * and allows it to make a FSM state transition.
 *
 * @export
 * @interface FSMContext
 * @extends {FSM<V>}
 * @template {StateInputValue} I - possible input values for FSM states.
 * @template {StateOutputValue} O - possible output values for FSM states.
 */
export interface FSMContext<I, O> extends FSM<I, O> {
    /**
     * Set the current state to the given one.
     *
     * @param {FSMState<I, O>} newState - the target state to which FSM will be transferred.
     * @memberof FSMContext
     * @throws {Error} - exception is thrown if a state is not a valid state that FSM may hold.
     */
    changeState(newState: FSMState<I, O>): void;
}
