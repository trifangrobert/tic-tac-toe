import classes from "./Board.module.css";
import Square from "./Square";

const Board = (props) => {
  return (
    <div className={classes.board}>
      {props.squares.map((square, index) => (
          <Square
            key={index}
            square={square}
            onClick={() => props.handleSquareClick(index)}
          />
        ))}
    </div>
  );
};

export default Board;
