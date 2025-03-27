import { ChangeEvent, useEffect, useState } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './EditProductPage.module.css';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useNavigate, useParams } from 'react-router-dom';
import { editProduct, getProduct } from '../../store/ProductSlice';

interface IBodyEditProduct {
    title: string, 
    price: number 
}

const EditProductPage = () => {
    const { id } = useParams();
    
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { product, isLoading } = useSelector((state: RootState) => state.products);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<IBodyEditProduct>({
        defaultValues: {
            title: '',
            price: 1,
        },
    });

    useEffect(() => {
        if (id) {
            dispatch(getProduct(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (product) {
            reset({
                title: product.title || '',
                price: product.price || 1,
            });
        }
    }, [product, reset]);

    const editProductHandler = (data: IBodyEditProduct) => {
        if (id) {
            dispatch(editProduct({ ...data, id }));
            navigate('/products');
        }
    };

    return (
        <div className={classes['product-edit']}>
            <h1 className={classes.heading}>Редактировать {product?.title}</h1>
            <form className={classes.form} onSubmit={handleSubmit(editProductHandler)}>
                {errors.title && <span className={classes.error}>{errors.title.message}</span>}
                <Input
                    { ...register("title", { required: "Название обязательно" })}
                    style={{ border: errors.title ? '1px solid red' : '1px solid black' }}
                    type="text"
                    name="title" 
                    placeholder='Введите название'
                />
                {errors.price && <span className={classes.error}>{errors.price.message}</span>}
                <Input
                    { ...register("price", { required: "Цена обязательна" })}
                    style={{ border: errors.price ? '1px solid red' : '1px solid black' }}
                    type="number"
                    name="price" 
                    placeholder='Введите цену'
                />
                <Button color="primary">{isLoading ? "Loading" : "Редактировать"}</Button>
            </form>
        </div>
    );
};

export default EditProductPage;