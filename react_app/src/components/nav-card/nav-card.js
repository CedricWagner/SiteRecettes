import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './nav-card.scss';

function NavCard (props) {

  return (
    <div className="nav-card" style={{backgroundImage: `url(${props.image})`}}>
      <Link className="nav-card__title" to={props.to}>
        {props.title}
      </Link>
    </div>
  )

}

NavCard.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

NavCard.defaultProps = {};

export default NavCard;
