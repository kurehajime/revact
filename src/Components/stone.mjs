export default function Stone(props) {
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
