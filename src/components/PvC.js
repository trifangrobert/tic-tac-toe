import Endgame from "./Endgame";
import Board from "./Board";
import classes from "./PvC.module.css";
import { useState } from "react";
import CheckTie from "./CheckTie";
import CheckWinner from "./CheckWinner";
import { useNavigate } from "react-router-dom";

const PvC = () => {
  let navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [squares, setSquares] = useState(new Array(9).fill(null));
  const [game, setGame] = useState(false);
  const [disableButton, setDisableButtons] = useState(false);
  const [computerMove, setComputerMove] = useState("");
  const [humanMove, setHumanMove] = useState("");
  let computerChoice = -1;


  // final state
  const score = (computerSquares, depth) => { 
    let winState = CheckWinner(computerSquares);
    if (winState !== 0) {
      if (winState === computerMove) {
        return 10 - depth;
      }
      else {
        return depth - 10;
      }
    }
    else {
      return 0;
    }
  };
  // minimax algorithm
  const minimax = (computerSquares, depth) => {
    if (
      CheckWinner(computerSquares) !== 0 ||
      CheckTie(computerSquares) === true
    ) {
      return [score(computerSquares, depth), -1];
    } else {
      if (depth % 2 === 0) {
        let best = -1000;
        let move = -1;
        for (let i = 0; i < computerSquares.length; i++) {
          if (computerSquares[i] === null) {
            computerSquares[i] = computerMove;
            let doMinimax = minimax(computerSquares, depth + 1);
            if (best < doMinimax[0]) {
              best = doMinimax[0];
              move = i;
            }
            computerSquares[i] = null;
          }
        }
        return [best, move];
      } else {
        let best = 1000;
        let move = -1;
        for (let i = 0; i < computerSquares.length; i++) {
          if (computerSquares[i] === null) {
            computerSquares[i] = humanMove;
            let doMinimax = minimax(computerSquares, depth + 1);
            if (best > doMinimax[0]) {
              best = doMinimax[0];
              move = i;
            }
            computerSquares[i] = null;
          }
        }
        return [best, move];
      }
    }
  };
  //checks for win or tie
  const GameOver = (squares) => {
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
      return true;
    }
    return false;
  };
  // updates squares
  const UpdateSquare = (index, move) => {
    setSquares((prevSquares) => {
      let newSquares = new Array(9).fill(null);
      for (let i = 0; i < newSquares.length; i++) {
        newSquares[i] = prevSquares[i];
      }
      newSquares[index] = move;
      return newSquares;
    });
  }

  const handleSquareClick = (index) => {
    if (squares[index] !== null || game === false) {
      return;
    }
    let newSquares = squares;
    newSquares[index] = humanMove;
    UpdateSquare(index, humanMove);
    if (GameOver(newSquares)) {
      return;
    }
    console.log(newSquares);
    computerChoice = minimax(newSquares, 0);
    if (computerChoice[1] !== -1) {
      newSquares[computerChoice[1]] = computerMove;
      UpdateSquare(computerChoice[1], computerMove);
      GameOver(newSquares);
    }
  };

  const handleButtonMenu = () => {
    handleButtonRestart();
    navigate("/");
  };

  const handleButtonRestart = () => {
    setDisableButtons(false);
    setMessage("");
    setShowModal(false);
    setSquares(new Array(9).fill(null));
    setGame(false);
    setHumanMove("");
    setComputerMove("");
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

  const handleComputerClick = () => {
    setDisableButtons(true);
    setComputerMove("X");
    setHumanMove("O");
    setSquares(() => {
      let newSquares = new Array(9).fill(null);
      for (let i = 0; i < newSquares.length; i++) {
        newSquares[i] = squares[i];
      }
      newSquares[getRandomIntInclusive(0, 8)] = "X";
      return newSquares;
    });
    setGame(true);
  };
  const handleHumanClick = () => {
    setDisableButtons(true);
    setHumanMove("X");
    setComputerMove("O");
    setGame(true);
  };

  return (
    <>
    <p className={classes.p}>You can't beat me, noob!</p>
      {showModal && (
        <Endgame
          handleButtonMenu={handleButtonMenu}
          handleButtonPlayAgain={handleButtonRestart}
          message={message}
          onClose={handleCloseModal}
        />
      )}
      <div className={classes["button-container"]}>
        <button onClick={handleButtonMenu} className={classes.button}>
          Back to menu
        </button>
        <button onClick={handleButtonRestart} className={classes.button}>
          Restart game
        </button>
      </div>
      <Board squares={squares} handleSquareClick={handleSquareClick} />
      <div className={classes["button-container-start"]}>
        <button
          disabled={disableButton}
          onClick={handleComputerClick}
          className={classes.button}
        >
          Computer starts
        </button>
        <button
          disabled={disableButton}
          onClick={handleHumanClick}
          className={classes.button}
        >
          Human starts
        </button>
      </div>
    </>
  );
};

export default PvC;
