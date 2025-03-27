import { IPropsProductItem } from './IPropsProductItem';
import classes from './ProductItem.module.css';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { sliceDescription } from '../../utils/utils';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { addToFavorite, deleteProduct, removeFromFavorite } from '../../store/ProductSlice';

const ProductItem = ({ product }: IPropsProductItem) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/product/${product.id}`)} className={classes['product-item']}>
            <div className={classes['product-data']}>
                <h2 className={classes.title}>{sliceDescription(product.title, 25)}</h2>
                <img className={classes.img} src={product.images[0]} alt={product.title} />
                <div className={classes.description}>{sliceDescription(product.description, 50)}</div>
            </div>

            <div className={classes.controls}>
                { 
                    product.isFavorites ?
                    <AiFillHeart
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch(removeFromFavorite(product))
                        }}
                        className={classes.like}
                    /> :
                    <AiOutlineHeart
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch(addToFavorite(product))
                        }}
                        className={classes.dislike}
                    />
                }
                
                <AiFillDelete onClick={(e) => {
                    e.stopPropagation();
                    dispatch(deleteProduct(product.id))
                }} className={classes.delete} />
            </div>

        </div>
    )
};

export default ProductItem;