
import classes from './Button.module.css'

const Button = (props) => {
    return (
    <button
        type={props.type || 'button'}
        className={`${classes.button} ${props.className}`}
        onClick={props.onClick}
        disabled={props.disabled}
        style={props.style}
        id={props.id}
      >
        {props.children}
      </button>
    )
}

export default Button
