import React from 'react';
import PropTypes from 'prop-types';
import './order-by-selector.scss';

const OrderBySelector = (props) => {
	
	function setNewOrder(e) {
		props.onChange(e.target.dataset.order);
	}

	return (
		<div className={`order-by-selector order-by-selector--${props.align} dropdown`}>
			<button className="btn btn-link order-by-selector__button dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
				Trier par
			</button>

			<ul className="dropdown-menu">
				{props.orderBys.map((item, key) => 
					<li key={item.value}><button data-order={item.value} onClick={setNewOrder} className={`dropdown-item ${item.value === props.orderBy ? "active" : ""}`}>{item.name}</button></li>
				)}
			</ul>
		</div>
)};

OrderBySelector.propTypes = {
	orderBys: PropTypes.arrayOf(PropTypes.shape({
		value: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired	
	})),
	orderBy: PropTypes.string.isRequired,
	align: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};

OrderBySelector.defaultProps = {
	align: 'left'
};

export default OrderBySelector;
