import React from 'react';
import PropTypes from 'prop-types';
import './ingredient-line.scss';

const IngredientLine = (props) => (
  <div className="ingredient-line">
    <div className="ingredient-line__image-container">
      {props.picto && 
        <img src={props.picto} alt={props.name} className="ingredient-line__image" />
      }
    </div>
    <p className="ingredient-line__text">
      <span className="ingredient-line__amount">
        {parseFloat(props.amount)}
      </span>
      <span className="ingredient-line__unit">
        {props.unit}
      </span>
      <span className="ingredient-line__name">
        {props.name}
      </span>
      <span className="ingredient-line__details">
        {props.details}
      </span>
    </p>
  </div>
);

IngredientLine.propTypes = {
  picto: PropTypes.string,
  amount: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  details: PropTypes.string,
};

IngredientLine.defaultProps = {};

export default IngredientLine;
