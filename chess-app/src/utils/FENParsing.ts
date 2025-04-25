import { Piece } from "./types";

export const parseFEN = (
    fen: string
): (Piece | null)[][] => {
    const pieceMap: Record<string, Piece> = {
        p: { type: 'p', colour: 'b' },
        r: { type: 'r', colour: 'b' },
        n: { type: 'n', colour: 'b' },
        b: { type: 'b', colour: 'b' },
        q: { type: 'q', colour: 'b' },
        k: { type: 'k', colour: 'b' },
        P: { type: 'p', colour: 'w' },
        R: { type: 'r', colour: 'w' },
        N: { type: 'n', colour: 'w' },
        B: { type: 'b', colour: 'w' },
        Q: { type: 'q', colour: 'w' },
        K: { type: 'k', colour: 'w' },
    };

    const [position] = fen.split(' ');
    const rows = position.split('/');

    const board: (Piece | null)[][] = rows.map(row => {
        const squares: (Piece | null)[] = [];

        for(const char of row) {
            if(/\d/.test(char)) {
                const empty = parseInt(char, 10);
                for(let i = 0; i < empty; ++i)
                    squares.push(null);
            } else {
                squares.push(pieceMap[char]);
            }
        }

        return squares;
    });

    return board;
};

export const updateFEN = (
    previousFen: string, 
    from: string,
    fromRow: number, 
    fromCol: number,
    toRow: number, 
    toCol: number,
    boardAfterMove: (Piece | null)[][]
): string => {
    const [piecePlacement, activeColor, castling, enPassant, halfmoveStr, fullmoveStr] = previousFen.split(" ");

    const isCaptured = boardAfterMove[toRow][toCol] !== null && (fromRow !== toRow) && (fromCol !== toCol);
    const movedPiece = boardAfterMove[toRow][toCol];

    let newPiecePlacement = "";
    for (let r = 0; r < 8; ++r) {
        let empty = 0;
        for (let c = 0; c < 8; ++c) {
            const p = boardAfterMove[r][c];
            
            if (!p) {
                empty++;
            } else {
                if (empty > 0) {
                    newPiecePlacement += empty;
                    empty = 0;
                }
                const symbol = p.colour === 'w' ? p.type.toUpperCase() : p.type;
                newPiecePlacement += symbol;
            }
        }

        if (empty > 0)
            newPiecePlacement += empty;
        if(r < 7)
            newPiecePlacement += "/";
    }

    const newActiveColour = activeColor === "b" ? "w" : "b";

    let newCastling = castling;
    if (movedPiece?.type === 'k') {
        newCastling = newCastling.replace(movedPiece.colour === 'w' ? /[KQ]/g : /[kq]/g, '');
    }
    if (movedPiece?.type === 'r') {
        if (from === 'a1') newCastling = newCastling.replace('Q', '');
        if (from === 'h1') newCastling = newCastling.replace('K', '');
        if (from === 'a8') newCastling = newCastling.replace('q', '');
        if (from === 'h8') newCastling = newCastling.replace('k', '');
    }
    if(newCastling === '')
        newCastling = '-';

    let newEnPassant = '-';
    if (movedPiece?.type === 'p' && Math.abs(fromRow - toRow) === 2) {
        const fileChar = from[0];
        const epRank = movedPiece.colour === 'w' ? '3' : '6';
        newEnPassant = `${fileChar}${epRank}`;
    }

    const newHalfmoveStr = (movedPiece?.type === 'p' || isCaptured) ? 0 : parseInt(halfmoveStr) + 1;
    const newFullmoveStr = activeColor === 'b' ? parseInt(fullmoveStr) + 1 : parseInt(fullmoveStr);
    
    return `${newPiecePlacement} ${newActiveColour} ${newCastling} ${newEnPassant} ${newHalfmoveStr} ${newFullmoveStr}`;
};