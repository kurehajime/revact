import AI from "./ai.mjs";
import { init_state } from "./init_state.mjs";

export default class GameControler {
    static Put(state, selected) {
        state = JSON.parse(JSON.stringify(state));
        if (state.winner != null) {
            return init_state;
        }
        if (state.turn === -1) {
            return state;
        }
        if (AI.canPut(state.stones, selected, state.turn) === false) {
            return state;
        }
        state.stones = AI.putMap(state.stones, selected, state.turn);
        state.turn = -1 * state.turn;
        state.winner = GameControler.checkWinner(state.stones);//勝敗チェック
        state.count++

        return state
    }
    static Think(state) {
        state = JSON.parse(JSON.stringify(state));
        if (state.winner == null) {
            while (true) {
                if (AI.canPutPlayer(state.stones, state.turn)) {
                    const _number = AI.thinkAI(state.stones, state.turn, 6)[0];
                    state.stones = AI.putMap(state.stones, _number, state.turn);
                }
                state.turn = -1 * state.turn;
                state.winner = GameControler.checkWinner(state.stones);//勝敗チェック

                if (state.winner != null || AI.canPutPlayer(state.stones, state.turn)) {
                    return state;
                }
                state.turn = -1 * state.turn;
            }
        }
    }


    static checkWinner(stones) {
        if (!AI.canPutAll(stones)) {
            return AI.calcWinner(stones);
        }
        return null;
    }
}