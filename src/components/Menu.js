import classes from "./Menu.module.css";
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  let navigate = useNavigate();
  const pvpHandler = () => {
      navigate('/pvp');
  };
  const pvcHandler = () => {
    navigate('/pvc');
  };
  return (
    <div className={classes.container}>
      <button className={classes.button} onClick={pvpHandler}>
        Player vs Player
      </button>
      <button className={classes.button} onClick={pvcHandler}>
        Player vs Computer
      </button>
    </div>
  );
};

export default Menu;
