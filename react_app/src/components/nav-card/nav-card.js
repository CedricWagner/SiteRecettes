import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './nav-card.scss';

function NavCard (props) {

  const navigate = useNavigate();

  return (
    <div className="nav-card" onClick={() => navigate(props.to)}style={{backgroundImage: `url(${props.image})`}}>
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
