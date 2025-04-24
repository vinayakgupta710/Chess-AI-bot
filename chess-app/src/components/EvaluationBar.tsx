interface EvaluationBarProps {
    percentFill: number;
}

export default function EvaluationBar({percentFill}: EvaluationBarProps) {
    return(
        <div className="h-full w-[30px] bg-white max-h-[600px] relative">
            <div 
                className="w-full bg-[#3F3D39]" 
                style={{ height: `${percentFill}%` }}
            >
                <p className="text-xs text-white text-center py-2">
                    {percentFill / 100}
                </p>
            </div>
            
            <p className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-[#3F3D39] py-2">
                {percentFill / 100}
            </p>
        </div>
    );
};