import { FSMContext, FSMContextGetter, FSMState, ValidatorFSMContextInstanceImpl, ValidatorFSMStateInstanceImpl } from "../../fsm-abstract/index.js";
import { AlphabetBinaryBitImpl, AlphabetBinaryBitItem, AlphabetNumericSetImpl } from "../../fsm-concrete/input-output/index.js";
import { BuilderFSMContextWithTransitionFunctionAndValidationByInputAndOutputAlphabetImpl } from "../../fsm-concrete/with-transition-function/builder/context.js";
import { BuilderFSMStateWithTransitionFunctionAndValidationByOutputAlphabetImpl } from "../../fsm-concrete/with-transition-function/builder/state.js";
import { FSMStatesTransitionGraphAdjacencyListRepresentation, FSMStatesTransitionGraphRepresentationEdges, FSMStatesTransitionGraphRepresentationVertex, createFSMStateTransitionFunctionByStateTransitionsGraph } from "../../fsm-concrete/with-transition-function/implementation/index.js";
import { FSMStateTransitionFunction, FSMStateTransitionFunctionGetter } from "../../fsm-concrete/with-transition-function/index.js";
import type { ModuloThree } from "../types/index.js";

export type StateInputValueBinary = AlphabetBinaryBitItem;

export type StateOutputValueReminder = 0 | 1 | 2

/**
 * A factory that returns an implementation of the modulo three calculation function.
 *
 * @export
 * @return {ModuloThree}
 */
export function factoryModuloThreeImpl(): ModuloThree {
    const inputAlphabet = new AlphabetBinaryBitImpl();
    const outputAlphabet = new AlphabetNumericSetImpl({
        name: "reminder",
        alphabetValues: new Set([ 0, 1, 2 ])
    });
    const contextValidator = new ValidatorFSMContextInstanceImpl({})

    // eslint-disable-next-line prefer-const
    let initialState: FSMState<StateInputValueBinary, StateOutputValueReminder>
    // eslint-disable-next-line prefer-const
    let stateTransitionGraph: FSMStatesTransitionGraphAdjacencyListRepresentation<
        FSMState<StateInputValueBinary, StateOutputValueReminder>,
        FSMStatesTransitionGraphRepresentationEdges<StateInputValueBinary, StateOutputValueReminder>
    >

    let fsmContextOrUndefined: FSMContext<StateInputValueBinary, StateOutputValueReminder> | undefined;
    const getContext: FSMContextGetter<StateInputValueBinary, StateOutputValueReminder> = () => {
        if (fsmContextOrUndefined) {
            return fsmContextOrUndefined;
        }
        
        const contextBuilder = new BuilderFSMContextWithTransitionFunctionAndValidationByInputAndOutputAlphabetImpl<
            StateInputValueBinary,
            StateOutputValueReminder
        >()
        
        contextBuilder.setInitialState(initialState)
        contextBuilder.setInputAlphabet(inputAlphabet)
        contextBuilder.setStateValidator(new ValidatorFSMStateInstanceImpl({}))
        
        fsmContextOrUndefined = contextBuilder.build()
        return fsmContextOrUndefined;
    }

    let transitionFunctionOrUndefined: FSMStateTransitionFunction<StateInputValueBinary, StateOutputValueReminder> | undefined
    const transitionFunctionGetter: FSMStateTransitionFunctionGetter<StateInputValueBinary, StateOutputValueReminder> = () => {
        if (transitionFunctionOrUndefined) {
            return transitionFunctionOrUndefined
        }
        transitionFunctionOrUndefined = createFSMStateTransitionFunctionByStateTransitionsGraph(stateTransitionGraph)
        return transitionFunctionOrUndefined;
    }

    // TODO: DRY violation - add a factory/builder

    const zeroStateBuilder = new BuilderFSMStateWithTransitionFunctionAndValidationByOutputAlphabetImpl<
        StateInputValueBinary, StateOutputValueReminder
    >()
    zeroStateBuilder.setContextGetter(getContext)
    zeroStateBuilder.setContextValidator(contextValidator)
    zeroStateBuilder.setOutputValue(0)
    zeroStateBuilder.setOutputAlphabet(outputAlphabet)
    zeroStateBuilder.setTransitionFunctionGetter(transitionFunctionGetter)
    const zeroState = zeroStateBuilder.build()
    initialState = zeroState


    const firstStateBuilder = new BuilderFSMStateWithTransitionFunctionAndValidationByOutputAlphabetImpl<
        StateInputValueBinary, StateOutputValueReminder
    >()
    firstStateBuilder.setContextGetter(getContext)
    firstStateBuilder.setContextValidator(contextValidator)
    firstStateBuilder.setOutputValue(1)
    firstStateBuilder.setOutputAlphabet(outputAlphabet)
    firstStateBuilder.setTransitionFunctionGetter(transitionFunctionGetter)
    const firstState = firstStateBuilder.build() 

    const secondStateBuilder = new BuilderFSMStateWithTransitionFunctionAndValidationByOutputAlphabetImpl<
        StateInputValueBinary, StateOutputValueReminder
    >()
    secondStateBuilder.setContextGetter(getContext)
    secondStateBuilder.setContextValidator(contextValidator)
    secondStateBuilder.setOutputValue(2)
    secondStateBuilder.setOutputAlphabet(outputAlphabet)
    secondStateBuilder.setTransitionFunctionGetter(transitionFunctionGetter)
    const secondState = secondStateBuilder.build()

    stateTransitionGraph = new Map()
    
    const zeroStateAdjacencyList: FSMStatesTransitionGraphRepresentationEdges<StateInputValueBinary, StateOutputValueReminder> = new Map()
    zeroStateAdjacencyList.set(0, zeroState)
    zeroStateAdjacencyList.set(1, firstState)
    stateTransitionGraph.set(zeroState, zeroStateAdjacencyList)

    const firstStateAdjacencyList: FSMStatesTransitionGraphRepresentationEdges<StateInputValueBinary, StateOutputValueReminder> = new Map()
    firstStateAdjacencyList.set(1, zeroState)
    firstStateAdjacencyList.set(0, secondState)
    stateTransitionGraph.set(firstState, firstStateAdjacencyList)
    
    const secondStateAdjacencyList: FSMStatesTransitionGraphRepresentationEdges<StateInputValueBinary, StateOutputValueReminder> = new Map()
    secondStateAdjacencyList.set(1, secondState)
    secondStateAdjacencyList.set(0, firstState)
    stateTransitionGraph.set(secondState, secondStateAdjacencyList)

    const moduloThreeImpl: ModuloThree = (binaryNumberStringified: string): number => {
        const fsmContext = getContext()

        for (const char of binaryNumberStringified) {
            fsmContext.accept(Number(char) as StateInputValueBinary)    
        }
        
        return fsmContext.output;
    }

    return moduloThreeImpl;
}