import Modal from "./Modal.js";
import classes from "./Endgame.module.css";

const Endgame = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <p className={classes.p}>{props.message}</p>
      <div className={classes['button-container']}>
          <button onClick={props.handleButtonMenu} className={classes.button}>Back to menu</button>
          <button onClick={props.handleButtonPlayAgain} className={classes.button}>Play again</button>
      </div>
    </Modal>
  );
};

export default Endgame;
