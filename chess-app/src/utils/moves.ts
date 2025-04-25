import { Piece } from "./types";

export function getValidMoves(board: (Piece | null)[][], row: number, col: number): [number, number][] {
    const piece = board[row][col];
    const moves: [number, number][] = []; // output
    
    // if the current square does not hold any pieces
    if(!piece)
        return moves;

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
        case "r":  {
            for (let r = row + 1; r < 8; ++r) {
                if (board[r][col] !== null && board[r][col]?.colour === piece.colour)
                    break;
                if (board[r][col] !== null && board[r][col]?.colour !== piece.colour) {
                    moves.push([r, col]);
                    break;
                }
                moves.push([r, col]);
            }

            for (let r = row - 1; r >= 0; --r) {
                if(board[r][col] !== null && board[r][col]?.colour === piece.colour)  
                    break;
                if (board[r][col] !== null && board[r][col]?.colour !== piece.colour) {
                    moves.push([r, col]);
                    break;
                }
                moves.push([r, col]);
            }

            for (let c = col + 1; c < 8; ++c) {
                if(board[row][c] !== null && board[row][c]?.colour === piece.colour)  
                    break;
                if (board[row][c] !== null && board[row][c]?.colour !== piece.colour) {
                    moves.push([row, c]);
                    break;
                }
                moves.push([row, c]);
            }

            for (let c = col - 1; c >= 0; --c) {
                if(board[row][c] !== null && board[row][c]?.colour === piece.colour)  
                    break;
                if (board[row][c] !== null && board[row][c]?.colour !== piece.colour) {
                    moves.push([row, c]);
                    break;
                }
                moves.push([row, c]);
            }

            break;
        }
        
        // bishops
        case "b": {
            break;
        }

        // queen
        case "q": {
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