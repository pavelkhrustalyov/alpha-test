import { useDispatch, useSelector } from 'react-redux';
import classes from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store/store';
import Avatar from '../Avatar/Avatar';
import { logout } from '../../store/authSlice';

const Navigation = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>()

    return (
        <nav className={classes.nav}>
            { user && <Avatar url={user.avatar} size='small' /> }
            <NavLink className={classes.link} to="/">Главная</NavLink>
            { !user && <NavLink className={classes.link} to="/auth">Вход</NavLink> }
            { user && <span onClick={() => dispatch(logout())} className={classes.link}>Выход</span> }
            <NavLink className={classes.link} to="/products">Все товары</NavLink>
            <NavLink className={classes.link} to="/create-product">Добавить товар</NavLink>
        </nav>
    )
};

export default Navigation;
