import { FSMContext } from "./context.js";

/**
 * A value, that is going to be handled by a concrete state. 
 */
export type StateInputValue = unknown;

/**
 * A value that identifies a concrete state uniquely among other possible FSM states.
 */
export type StateOutputValue = unknown;

/**
 * An object representing a possible state of a FSM instance.
 *
 * @export
 * @interface FSMState
 * @template {StateInputValue} I
 * @template {StateOutputValue} O
 */
export interface FSMState<I extends StateInputValue, O extends StateOutputValue> {
    /**
     * A value representing this state.
     *
     * @type {StateOutputValue}
     * @memberof FSMState
     */
    readonly output: O;
    /**
     * Handles a new value and transfers fsm into a new state if necessary.
     *
     * @param {StateInputValue} input - an input value that should be handled by the current state.
     * @throws {Error} - throws an exception if the input value is not correct for this state.
     * @memberof FSMState
     */
    accept(input: I): void;
}

/**
 * A function with no arguments resolving a value of the FSM context. 
 */
export type FSMContextGetter<I extends StateInputValue, O extends StateOutputValue> = () => FSMContext<I, O>