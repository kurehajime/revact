import React from 'react';
import ReactDOM from 'react-dom';
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
            <div>
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

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
