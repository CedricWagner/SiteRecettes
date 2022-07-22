import React from 'react';
import PropTypes from 'prop-types';
import './quantity-control.scss';
import {ReactComponent as IconPlus} from '../../images/icons/svg/icon_plus.svg';
import {ReactComponent as IconMinus} from '../../images/icons/svg/icon_minus.svg';

const QuantityControl = (props) => {
  
  function increaseQuantity() {
    props.onUpdateQuantity(props.current + 1)
  }

  function decreaseQuantity() {
    props.onUpdateQuantity(props.current - 1)
  }

  return (
    <div className="quantity-control">
      <button className="btn btn-primary" title="Moins" onClick={decreaseQuantity}>
        <IconMinus/>
      </button>
      <div className="quantity-control__value">
        {props.current} {props.unity}
      </div>
      <button className="btn btn-primary" title="Plus" onClick={increaseQuantity}>
        <IconPlus/>
      </button> 
    </div>
)};

QuantityControl.propTypes = {
  onUpdateQuantity: PropTypes.func.isRequired,
  current: PropTypes.number.isRequired,
  unity: PropTypes.string
};

QuantityControl.defaultProps = {};

export default QuantityControl;
