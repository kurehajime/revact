import React from 'react';
import { createRoot } from "react-dom/client";
import './index.css';

function Stone(props) {
    const width = props.width;
    const calcX = (props.width * props.x);
    const calcY = (props.width * props.y);
    const canPut = props.canPut;
    let stateClass = "";
    switch (props.color) {
        case 1:
            stateClass = "black";
            break;
        case -1:
            stateClass = "white";
            break;
        default:
            break;
    }
    return (
        <g>
            <rect
                x={calcX}
                y={calcY}
                width={width}
                height={width}
                className="cell"
            />
            <circle
                r={width / 2.6}
                cx={(width / 2) + calcX}
                cy={(width / 2) + calcY}
                className={`stone ${stateClass}`}
            />
            <circle
                r={width / 5}
                cx={(width / 2) + calcX}
                cy={(width / 2) + calcY}
                className={`mark ${canPut}`}
            />
        </g>
    );
}

class Board extends React.Component {
    render() {
        const COL = 8;
        const width = 500 / COL;
        return (
            <span id="box">
                <div id="board" >
                    <svg viewBox="0 0 500 500" width="500" height="500">
                        {this.props.stones.map((data, index) => {
                            const x = (index % COL) | 0;
                            const y = (index / COL) | 0;
                            return <Stone
                                key={index}
                                color={data}
                                width={width}
                                x={x}
                                y={y}
                            />;
                        })}
                    </svg>
                </div >
            </span>
        );
    }
}

class Game extends React.Component {
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
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <span>
        <canvas id="back"></canvas>
        <div id="app">
            <div id="title">Revact</div>
            <Game />
        </div>
    </span>
);