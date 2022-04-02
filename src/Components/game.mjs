import React, { useState } from 'react';
import Board from './board.mjs';
import GameControler from '../game_controller.mjs';
import { init_state } from '../init_state.mjs';

export default function Game(props) {
    const [state, setState] = useState(init_state);

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    stones={state.stones}
                    onClick={(number) => {
                        if (state.turn !== -1) {
                            const newState1 = GameControler.Put(state, number)
                            setState(newState1)
                            if (newState1.turn === -1) {
                                setTimeout(() => {
                                    const newState2 = GameControler.Think(newState1)
                                    setState(newState2)
                                }, 1000);
                            }
                        }
                    }}
                />
            </div>
        </div>
    );

}


