import PropTypes from 'prop-types';
import './quantity-control.scss';
import IconPlus from '../../images/icons/svg/icon_plus.svg';
import IconMinus from '../../images/icons/svg/icon_minus.svg';

const QuantityControl = (props) => {
  
  function increaseQuantity() {
    props.onUpdateQuantity(props.current + 1)
  }

  function decreaseQuantity() {
    if (props.current <= 1) {
      return false;
    }

    props.onUpdateQuantity(props.current - 1)
  }

  return (
    <div className="quantity-control">
      <button className="btn btn-terciary" disabled={props.current === 1 ? true : false} title="Moins" onClick={decreaseQuantity}>
        <img src={IconMinus} alt="Moins" />
      </button>
      <div className="quantity-control__value">
        {props.current} {props.unity}
      </div>
      <button className="btn btn-terciary" title="Plus" onClick={increaseQuantity}>
        <img src={IconPlus} alt="Plus" />
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
