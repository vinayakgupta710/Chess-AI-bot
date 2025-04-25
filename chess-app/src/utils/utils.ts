import { BoardSquare } from "./types"

export const initialBoard: (BoardSquare)[][] = [
    // Row 8 on the UI
    [
        { type: 'r', colour: 'b' },
        { type: 'n', colour: 'b' },
        { type: 'b', colour: 'b' },
        { type: 'q', colour: 'b' },
        { type: 'k', colour: 'b' },
        { type: 'b', colour: 'b' },
        { type: 'n', colour: 'b' },
        { type: 'r', colour: 'b' },
    ],
    Array(8).fill({ type: 'p', colour: 'b' }), // Row 7
    Array(8).fill(null), // Row 6
    Array(8).fill(null), // Row 5
    Array(8).fill(null), // Row 4
    Array(8).fill(null), // Row 3
    Array(8).fill({ type: 'p', colour: 'w' }), // Row 2
    // Row 1 on the UI
    [
        { type: 'r', colour: 'w' },
        { type: 'n', colour: 'w' },
        { type: 'b', colour: 'w' },
        { type: 'q', colour: 'w' },
        { type: 'k', colour: 'w' },
        { type: 'b', colour: 'w' },
        { type: 'n', colour: 'w' },
        { type: 'r', colour: 'w' },
    ],
];

export const ChessPieceIcons: Record<string, string> = {
    wp: '/pieces/pawn-w.svg',
    bp: '/pieces/pawn-b.svg',
    wr: '/pieces/rook-w.svg', 
    br: '/pieces/rook-b.svg',
    wn: '/pieces/knight-w.svg', 
    bn: '/pieces/knight-b.svg',
    wb: '/pieces/bishop-w.svg', 
    bb: '/pieces/bishop-b.svg',
    wq: '/pieces/queen-w.svg', 
    bq: '/pieces/queen-b.svg',
    wk: '/pieces/king-w.svg', 
    bk: '/pieces/king-b.svg',
};