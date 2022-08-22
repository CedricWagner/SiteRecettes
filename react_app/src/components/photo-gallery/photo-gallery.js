import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './photo-gallery.scss';
import ImageGallery from 'react-image-gallery';

const PhotoGallery = ({images}) => {
	
	const [selectedImage, setSelectedImage] = useState(false)

	function selectImage(e) {
		const image = parseInt(e.target.dataset.key);
		setSelectedImage(image);
	}

	const galleryImages = images.map((image) => {
		return {
			original: image.wide,
			thumbnail: image.thumb,
			originalAlt: image.title,
			thumbnailAlt: image.title,
			originalTitle: image.title,
			description: image.title,
		}
	})

	return (
	<div className="photo-gallery">
		<div className="row">
			{images.map((image, key) => 
				<div key={key} className="photo-gallery__item col-lg-2 col-md-3 col-6">
					<img src={image.thumb} alt={image.title} className="img img-fluid" onClick={selectImage} data-key={key} title={image.title} data-bs-toggle="modal" data-bs-target="#galleryModal"/>
				</div>
			)}
		</div>
		<div className="modal fade" id="galleryModal" tabIndex="-1" aria-labelledby="galleryModalLabel" aria-hidden="true">
			<div className="modal-dialog modal-xl">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="galleryModalLabel">{selectedImage.title}</h5>
						<button type="button" className="btn btn-link btn-close" data-bs-dismiss="modal" aria-label="Close">Fermer</button>
					</div>
					<div className="modal-body text-center">
						<ImageGallery items={galleryImages} startIndex={selectedImage ? selectedImage : 0}/>
					</div>
				</div>
			</div>
		</div>
	</div>
)};

PhotoGallery.propTypes = {
	images: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string.isRequired,
		thumb: PropTypes.string.isRequired,
		wide: PropTypes.string.isRequired
	})).isRequired
};

PhotoGallery.defaultProps = {};

export default PhotoGallery;
