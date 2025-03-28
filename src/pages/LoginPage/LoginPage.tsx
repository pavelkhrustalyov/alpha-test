import Login from "../../components/Auth/Login";
import classes from './LoginPage.module.css';

const LoginPage = () => {
    return (
        <div>
            <div className={classes['login-page']}>
                <h1>Авторизация</h1>
              <Login />
            </div>
        </div>
    );
};


export default LoginPage;