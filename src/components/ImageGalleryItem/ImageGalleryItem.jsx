import PropTypes from 'prop-types'; 
import React from 'react';
import css from './ImageGalleryItem.module.css'

const ImageGalleryItem = ( { webformatURL, largeImageURL, onClick} ) => {
    return (
        <li className={css.ImageGalleryItem} >
            <img className={css.ImageGalleryItemImage}
              src={webformatURL}
              alt=""
              onClick={() => {
                onClick(largeImageURL);
              }}
            />
        </li>
    )

};

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,         
};

export default ImageGalleryItem;