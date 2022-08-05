import React from 'react';
import PropTypes from 'prop-types';
import './list-link.scss';
import { Link } from 'react-router-dom';

const ListLink = (props) => (
	<div className="list-link">
		<Link to={props.to} className="list-link__link">
			{props.label}
		</Link>
	</div>		
);

ListLink.propTypes = {
	label: PropTypes.string,
	to: PropTypes.string.isRequired
};

ListLink.defaultProps = {
  	label: "Voir plus"
};

export default ListLink;
