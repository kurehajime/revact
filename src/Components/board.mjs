import Stone from './stone.mjs';
export default function Board(props) {
    const COL = 8;
    const width = 500 / COL;
    return (
        <span id="box">
            <div id="board" >
                <svg viewBox="0 0 500 500" width="500" height="500">
                    {props.stones.map((data, index) => {
                        const x = (index % COL) | 0;
                        const y = (index / COL) | 0;
                        return <Stone
                            key={index}
                            color={data}
                            width={width}
                            x={x}
                            y={y}
                            onClick={props.onClick}
                            index={index}
                        />;
                    })}
                </svg>
            </div >
        </span>
    );
}