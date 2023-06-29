import { assert } from "console";
import type { FSMContext, FSMState, StateInputValue, StateOutputValue } from "../../types/index.js";
import { isDefined } from "../../../utils/index.js";

// TODO: add tests

/**
 * A basic implementation of the FSMContext interface.
 *
 * @export
 * @class FSMContextImpl
 * @implements {FSMContext<I, O>}
 * @template I
 * @template O
 */
export class FSMContextImpl<I extends StateInputValue, O extends StateOutputValue> implements FSMContext<I, O> {
    public get state(): FSMState<I, O> {
        return this._state;
    }
    public get output(): O {
        return this._state.output;
    }
    constructor(protected _state: FSMState<I, O>) {
        assert(isDefined(_state), 'The initial state is required')
    }

    public accept(input: I): void {
        this._state.accept(input);
    }

    public changeState(newState: FSMState<I, O>): void {
        if (this._state === newState) {
            return
        }
        this._state = newState;
    }
}