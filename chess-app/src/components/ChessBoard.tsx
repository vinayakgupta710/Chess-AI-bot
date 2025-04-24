import Square from "./Square";

export default function ChessBoard() {
    const squares = Array.from( {length: 64}, (_, i) => (
        <Square key={i} idx={i} />
    ))

    return (
        <div className="board-grid">
            {squares}
        </div>
    );
};