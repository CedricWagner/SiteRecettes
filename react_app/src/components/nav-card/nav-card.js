import React from 'react';
import { Link } from 'react-router-dom';
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

export default NavCard;
