import classes from './Login.module.css';
import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getUser, loginHandler } from '../../store/authSlice';
import { Navigate } from 'react-router-dom';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import { useForm } from 'react-hook-form';

interface IPropsForm {
    email: string;
    password: string;
}

const Login = () => {
    const { handleSubmit, register, formState: { errors } } = useForm<IPropsForm>({
        defaultValues: {
            email: "john@mail.com",
            password: "changeme"
        }
    });

    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.auth);


    const onLogin = async (data: any) => {
        await dispatch(loginHandler(data))
        await dispatch(getUser());
    };


    if (user) {
        return <Navigate to="/" />
    }

    return (
        <form className={classes.login} onSubmit={handleSubmit(onLogin)}>
            <>
                {errors.email && <span className={classes.error}>{errors.email.message}</span>}
                <Input
                    {...register("email", { required: "Почта обязательна", pattern: { 
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
                        message: "Введите корректный адрес электронной почты" 
                    } })}
                    type="email"
                    placeholder='Введите логин'
                />
                {errors.password && <span className={classes.error}>{errors.password.message}</span>}
                <Input 
                    {...register("email", { required: "Название обязательно" })}
                    type="password"
                    placeholder='Введите пароль'
                />
                <Button color="primary">Вход</Button>
            </>
        </form>
            
    );
};

export default Login;