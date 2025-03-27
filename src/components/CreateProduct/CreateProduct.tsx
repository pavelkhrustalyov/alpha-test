import { useEffect } from 'react';
import classes from './CreateProduct.module.css';
import { createProduct } from '../../store/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import Input from '../UI/Input/Input';
import TextArea from '../UI/TextArea/TextArea';
import Button from '../UI/Button/Button';
import CustomSelect from '../UI/CustomSelect/CustomSelect';
import { useNavigate } from 'react-router-dom';
import { getAllCategories } from '../../store/CategorySlice';
import { useForm, Controller } from "react-hook-form";

const CreateProduct = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    const { categories } = useSelector((state: RootState) => state.categories);
    const { control, handleSubmit, formState: { errors }, register } = useForm({
        defaultValues: {
            title: '',
            price: 1,
            description: '',
            categoryId: '',
            images: '',
        },
    });

    const createNewProduct = (data: any) => {
        const productData = {
            ...data,
            images: data.images.split(',').map((img: string) => img.trim()),
        };
        dispatch(createProduct(productData));
        navigate('/products');
    };

    return (
        <>
            <h1 className={classes.heading}>Добавить продукт</h1>
            <form onSubmit={handleSubmit(createNewProduct)} className={classes['create-product']}>
                {errors.title && <span className={classes.error}>{errors.title.message}</span>}
                <Input
                    {...register("title", { required: "Название обязательно" })}
                    style={{ border: errors.title ? '1px solid red' : '1px solid black' }}
                    type="text"
                    placeholder='Введите название'
                />

                {errors.price && <span className={classes.error}>{errors.price.message}</span>}
                <Input
                    {...register("price", {
                        required: "Цена обязательна",
                        min: { value: 1, message: "Минимальная цена — 1" },
                    })}
                    style={{ border: errors.price ? '1px solid red' : '1px solid black' }}
                    type="number"
                    placeholder='Введите цену'
                />

                {errors.images && <span className={classes.error}>{errors.images.message}</span>}
                <Input
                    {...register("images", { required: "Ссылка на фото обязательна" })}
                    style={{ border: errors.images ? '1px solid red' : '1px solid black' }}
                    type="text"
                    placeholder='Ссылки на изображения через запятую'
                />

                {errors.description && <span className={classes.error}>{errors.description.message}</span>}
                <TextArea
                    {...register("description", { required: "Описание обязательно" })}
                    style={{ border: errors.description ? '1px solid red' : '1px solid black' }}
                    className={classes.textarea}
                    placeholder='Введите описание'
                />

                {errors.categoryId && <span className={classes.error}>{errors.categoryId.message}</span>}
                <Controller
                    name="categoryId"
                    control={control}
                    rules={{ required: "Категория обязательна" }}
                    render={({ field }) => (
                        <CustomSelect
                            {...field}
                            data={categories}
                        />
                    )}
                />
                
                <Button color='primary'>Создать продукт</Button>
            </form>
        </>
    );
};

export default CreateProduct;
