import { Piece } from "./types";

export function getValidMoves(board: (Piece | null)[][], row: number, col: number): [number, number][] {
    const piece = board[row][col];
    const moves: [number, number][] = []; // output

    // if the current square does not hold any pieces
    if (!piece)
        return moves;

    const exploreDirection = (dr: number, dc: number) => {
        let r = row + dr;
        let c = col + dc;
        while (r >= 0 && r < 8 && c >= 0 && c < 8) {
            const target = board[r][c];
            if (target) {
                if (target.colour !== piece.colour) 
                    moves.push([r, c]);
                break;
            }
            moves.push([r, c]);
            r += dr;
            c += dc;
        }
    }

    switch (piece.type) {
        // Pawns
        case 'p': {
            // white pawns move down and black pawns move up the rank
            const dir = piece.colour === 'w' ? -1 : 1;
            // white pawns start at rank 6 and black pawns start at rank 1
            const startRow = piece.colour === 'w' ? 6 : 1;

            // if the square in front is empty add it to valid moves
            if (board[row + dir]?.[col] === null) {
                moves.push([row + dir, col]);

                // if pawn is in the starting rank then it can move twice
                if (row === startRow && board[row + (dir * 2)]?.[col] === null)
                    moves.push([row + (dir * 2), col]);
            }

            // pawns can capture diagnolly
            for (const dc of [-1, 1]) {
                const target = board[row + dir]?.[col + dc];
                if (target && target.colour !== piece.colour)
                    moves.push([row + dir, col + dc]);
            }

            break;
        }

        // knights
        case 'n': {
            break;
        }

        // rooks
        case "r": {
            exploreDirection(-1, 0);
            exploreDirection(1, 0);
            exploreDirection(0, -1);
            exploreDirection(0, 1);
            break;
        }

        // bishops
        case "b": {
            exploreDirection(-1, -1);
            exploreDirection(1, 1);
            exploreDirection(-1, 1);
            exploreDirection(1, -1);
            break;
        }

        // queen
        case "q": {
            exploreDirection(-1, 0);
            exploreDirection(1, 0);
            exploreDirection(0, -1);
            exploreDirection(0, 1);
            exploreDirection(-1, -1);
            exploreDirection(1, 1);
            exploreDirection(-1, 1);
            exploreDirection(1, -1);
            break;
        }

        // king
        case "k": {
            break;
        }

        default: {
            break;
        }
    }

    return moves;
};