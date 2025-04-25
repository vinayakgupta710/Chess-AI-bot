import { useState } from "react";

interface SquareProps {
    idx: number;
    pieceImgPath: string | null;
    isHighlighted?: boolean;
    onClick?: () => void;
    selectedSquare?: number | null;
}

export default function Square({ idx, pieceImgPath, isHighlighted, onClick, selectedSquare }: SquareProps) {
    const rank = 8 - Math.floor(idx / 8);
    const file = String.fromCharCode(97 + (idx % 8));

    const isDark = ((Math.floor(idx / 8) + idx) % 2) === 1;

    const [squareColour, setSquareColour] = useState(isDark ? '#739552' : '#EBECD0');
    const [textColour, setTextColour] = useState(!isDark ? '#739552' : '#EBECD0');
    const changeColour = () => {
        if (squareColour === '#D46C51' || squareColour === '#ED7E6A') {
            setSquareColour(isDark ? '#739552' : '#EBECD0');
            setTextColour(!isDark ? '#739552' : '#EBECD0');
        } else {
            setSquareColour(isDark ? '#D46C51' : '#ED7E6A');
            setTextColour(!isDark ? '#D46C51' : '#ED7E6A');
        }
    }

    function handleRightClick(e: React.MouseEvent<HTMLDivElement>) {
        e.preventDefault();
        changeColour();
    }

    return (
        <div
            className="aspect-square relative"
            style={{ background: `${squareColour}` }}
            onClick={onClick}
            onContextMenu={handleRightClick}
        >
            {selectedSquare === idx && (
                <span className="absolute inset-0 bg-yellow-300 opacity-[15%] z-10 pointer-events-none" />
            )}

            {isHighlighted && (
                <span className="absolute rounded-full bg-black opacity-[10%] w-7 h-7 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            )}

            {pieceImgPath && (
                <img
                    src={`${pieceImgPath}`}
                    className="top-[-1/2] left-[-1/2]"
                    alt="Chess Piece"
                />
            )}

            {idx % 8 == 0 && (
                <p
                    className="absolute top-0 left-0 text-md font-medium p-1"
                    style={{ color: `${textColour}` }}
                >
                    {rank}
                </p>
            )}
            {idx >= 56 && (
                <p
                    className="absolute bottom-0 right-0 text-md text-right font-medium p-1"
                    style={{ color: `${textColour}` }}
                >
                    {file}
                </p>
            )}
        </div>
    );
};