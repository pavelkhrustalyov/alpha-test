import ProductItem from '../ProductItem/ProductItem';
import { IPropsProductList } from './IPropsProductList';
import classes from './ProductList.module.css';

const ProductList = ({ products }: IPropsProductList) => {
    return (
        <div className={classes['product-list']}>
            {
                products.map(product => {
                    return <ProductItem key={product.id} product={product} />
                })
            }
        </div>
    )
};

export default ProductList;