import React, { useReducer } from 'react';
import Board from './board.mjs';
import GameControler from '../game_controller.mjs';
import { init_state } from '../init_state.mjs';

export default function Game(props) {
    const [state, dispatch] = useReducer(GameControler.Clicked, init_state);
    return (
        <div className="game">
            <div className="game-board">
                <Board
                    stones={state.stones}
                    onClick={(number) => {
                        dispatch(number)
                    }}
                />
            </div>
        </div>
    );

}


