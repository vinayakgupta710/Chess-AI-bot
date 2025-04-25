export type Piece = {
    type: 'p' | 'r' | 'n' | 'b' | 'q' | 'k';
    colour: 'b' | 'w';
};

export type BoardSquare = Piece | null;