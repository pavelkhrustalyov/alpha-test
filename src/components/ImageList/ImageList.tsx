import ImageItem from '../ImageItem/ImageItem';
import classes from './ImageList.module.css';

const ImageList = ({ images }: { images: string[] }) => {
    return (
        <div className={classes.images}>
            { images.map(image => <ImageItem key={image} image={image} />) }
        </div>
    );
};

export default ImageList;