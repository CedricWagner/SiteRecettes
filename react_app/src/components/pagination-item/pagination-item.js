import React from 'react';
import PropTypes from 'prop-types';
import './pagination-item.scss';

const PaginationItem = (props) => {
  function handleClick() {
    props.onSelect(props.target);
  }

  let classes = [
    'pagination-item',
    'btn',
  ];
  if (props.isActive) {
    classes.push('btn-primary');
    classes.push('pagination-item--active');
  } else {
    classes.push('btn-link');
  }
  if (props.isDisabled) {
    classes.push('pagination-item--disabled');
  }

  return (!props.isDisabled && 
    <li className={classes.join(' ')} onClick={handleClick}>
      {props.children}
    </li>
  );
}

PaginationItem.propTypes = {
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  current: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired
};

PaginationItem.defaultProps = {
  isActive: false,
  isDisabled: false,
};

export default PaginationItem;
