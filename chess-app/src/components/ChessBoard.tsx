import Square from "./Square";

export default function ChessBoard() {
    const squares = Array.from( {length: 64}, (_, i) => (
        <Square key={i} idx={i} />
    ))

    return (
        <div 
            className="grid 
                [grid-template-columns:repeat(8,minmax(0,1fr))] 
                [grid-template-rows:repeat(8,minmax(0,1fr))] 
                w-full 
                max-w-[600px] 
                max-h-[600px]
        ">
            {squares}
        </div>
    );
};