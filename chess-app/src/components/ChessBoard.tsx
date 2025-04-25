import { useState } from "react";
import { ChessPieceIcons } from "../utils/utils"
import { parseFEN, updateFEN } from "../utils/FENParsing";
import { getValidMoves } from "../utils/moves";
import Square from "./Square";

export default function ChessBoard() {
    const [fen, setFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
    const [listOfFens, setListOfFens] = useState([fen]);
    const [boardState, setBoardState] = useState(parseFEN(fen));
    
    const [selectedSquare, setSelectedSquare] = useState<number | null>(null);
    const [validMoves, setValidMoves] = useState<number[]>([]);

    const idxToCoord = (idx: number): [number, number] => [Math.floor(idx / 8), idx % 8];
    const coordToIdx = (row: number, col: number): number => row * 8 + col;
    
    const makeMove = (fromIdx: number, toIdx: number) => {
        const [fromRow, fromCol] = idxToCoord(fromIdx);
        const [toRow, toCol] = idxToCoord(toIdx);

        const newBoard = boardState.map(row => [...row]);
        newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
        newBoard[fromRow][fromCol] = null;

        setBoardState(newBoard);
        
        const fromRank = 8 - Math.floor(fromIdx / 8);
        const fromFile = String.fromCharCode(97 + (fromIdx % 8));
        const fromStr = fromFile + fromRank;
        const updatedFen = updateFEN(fen, fromStr, fromRow, fromCol, toRow, toCol, newBoard);
        setListOfFens(prevFens => [...prevFens, updatedFen]);
        setFen(updatedFen);
    }

    const handleSquareClick = (idx: number) => {   
        const [row, col] = idxToCoord(idx);
        const piece = boardState[row][col];

        // if selected a piece and want to move a valid destination
        if (selectedSquare !== null && validMoves.includes(idx)) {
            makeMove(selectedSquare, idx);
            setSelectedSquare(null);
            setValidMoves([]);
            return;
        }

        // if piece is not selected and valid moves are not visible
        if (!piece) {
            setSelectedSquare(null);
            setValidMoves([]);
            return;
        }
        
        // select a piece that updates its valid moves
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