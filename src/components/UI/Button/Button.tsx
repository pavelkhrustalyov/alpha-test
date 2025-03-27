import { IButtonProps } from "./IButtonProps";
import classes from './Button.module.css';
import cn from "classnames";

const Button = ({ children, className, color, ...props }: IButtonProps) => {
    return (
        <button
            className={cn(classes.button, className, {
                [classes.primary]: color === 'primary',
                [classes.danger]: color === 'danger',
                [classes.success]: color === 'success',
            })}
            {...props}
            >
            {children}
        </button>
    )
};

export default Button;