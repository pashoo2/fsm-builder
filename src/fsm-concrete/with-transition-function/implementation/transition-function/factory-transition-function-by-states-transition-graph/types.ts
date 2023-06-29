import { FSMState, StateInputValue, StateOutputValue } from "../../../../../fsm-abstract/index.js";

/**
 * The vertex is a FSM state.
 */
export type FSMStatesTransitionGraphRepresentationVertex<I extends StateInputValue, O extends StateOutputValue> = FSMState<I, O>

/**
 * A list of edges that a vertex is connected to.
 * The key is a state input value and the target state is the value. 
 */
export type FSMStatesTransitionGraphRepresentationEdges<I extends StateInputValue, O extends StateOutputValue> = Map<I, FSMState<I, O>>;

/**
 * Representation of FSM state transitions in a form of adjacency list with FSM states as keys and edges defined by an input and FSM state as
 * the target vertex. 
 */
export type FSMStatesTransitionGraphAdjacencyListRepresentation<I extends StateInputValue, O extends StateOutputValue> = Map<
    FSMStatesTransitionGraphRepresentationVertex<I, O>,
    FSMStatesTransitionGraphRepresentationEdges<I, O>
>
