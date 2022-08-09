import React from 'react';
import PropTypes from 'prop-types';
import './carousel.scss';

const Carousel = ({images, initialIndex}) => {

  return (
    <div className="carousel">
      <div id="carouselCaptions" className="carousel slide" data-bs-ride="false">
        <div className="carousel-indicators">
          {images.map((image, key) =>
            <button  key={key} type="button" data-bs-target="#carouselCaptions" data-bs-slide-to={key} className={key === parseInt(initialIndex) ? "active" : ""} aria-current="true" aria-label={image.title}></button>
          )}
        </div>
        <div className="carousel-inner">
          {images.map((image, key) => 
            <div className={`carousel-item ${key === parseInt(initialIndex) ? "active" : ""}`} key={key}>
              <img src={image.wide} alt={image.title}/>
              <div className="carousel-caption d-none d-md-block">
                <h5>{image.title}</h5>
              </div>
            </div>
          )}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Précédent</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Suivant</span>
        </button>
      </div>
    </div>
)};

Carousel.propTypes = {
	images: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string.isRequired,
		thumb: PropTypes.string.isRequired,
		wide: PropTypes.string.isRequired
	})).isRequired
};

Carousel.defaultProps = {};

export default Carousel;
