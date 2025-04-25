import { Piece } from "./types";

export const parseFEN = (fen: string): (Piece | null)[][] => {
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