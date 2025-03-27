import { ChangeEvent, useEffect, useState } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import classes from './ProductsPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getProducts, loadMore, resetProducts } from '../../store/ProductSlice';
import { AiFillFilter } from "react-icons/ai";
import Loader from '../../components/Loader/Loader';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

const ProductsPage = () => {
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState(''); 

    const { 
        productList, 
        isLoading, 
        isError, 
        hasMore,
    } = useSelector((state: RootState) => state.products);
    
    const dispatch = useDispatch<AppDispatch>();

    const transformProducts = productList.filter(product => {
        if (filter === 'isFavorite') return product.isFavorites;
        return productList;
    });

    const filteredProducts = transformProducts.filter(product => {
        return product.title.toLocaleLowerCase().includes(search.toLocaleLowerCase());
    })

    useEffect(() => {
        dispatch(getProducts());

        return () => {
            dispatch(resetProducts())
        }
    }, [dispatch]);

    const handleLoadMore = () => {
        if (!isLoading && hasMore) {
           dispatch(loadMore());
        }
    };

    return (
        <div className={classes['product-page']}>
            
            <div className={classes['page-controls']}>
                <div className={classes.filter}>
                    <AiFillFilter className={classes.icon} />
                    <span
                        onClick={() => setFilter('all')}
                        className={classes['filter-title']}>Все товары</span>
                    <span
                        onClick={() => setFilter('isFavorite')}
                        className={classes['filter-title']}>Избранное</span>
                </div>

                <Input
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                    type='search'
                    placeholder='Поиск'
                    value={search} 
                />
            </div>

            { isLoading && <div className={classes.loader}><Loader /></div> }
            { !isLoading && !isError && <ProductList products={filteredProducts} /> }
            { hasMore && filter !== 'isFavorite' && !isLoading && (
                <Button 
                    className={classes.more} 
                    color='primary' 
                    onClick={handleLoadMore}>Загрузить еще
                </Button>
            )}
            { isError && <div>Error!</div> }
        </div>
    )
};

export default ProductsPage;