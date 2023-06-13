import { MOCK_FSM_STATE_NUMERIC_INPUT_OUTPUT } from "../../../../../fsm-abstract/__mock__/state.js";
import { FSMState } from "../../../../../fsm-abstract/index.js";
import { createFSMStateTransitionFunctionByStateTransitionsGraph } from "./factory-transition-function-by-state-transitions-graph.js";
import { type FSMStatesTransitionGraphAdjacencyListRepresentation } from "./types.js";

type InputType = number
type OutputType = number

const input1: InputType = 1
const input2: InputType = 2
const input3: InputType = 3

const state1: FSMState<InputType, OutputType> = {
    ...MOCK_FSM_STATE_NUMERIC_INPUT_OUTPUT,
    output: input1,
}
const state2: FSMState<InputType, OutputType> = {
    ...MOCK_FSM_STATE_NUMERIC_INPUT_OUTPUT,
    output: input2,
}
const state3: FSMState<InputType, OutputType> = {
    ...MOCK_FSM_STATE_NUMERIC_INPUT_OUTPUT,
    output: input3,
}

const getGraphAdjacencyListMock = (): FSMStatesTransitionGraphAdjacencyListRepresentation<InputType, OutputType> => {
    const statesTransitionGraph: FSMStatesTransitionGraphAdjacencyListRepresentation<InputType, OutputType> = new Map()
    
    const adjListState1 = new Map()
    adjListState1.set(input2, state2)
    statesTransitionGraph.set(state1, adjListState1)

    const adjListState2 = new Map()
    adjListState2.set(input3, state3)
    statesTransitionGraph.set(state2, adjListState2)

    const adjListState3 = new Map()
    adjListState3.set(input2, state2)
    adjListState3.set(input1, state1)
    adjListState3.set(input3, state3)
    statesTransitionGraph.set(state3, adjListState3)

    return statesTransitionGraph;
}

describe('createFSMStateTransitionFunctionByStateTransitionsGraph', () => {
    describe('Factory', () => {
        it('Should not throw an exception', () => {
            expect(() => createFSMStateTransitionFunctionByStateTransitionsGraph(getGraphAdjacencyListMock())).not.toThrow()
        })
        it('Should return a function', () => {
            expect(createFSMStateTransitionFunctionByStateTransitionsGraph(getGraphAdjacencyListMock())).toEqual(expect.any(Function))
        })

        // TODO: check for incorrect inputs and false positives
    })

    describe('Transition function', () => {
        let transitionFunction
        beforeEach(() => {
            transitionFunction = createFSMStateTransitionFunctionByStateTransitionsGraph(getGraphAdjacencyListMock())
        })

        describe('Transitions State1', () => {
            const initialState = state1

            it('Should throw an exception if there is no transitions for the given input', () => {
                expect(() => transitionFunction(initialState, input1)).toThrow()
                expect(() => transitionFunction(initialState, input3)).toThrow()
            })
            it('Should return State2', () => {
                expect(transitionFunction(initialState, input2)).toBe(state2)
            })
        })

        describe('Transitions State2', () => {
            const initialState = state2

            it('Should throw an exception if there is no transitions for the given input', () => {
                expect(() => transitionFunction(initialState, input1)).toThrow()
                expect(() => transitionFunction(initialState, input2)).toThrow()
            })
            it('Should return State3', () => {
                expect(transitionFunction(initialState, input3)).toBe(state3)
            })
        })
        
        describe('Transitions State3', () => {
            const initialState = state3

            it('Should throw an exception if there is no transitions for the given input', () => {
                expect(() => transitionFunction(initialState, 100)).toThrow()
            })
            it('Should return State3', () => {
                expect(transitionFunction(initialState, input3)).toBe(state3)
            })
            it('Should return State2', () => {
                expect(transitionFunction(initialState, input2)).toBe(state2)
            })
            it('Should return State1', () => {
                expect(transitionFunction(initialState, input1)).toBe(state1)
            })
        })
    })
})