import { type ValidatorFSMContextInstance, type FSMState, type StateInputValue, type StateOutputValue, type ValidatorFSMStateOutput, type FSMContextGetter, FSMContext, ValidatorFSMStateInstance, ValidatorFSMStateInput } from "../../../fsm-abstract/index.js";
import { Alphabet } from "../../input-output/index.js";
import type { FSMStateTransitionFunctionGetter } from "../types/index.js";

/**
 * Instantiates the FSMState from the given parameters.
 *
 * @export
 * @interface BuilderFSMStateWithTransitionFunctionAndValidationByInputAndOutputAlphabet
 * @template I
 * @template O
 */
export interface BuilderFSMStateWithTransitionFunctionAndValidationByOutputAlphabet<
    I extends StateInputValue,
    O extends StateOutputValue
> {
    setTransitionFunctionGetter(
        getter: FSMStateTransitionFunctionGetter<I, O>
    ): void;
    setOutputAlphabet(
        alphabet: Alphabet<O>
    ): void;
    setContextGetter(
        getter: FSMContextGetter<I, O>
    ): void;
    setContextValidator(
        validator: ValidatorFSMContextInstance
    ): void
    setOutputValue(
        value: O
    ): void;
    build(): FSMState<I, O>
}

/**
 * Instantiates the FSMContext from the given parameters
 *
 * @export
 * @interface BuilderFSMContextWithTransitionFunctionAndValidationByInputAndOutputAlphabet
 * @template I
 * @template O
 */
export interface BuilderFSMContextWithTransitionFunctionAndValidationByInputAndOutputAlphabet<
    I extends StateInputValue,
    O extends StateOutputValue
> {
    setInitialState(
        state: FSMState<I, O>
    ): void;
    setStateValidator(
        validator: ValidatorFSMStateInstance
    ): void;
    setInputAlphabet(
        alphabet: Alphabet<I>
    ): void;
    build(): FSMContext<I, O>
}