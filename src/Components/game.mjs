import React from 'react';
import Board from './board.mjs';
export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stones: [0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, -1, 1, 0, 0, 0,
                0, 0, 0, 1, -1, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0,
            ],
            xIsNext: true
        };
    }


    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        stones={this.state.stones}
                    />
                </div>
            </div>
        );
    }
}
