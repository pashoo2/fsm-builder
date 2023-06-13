import { MOCK_FSM_STATE_NUMERIC_INPUT_OUTPUT } from "../../../fsm-abstract/__mock__/state.js"
import { FSMContext, FSMState, FSMStateWithValidationAbstractImpl } from "../../../fsm-abstract/index.js"
import { FSMStateWithTransitionFunctionAndValidationImpl, type FSMStateWithTransitionFunctionAndValidationImplConstructorParameters } from "./state-with-transition-function-and-validation.js"

type InputValue = number
type OutputValue = number

const MOCK_CONTEXT: FSMContext<InputValue, OutputValue> = Object.freeze({
    output: MOCK_FSM_STATE_NUMERIC_INPUT_OUTPUT.output, 
    state: {
        ...MOCK_FSM_STATE_NUMERIC_INPUT_OUTPUT,
    } as FSMState<InputValue, OutputValue>,
    changeState: jest.fn(),
    accept: jest.fn(),
})

const MOCK_FSM_STATE_WITH_TRANSITION_FUNCTION_AND_VALIDATION_IMPL_CONSTRUCTOR_PARAMETERS: FSMStateWithTransitionFunctionAndValidationImplConstructorParameters<InputValue, OutputValue> = {
    getContext(): FSMContext<InputValue, OutputValue> {
        return MOCK_CONTEXT
    },
    getTransitionFunction: jest.fn(),
    outputValue: MOCK_FSM_STATE_NUMERIC_INPUT_OUTPUT.output,
    validatorFSMContextInstance: Object.freeze({
        validate: jest.fn(),  
    }),
    validatorFSMStateOutput: Object.freeze({
        validate: jest.fn(),  
    }),
}

describe('FSMStateWithTransitionFunctionAndValidationImpl', () => {
    describe('Constructor', () => {
        it('Should throw an exception if it is called without parameters', () => {
            expect(() => new (FSMStateWithTransitionFunctionAndValidationImpl as any)()).toThrow()
        })
        it('Should throw an exception if it is called without all required parameters', () => {
            expect(() => new (FSMStateWithTransitionFunctionAndValidationImpl as any)({})).toThrow()
        })
        it('Should not throw if is invoked with all required parameters', () => {
            expect(() => new FSMStateWithTransitionFunctionAndValidationImpl(MOCK_FSM_STATE_WITH_TRANSITION_FUNCTION_AND_VALIDATION_IMPL_CONSTRUCTOR_PARAMETERS)).not.toThrow()
        })
        it('Should return a value that conforms to the FSMState interface', () => {
            expect(new FSMStateWithTransitionFunctionAndValidationImpl(MOCK_FSM_STATE_WITH_TRANSITION_FUNCTION_AND_VALIDATION_IMPL_CONSTRUCTOR_PARAMETERS)).toEqual(expect.objectContaining({
                output: expect.any(Number),
                accept: expect.any(Function),
            }))
        })
        it('Should invoke the output value validator', () => {
            (MOCK_FSM_STATE_WITH_TRANSITION_FUNCTION_AND_VALIDATION_IMPL_CONSTRUCTOR_PARAMETERS.validatorFSMStateOutput.validate as jest.Mock).mockReset()
            new FSMStateWithTransitionFunctionAndValidationImpl(MOCK_FSM_STATE_WITH_TRANSITION_FUNCTION_AND_VALIDATION_IMPL_CONSTRUCTOR_PARAMETERS)
            expect(MOCK_FSM_STATE_WITH_TRANSITION_FUNCTION_AND_VALIDATION_IMPL_CONSTRUCTOR_PARAMETERS.validatorFSMStateOutput.validate).toHaveBeenCalledWith(
                MOCK_FSM_STATE_WITH_TRANSITION_FUNCTION_AND_VALIDATION_IMPL_CONSTRUCTOR_PARAMETERS.outputValue
            )
        })
    })

    describe('Instance', () => {
        let instance: FSMStateWithValidationAbstractImpl<InputValue, OutputValue>

        beforeEach(() => {
            instance = new FSMStateWithTransitionFunctionAndValidationImpl(MOCK_FSM_STATE_WITH_TRANSITION_FUNCTION_AND_VALIDATION_IMPL_CONSTRUCTOR_PARAMETERS)
        })

        describe('Methods', () => {
            describe('accept', () => {
                it('Should invoke the "context.changeState" with a value returned by the transition function', () => {
                    const expectedTransitionFunctionReturnValue = {} as any
                    const transitionFunction = jest.fn(() => expectedTransitionFunctionReturnValue);
                    (MOCK_FSM_STATE_WITH_TRANSITION_FUNCTION_AND_VALIDATION_IMPL_CONSTRUCTOR_PARAMETERS.getTransitionFunction as jest.Mock).mockReturnValue(transitionFunction)
                    
                    const expectedInput = 12.12
                    instance.accept(expectedInput)
                    expect(transitionFunction).toHaveBeenCalledWith(instance, expectedInput)
                    expect(MOCK_CONTEXT.changeState).toHaveBeenCalledWith(expectedTransitionFunctionReturnValue)
                })
            })
        })
    })
})