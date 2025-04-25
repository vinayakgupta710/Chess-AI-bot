import { useState } from "react";
import { ChessPieceIcons } from "../utils/utils"
import { parseFEN } from "../utils/FENParsing";
import { getValidMoves } from "../utils/moves";
import Square from "./Square";

export default function ChessBoard() {
    const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    const boardState = parseFEN(fen);
    
    const [selectedSquare, setSelectedSquare] = useState<number | null>(null);
    const [validMoves, setValidMoves] = useState<number[]>([]);

    const idxToCoord = (idx: number): [number, number] => [Math.floor(idx / 8), idx % 8];
    const coordToIdx = (row: number, col: number): number => row * 8 + col;
    
    const handleSquareClick = (idx: number) => {   
        const [row, col] = idxToCoord(idx);
        const piece = boardState[row][col];

        if (!piece)
            return;
        
        const moves = getValidMoves(boardState, row, col);
        const moveIndices = moves.map(([row, col]) => coordToIdx(row, col));
        
        setSelectedSquare(idx);
        setValidMoves(moveIndices);
    }

    const squares = Array.from({ length: 64 }, (_, i) => {
        const row = Math.floor(i / 8);
        const col = i % 8;
        const piece = boardState[row][col];
        let pieceImgPath = null;
        if(piece)
            pieceImgPath = ChessPieceIcons[piece.colour + piece.type];
    
        return <Square 
            key={i} 
            idx={i} 
            pieceImgPath={pieceImgPath} 
            isHighlighted={validMoves.includes(i)}
            onClick={() => handleSquareClick(i)}
            selectedSquare={selectedSquare}
        />;
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