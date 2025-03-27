import classes from './ImageItem.module.css';

const ImageItem = ({ image }: { image: string }) => {
    return (
        <img 
            className={classes['more-image']} 
            src={image} 
            alt={image}
        />
    );
};

export default ImageItem;