import ChessBoard from "./components/ChessBoard";
import EvaluationBar from "./components/EvaluationBar";
import './styles/board.css'

export default function Chess() {
  return(
    <div className="flex items-center w-full px-[10%] py-[5%] space-x-3 h-screen">
      <EvaluationBar percentFill={50} />
      <ChessBoard />
    </div>
  );
}