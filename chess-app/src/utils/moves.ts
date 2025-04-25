import { Piece } from "./types";

export function getValidMoves(board: (Piece | null)[][], row: number, col: number): [number, number][] {
    const piece = board[row][col];
    const moves: [number, number][] = []; // output

    // if the current square does not hold any pieces
    if (!piece)
        return moves;

    const exploreDirection = (dr: number, dc: number) => {
        // find the new rows and cols based on the direction for each provided
        let r = row + dr;
        let c = col + dc;
        // traverse through all options from 0 to 8 for each row and col that bishop/rook/queen should target
        while (r >= 0 && r < 8 && c >= 0 && c < 8) {
            const target = board[r][c];
            // if a new piece is encountered 
            if (target) {
                // if the colour is not equal then push to valid moves and break
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
            // all the directions that a knight can travel to 
            const directions = [
                [2, 1], [2, -1], [-2, 1], [-2, -1],
                [1, 2], [-1, 2], [1, -2], [-1, -2]
            ];

            // bound checking and providing valid moves for the knight
            for (const [dr, dc] of directions) {
                const newRow = row + dr;
                const newCol = col + dc;
            
                if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                    const target = board[newRow][newCol];
                    if (target === null || target.colour !== piece.colour) {
                        moves.push([newRow, newCol]);
                    }
                }
            }
            
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
            // all the directions that a king can travel to 
            const directions = [
                [1, 0], [-1, 0], [0, 1], [0, -1],
                [1, 1], [-1, 1], [1, -1], [-1, -1]
            ];
            
            // bound checking and providing valid moves for the king
            for (const [dr, dc] of directions) {
                const newRow = row + dr;
                const newCol = col + dc;
            
                if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                    const target = board[newRow][newCol];
                    if (target === null || target.colour !== piece.colour) {
                        moves.push([newRow, newCol]);
                    }
                }
            }
            
            break;
        }

        default: {
            break;
        }
    }

    return moves;
};