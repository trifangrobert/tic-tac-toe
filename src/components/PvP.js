import Board from "./Board.js";
import { useState } from "react";
import classes from "./PvP.module.css";
import { useNavigate } from "react-router-dom";
import Endgame from "./Endgame.js";
import CheckWinner from "./CheckWinner.js";
import CheckTie from "./CheckTie.js";

const PvP = () => {
  let navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [squares, setSquares] = useState(new Array(9).fill(null));
  const [tictactoe, setTictactoe] = useState("X");
  const [game, setGame] = useState(true);

  const toggleTicTacToe = () => {
    setTictactoe((prevState) => {
      return prevState === "O" ? "X" : "O";
    });
  };

  const handleSquareClick = (index) => {
    if (squares[index] !== null || game === false) {
      return;
    }
    let newSquares = squares;
    toggleTicTacToe();
    newSquares[index] = tictactoe;
    setSquares(newSquares);
    const winState = CheckWinner(squares);
    const tieState = CheckTie(squares);
    if (winState !== 0 || tieState === true) {
      if (winState !== 0) {
        setMessage(winState + " won");
      } else {
        setMessage("Tie");
      }
      setGame(false);
      setShowModal(true);
    }
  };

  const handleButtonMenu = () => {
    handleButtonRestart();
    navigate("/");
  };

  const handleButtonRestart = () => {
    setMessage('');
    setShowModal(false);
    setSquares(new Array(9).fill(null)); 
    setTictactoe('X');
    setGame(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && <Endgame handleButtonMenu={handleButtonMenu} handleButtonPlayAgain={handleButtonRestart} message={message} onClose={handleCloseModal} />}
      <div className={classes['button-container']}>
        <button onClick={handleButtonMenu} className={classes.button}>
          Back to menu
        </button>
        <button onClick={handleButtonRestart} className={classes.button}>
          Restart game
        </button>
      </div>
      <Board squares={squares} handleSquareClick={handleSquareClick} />
    </>
  );
};

export default PvP;
