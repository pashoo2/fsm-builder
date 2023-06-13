import { FSMState } from "../index.js";

export const MOCK_FSM_STATE_NUMERIC_INPUT_OUTPUT: FSMState<number, number> = Object.freeze({
    output: 1,
    accept(): void {
        return void undefined;
    }
})