import { useNavigate } from 'react-router-dom';
import { IProduct } from '../../interfaces/IProduct';
import Button from '../UI/Button/Button';
import classes from './ProductMore.module.css';
import ImageList from '../ImageList/ImageList';

const ProductMore = ({ product }: { product: IProduct }) => {
    const navigate = useNavigate();

    const price = new Intl.NumberFormat("en-EN", 
    { style: "currency", currency: "USD" })
    .format(product.price);

    return (
        <div className={classes['product-more']}>
            <h1 className={classes.title}>{product?.title}</h1>
            <div className={classes.description}>{product?.description}</div>
            
            <div className={classes['product-data']}>
                <div className={classes['category']}>Категория: {product?.category.name}
                    <div className={classes.price}>Цена: {price}</div>
                </div>
                <img className={classes['category-image']} src={product?.category.image} alt={product?.title} />
            </div>

            <ImageList images={product.images} />

            <div className={classes.controls}>
                <Button
                    className={classes.btn} 
                    onClick={() => navigate('/products')}
                    color='primary'>На главную
                </Button>
                <Button 
                    color='success'
                    onClick={() => navigate(`/edit-product/${product.id}`)} 
                    className={classes.btn}>Редактировать
                </Button>
            </div>
        </div>
    );
};

export default ProductMore;