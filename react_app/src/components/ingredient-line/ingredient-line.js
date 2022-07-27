import React from 'react';
import PropTypes from 'prop-types';
import './ingredient-line.scss';

const IngredientLine = (props) => (
  <div className="ingredient-line">
    <img src={props.picto} alt={props.name} className="ingredient-line__image" />
    <p className="ingredient-line__text">
      <span className="ingledient-line__amount">
        {props.amount}
      </span>
      <span className="ingledient-line__unit">
        {props.unit}
      </span>
      <span className="ingledient-line__name">
        {props.name}
      </span>
      <span className="ingledient-line__details">
        {props.details}
      </span>
    </p>
  </div>
);

IngredientLine.propTypes = {
  picto: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  details: PropTypes.string,
};

IngredientLine.defaultProps = {};

export default IngredientLine;
