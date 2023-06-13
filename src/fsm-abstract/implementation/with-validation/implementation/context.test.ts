import { MOCK_FSM_STATE_NUMERIC_INPUT_OUTPUT } from "../../../__mock__/index.js";
import { FSMContextWithValidationImpl, type FSMContextWithValidationImplConstructorParameters } from "./context.js"

const CONSTRUCTOR_PARAMETERS: FSMContextWithValidationImplConstructorParameters<number, number> = Object.freeze({
    initialState: {
        ...MOCK_FSM_STATE_NUMERIC_INPUT_OUTPUT,
    },
    validatorFSMState: {
        validate() {
            return void undefined;
        }
    },
    validatorFSMStateInput: {
        validate() {
            return void undefined;
        }
    }
});

describe('FSMContextWithValidationImpl', () => {
    describe('Constructor', () => {
        it('Should throw an exception if called out without parameters', () => {
            expect(() => new (FSMContextWithValidationImpl as any)()).toThrow()
        })
        it('Should not throw if invoked with valid parameters', () => {
            expect(() => {
                new FSMContextWithValidationImpl<number, number>({
                    ...CONSTRUCTOR_PARAMETERS,
                })
            }).not.toThrow()
        })
    })
    describe('Instance', () => {
        let instance: FSMContextWithValidationImpl<number, number>

        beforeEach(() => {
            const initialState = {
                ...CONSTRUCTOR_PARAMETERS.initialState,
                accept(input: number) {
                    instance.changeState(Object.freeze({
                        ...initialState,
                        output: input,
                    }));
                }
            };
            instance = new FSMContextWithValidationImpl<number, number>({
                ...CONSTRUCTOR_PARAMETERS,
                initialState: Object.freeze(initialState),
            })
        })

        describe('Methods', () => {
            describe('"accept"', () => {
                it('Should transfer the state to the expected', () => {
                    const nextStateOutputValueExpected = 10
                    expect(() => instance.accept(nextStateOutputValueExpected)).not.toThrow()
                    expect(instance.output).toBe(nextStateOutputValueExpected)
                    expect(instance.state.output).toBe(nextStateOutputValueExpected)
                })
            })
        })
    })
})