import CreateProduct from '../../components/CreateProduct/CreateProduct';
import classes from './CreateProductPage.module.css';

const CreateProductPage = () => {
    return (
        <div className={classes['create-product']}>
            <CreateProduct />
        </div>
    );
};

export default CreateProductPage;