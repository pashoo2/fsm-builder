import type { FSMState, StateInputValue, StateOutputValue } from "../../../fsm-abstract/index.js";

/**
 * Determines the next state by the given current state
 * and an input value.
 *
 * @export
 * @interface FSMStateTransitionFunction
 * @template {StateInputValue} I
 * @template {StateOutputValue} O
 */
export interface FSMStateTransitionFunction<I extends StateInputValue, O extends StateOutputValue> {
    (state: FSMState<I, O>, input: I): FSMState<I, O>; 
}

/**
 * Resolves an FSMTransitionFunction.
 */
export type FSMStateTransitionFunctionGetter<I extends StateInputValue, O extends StateOutputValue> = () => FSMStateTransitionFunction<I, O>;
