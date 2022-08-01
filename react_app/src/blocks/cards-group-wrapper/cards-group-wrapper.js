import React from 'react';
import PropTypes from 'prop-types';
import './cards-group-wrapper.scss';
import { Link } from 'react-router-dom';

const CardsGroupWrapper = (props) => (
  <div className="cards-group-wrapper">
		<h1>{props.title}</h1>
		{props.children}
		<div className="cards-group-wrapper__link-container">
			<Link to={props.link} className="cards-group-wrapper__link">
				Voir plus...
			</Link>
		</div>
  </div>
);

CardsGroupWrapper.propTypes = {
	title: PropTypes.string.isRequired, 
	titleAs: PropTypes.string, 
	link: PropTypes.string.isRequired 
};

CardsGroupWrapper.defaultProps = {};

export default CardsGroupWrapper;
