import ChessBoard from "./components/ChessBoard";
import './styles/board.css'

export default function Chess() {
  return(
    <div className="flex items-center w-full px-[10%] py-[5%]">
      <ChessBoard />
    </div>
  );
}