import { ValidatorFSMStateInput, type StateInputValue, type StateOutputValue, FSMState, ValidatorFSMStateInstance, FSMContextWithValidationImpl, FSMContextWithValidationImplConstructorParameters, FSMContext } from "../../../fsm-abstract/index.js";
import { Alphabet, ValidatorFSMStateInputAgainstAlphabetImpl } from "../../input-output/index.js";
import { type BuilderFSMContextWithTransitionFunctionAndValidationByInputAndOutputAlphabet } from "./types.js";

export class BuilderFSMContextWithTransitionFunctionAndValidationByInputAndOutputAlphabetImpl<
    I extends StateInputValue,
    O extends StateOutputValue
> implements BuilderFSMContextWithTransitionFunctionAndValidationByInputAndOutputAlphabet<I, O> {
    protected _initialState?: FSMState<I, O>
    protected _validatorFSMStateInstance?: ValidatorFSMStateInstance
    protected _validatorFSMStateInput?: ValidatorFSMStateInput<I>
    public setInitialState(
        state: FSMState<I, O>
    ): void {
        this._initialState = state;
    }
    public setStateValidator(
        validator: ValidatorFSMStateInstance
    ): void {
        this._validatorFSMStateInstance = validator;
    }
    public setInputAlphabet(
        alphabet: Alphabet<I>
    ): void {
        const inputValidator = new ValidatorFSMStateInputAgainstAlphabetImpl(alphabet)
        this._setInputValidator(inputValidator);
    }
    public build(): FSMContext<I, O> {
        // TODO: validate all the parameters.
        const constructorParameters: FSMContextWithValidationImplConstructorParameters<I, O> = {
            initialState: this._initialState,
            validatorFSMState: this._validatorFSMStateInstance,
            validatorFSMStateInput: this._validatorFSMStateInput,
        }
        const fsmContext: FSMContext<I, O> = new FSMContextWithValidationImpl(constructorParameters)

        return fsmContext;
    }

    protected _setInputValidator(
        validator: ValidatorFSMStateInput<I>
    ): void {
        this._validatorFSMStateInput = validator;
    }
}