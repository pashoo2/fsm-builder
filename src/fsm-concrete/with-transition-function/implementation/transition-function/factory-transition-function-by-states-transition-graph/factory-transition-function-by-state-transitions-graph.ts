import type { FSMState, StateInputValue, StateOutputValue } from '../../../../../fsm-abstract/types/index.js';
import type { FSMStateTransitionFunction } from "../../../types/index.js";
import type { FSMStatesTransitionGraphAdjacencyListRepresentation, FSMStatesTransitionGraphRepresentationEdges } from './types.js';

/**
 * Creates a transition function based on the provided state transition graph, which is
 * represented by an adjacency list.
 *
 * @export
 * @template I
 * @template O
 * @param {FSMStatesTransitionGraphAdjacencyListRepresentation<I, O>} graphAdjacencyList - defines all possible state transitions.
 * @return {FSMStateTransitionFunction<I, O>}
 */
export function createFSMStateTransitionFunctionByStateTransitionsGraph<I extends StateInputValue, O extends StateOutputValue>(
    graphAdjacencyList: FSMStatesTransitionGraphAdjacencyListRepresentation<I, O>
): FSMStateTransitionFunction<I, O> {
    // TODO: using dfs/bfs traverse the graph and check that every possible state is reachable
    // and all the inputs are exhausted.
    
    // TODO: write tests. There are some possible ways:
    // https://www-verimag.imag.fr/EVENTS/2006/ATVA/ATVAtutorials/Yannakakis_ATVA2006_Tutorial.pdf
    // https://www.cs.ccu.edu.tw/~naiwei/cs5812/st7.pdf

    function fsmStateTransitionFunctionByStateTransitionsGraphImpl(
        this: FSMStatesTransitionGraphAdjacencyListRepresentation<I, O>,
        currentState: FSMState<I, O>,
        input: I
    ): FSMState<I, O> {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const adjacencyList = this;
        
        const edgeListOrUndefined: FSMStatesTransitionGraphRepresentationEdges<I, O> | undefined = adjacencyList.get(currentState)
        if (!edgeListOrUndefined) {
            throw new Error('There is no possible transition from the state')
        }

        const targetStateOrUndefined: FSMState<I, O> | undefined = edgeListOrUndefined.get(input)
        if (!targetStateOrUndefined) {
            throw new Error('There is no possible transition from the current state and the given input')
        }
        return targetStateOrUndefined;
    }

    return fsmStateTransitionFunctionByStateTransitionsGraphImpl.bind(graphAdjacencyList)
}
