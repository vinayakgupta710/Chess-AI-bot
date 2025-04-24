interface SquareProps {
    idx: number;
}

export default function Square({ idx }: SquareProps) {
    const isDark = ((Math.floor(idx / 8) + idx) % 2) === 1;
    
    return (
        <div className={`aspect-square ${isDark ? 'bg-[#739552]' : 'bg-[#EBECD0]'}`} /> 
    );
};