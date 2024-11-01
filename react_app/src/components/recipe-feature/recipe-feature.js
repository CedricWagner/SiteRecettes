import React from 'react';
import PropTypes from 'prop-types';
import './recipe-feature.scss';

const RecipeFeature = (props) => {

  return (
    <div className="recipe-feature">
      {props.items.map((item, key) => 
        <div key={key} className="recipe-feature__picto-container">
          <img src={item.picto} alt={item.title} title={item.title} className="recipe-feature__picto" />
        </div>
      )}
      {props.value && (
        <div className="recipe-feature__label">
          {props.value}
        </div>
      )}
      {props.children}
    </div>
)};

RecipeFeature.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    picto: PropTypes.string.isRequired
  })).isRequired,
  value: PropTypes.string
};

RecipeFeature.defaultProps = {};

export default RecipeFeature;
