import Square from "./Square";
import { ChessPieceIcons } from "../utils/utils"
import { parseFEN } from "../utils/FENParsing";

export default function ChessBoard() {
    const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    const boardState = parseFEN(fen);
    
    const squares = Array.from({ length: 64 }, (_, i) => {
        const row = Math.floor(i / 8);
        const col = i % 8;
        const piece = boardState[row][col];
        let pieceImgPath = null;
        if(piece)
            pieceImgPath = ChessPieceIcons[piece.colour + piece.type];
    
        return <Square key={i} idx={i} pieceImgPath={pieceImgPath} />;
    });

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