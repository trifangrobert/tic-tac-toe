import classes from './Square.module.css';

const Square = (props) => {
    return (
        <div onClick={props.onClick} className={classes.div}>
            {props.square}
        </div>
    );
}
 
export default Square;