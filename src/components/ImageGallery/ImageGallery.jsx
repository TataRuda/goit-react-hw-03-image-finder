import PropTypes from 'prop-types'; 
import  ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({searchResults, onClick}) => {
    return ( 
        <ul className={css.imageGallery}>
          {searchResults.map(({id, webformatURL, largeImageURL} ) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL = {largeImageURL}
              onClick={onClick}
            />
          ))}
        </ul>
    )
}

ImageGallery.propTypes = {
    searchResults: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,          
      })
    ),
    onClick: PropTypes.func.isRequired,
} 

