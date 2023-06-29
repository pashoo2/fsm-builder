import { ValidatorFSMContextInstance, type StateInputValue, type StateOutputValue, ValidatorFSMStateOutput, FSMContextGetter, FSMState } from "../../../fsm-abstract/index.js";
import { type Alphabet, ValidatorFSMStateOutputAgainstAlphabetImpl } from "../../input-output/index.js";
import { FSMStateWithTransitionFunctionAndValidationImpl, type FSMStateWithTransitionFunctionAndValidationImplConstructorParameters } from "../implementation/state-with-transition-function-and-validation.js";
import { type FSMStateTransitionFunctionGetter } from "../index.js";
import { type BuilderFSMStateWithTransitionFunctionAndValidationByOutputAlphabet } from "./types.js";

export class BuilderFSMStateWithTransitionFunctionAndValidationByOutputAlphabetImpl<
    I extends StateInputValue,
    O extends StateOutputValue,
> implements BuilderFSMStateWithTransitionFunctionAndValidationByOutputAlphabet<I, O> {
    protected _fSMStateTransitionFunctionGetter?: FSMStateTransitionFunctionGetter<I, O>
    protected _validatorFSMContextInstance?: ValidatorFSMContextInstance
    protected _validatorFSMStateOutput?: ValidatorFSMStateOutput<O>
    protected _fsmContextGetter?: FSMContextGetter<I, O>
    protected _outputValue?: O
    public setTransitionFunctionGetter(
        getter: FSMStateTransitionFunctionGetter<I, O>
    ): void {
        this._fSMStateTransitionFunctionGetter = getter;
    }
    public setContextValidator(
        validator: ValidatorFSMContextInstance
    ): void {
        this._validatorFSMContextInstance = validator;
    }
    public setContextGetter(
        getter: FSMContextGetter<I, O>
    ): void {
        this._fsmContextGetter = getter;
    }
    public setOutputAlphabet(
        alphabet: Alphabet<O>
    ): void {
        const validator = new ValidatorFSMStateOutputAgainstAlphabetImpl(alphabet)
        this._setOutputValidator(validator);
    }
    public setOutputValue(
        value: O
    ): void {
        this._outputValue = value;
    }
    public build(): FSMState<I, O> {
        // TODO: validate all the parameters
        const outputValue = this._outputValue
        if (!outputValue) {
            throw new Error('The output value should be defined')
        }

        const constructorParameters: FSMStateWithTransitionFunctionAndValidationImplConstructorParameters<I, O> = {
            getContext: this._fsmContextGetter,
            getTransitionFunction: this._fSMStateTransitionFunctionGetter,
            outputValue,
            validatorFSMContextInstance: this._validatorFSMContextInstance,
            validatorFSMStateOutput: this._validatorFSMStateOutput,
        }
        return new FSMStateWithTransitionFunctionAndValidationImpl(constructorParameters) 
    }
    protected _setOutputValidator(
        validator: ValidatorFSMStateOutput<O>
    ): void {
        this._validatorFSMStateOutput = validator;
    }
} 