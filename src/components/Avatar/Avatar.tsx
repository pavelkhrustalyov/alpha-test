import classes from './Avatar.module.css';
import cn from 'classnames';

const Avatar = ({ url, size }: { url: string, size: 'small' | 'middle' }) => {
    return <img className={cn(classes.avatar, {
        [classes.small]: size === 'small',
        [classes.middle]: size === 'middle'
    })} src={url} alt="Аватар" />
};

export default Avatar;