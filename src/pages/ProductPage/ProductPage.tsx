import { useParams } from 'react-router-dom';
import classes from './ProductPage.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getProduct } from '../../store/ProductSlice';
import ProductMore from '../../components/ProductMore/ProductMore';
import Loader from '../../components/Loader/Loader';

const ProductPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { product, isLoading, isError } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        if (id)
            dispatch(getProduct(id));
    }, [id]);
    
    return (
        <div className={classes['product-page']}>
            { isLoading && (
                <div className={classes.loader}>
                    <Loader />
                </div>)
            }
           
            { isError && <div>Error!</div> }
            { product && <ProductMore product={product} /> } 
        </div>
    )
};

export default ProductPage;