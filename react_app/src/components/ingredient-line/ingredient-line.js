import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ingredient-line.scss';

const IngredientLine = (props) => {
  
  const [isChecked, setChecked] = useState(false);

  function toggleCheck() {
    setChecked(!isChecked);
  }

  return (
    <div className={"ingredient-line " + (isChecked ? 'ingredient-line--checked' : '')} onClick={toggleCheck} role="listitem">
      <div className="ingredient-line__image-container">
        {props.picto && 
          <img src={props.picto} alt={props.name} className="ingredient-line__image" />
        }
      </div>
      <p className="ingredient-line__text">
        {props.amount !== "0" && 
          <span className="ingredient-line__amount">
            {parseFloat(props.amount)}
          </span>
        }
        {props.unit && 
          <span className="ingredient-line__unit">
            {props.unit}
          </span>
        }
        <span className="ingredient-line__name">
          {props.name}
        </span>
        {props.details &&
          <span className="ingredient-line__details">
            {props.details}
          </span>
        }
      </p>
    </div>
)};

IngredientLine.propTypes = {
  picto: PropTypes.string,
  amount: PropTypes.string.isRequired,
  unit: PropTypes.string,
  name: PropTypes.string.isRequired,
  details: PropTypes.string,
};

IngredientLine.defaultProps = {};

export default IngredientLine;
