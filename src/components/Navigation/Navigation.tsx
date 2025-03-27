import classes from './Navigation.module.css';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className={classes.nav}>
            <NavLink className={classes.link} to="/">Главная</NavLink>
            <NavLink className={classes.link} to="/products">Все товары</NavLink>
            <NavLink className={classes.link} to="/create-product">Добавить товар</NavLink>
        </nav>
    )
};

export default Navigation;
