import React, { useState } from 'react';
import Board from './board.mjs';
import GameControler from '../game_controller.mjs';
import { init_state } from '../init_state.mjs';

export default function Game(props) {
    const [state, setState] = useState(init_state);
    const turn = state.turn === 1 ? "black" : "white"
    let winner = ""
    let black = state.stones.filter(x => x === 1).length
    let white = state.stones.filter(x => x === -1).length
    switch (state.winner) {
        case 0:
            winner = "Draw Game...";
            break;
        case 1:
            winner = "Black wins!";
            break;
        case -1:
            winner = "White wins!";
            break;
        default:
            break;
    }
    return (
        <div className="game">
            <div className="game-board">
                <Board
                    stones={state.stones}
                    onClick={(number) => {
                        const newState1 = GameControler.Put(state, number)
                        setState(newState1)
                        if (newState1.turn === -1) {
                            setTimeout(() => {
                                const newState2 = GameControler.Think(newState1)
                                setState(newState2)
                            }, 1000);
                        }
                    }}
                />
                <div id="turn">{turn}</div>
                <div id="score">
                    black:{black}<br />
                    white:{white}
                </div>
                <div id="winner">{winner}</div>
            </div>
        </div>
    );

}
