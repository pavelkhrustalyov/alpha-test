import classes from './CustomSelect.module.css';
import cn from 'classnames';
import { ISelectProps } from './ICustomSelectProps';

const CustomSelect = ({ className, name,  data, ...otherProps }: ISelectProps) => {
    return (
        <select
            name={name}
            className={cn(classes.select, className, {})} 
            {...otherProps}>
            {
                data.map(item => {
                    return <option key={item.id} value={item.id}>{item.name}</option>
                })
            }
        </select>
    );
};

export default CustomSelect;
