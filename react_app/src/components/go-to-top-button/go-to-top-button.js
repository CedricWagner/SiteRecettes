import React from 'react';
import {ReactComponent as IconUp} from '../../images/icons/svg/icon_arrow-up.svg';
import './go-to-top-button.scss';

const GoToTopButton = () => {
  
  function goToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  return (
    <button href="#" className="go-to-top-button btn btn-secondary" onClick={goToTop}>
      <IconUp />
    </button>
  )
};

export default GoToTopButton;
