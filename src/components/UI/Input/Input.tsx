import classes from './Input.module.css';
import cn from 'classnames';
import { IPropsInput } from './IPropsInput';

const Input = ({ className, ...props }: IPropsInput ) => {
    return (
        <input
            className={cn(classes.input, className, {})}
            {...props}
        />
    ); 
};

export default Input;