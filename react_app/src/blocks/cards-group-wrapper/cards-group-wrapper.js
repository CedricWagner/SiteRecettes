import React from 'react';
import PropTypes from 'prop-types';
import './cards-group-wrapper.scss';
import ListLink from '../../components/list-link/list-link';

const CardsGroupWrapper = (props) => (
  <div className="cards-group-wrapper">
		<h1>{props.title}</h1>
		{props.children}
		<ListLink to={props.link}/>
  </div>
);

CardsGroupWrapper.propTypes = {
	title: PropTypes.string.isRequired, 
	titleAs: PropTypes.string, 
	link: PropTypes.string.isRequired 
};

CardsGroupWrapper.defaultProps = {};

export default CardsGroupWrapper;
