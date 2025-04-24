import { useState } from "react";

interface SquareProps {
    idx: number;
}

export default function Square({ idx }: SquareProps) {
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

    function handleRightClick(e) {
        e.preventDefault();  
        changeColour();      
    }

    return (
        <div
            className="aspect-square relative"
            style={{ background: `${squareColour}` }}
            onContextMenu={handleRightClick}
        >
            {idx % 8 == 0 && (
                <p 
                    className="text-md text-left font-medium p-1"
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