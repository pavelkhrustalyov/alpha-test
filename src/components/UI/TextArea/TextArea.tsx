import classes from './TextArea.module.css';
import { ITextAreaProps } from './IPropsTextArea';
import cn from 'classnames';

const TextArea = ({ className, ...props }: ITextAreaProps) => {
    return (
        <textarea
            className={cn(className, classes.textarea, {})}
            {...props}
        >
        </textarea>
    );
};

export default TextArea;