import React from 'react';
import PropTypes from 'prop-types';
import './pagination.scss';
import {ReactComponent as ArrowUp} from '../../images/icons/svg/icon_arrow-up.svg';
import {ReactComponent as DoubleArrow} from '../../images/icons/svg/icon_double_arrow.svg';
import PaginationItem from '../pagination-item/pagination-item';

const Pagination = (props) => {

  return (
    <ul className="pagination">
      <PaginationItem isDisabled={props.current === 1} target={1} onSelect={props.onPaginate}>
        <DoubleArrow />
      </PaginationItem>
      <PaginationItem isDisabled={props.current === 1} target={props.current - 1} onSelect={props.onPaginate}>
        <ArrowUp className="rotate-right"/>
      </PaginationItem>
      {Array.from({length: props.max}, (_, i) => i + 1).map((num) => (
        <PaginationItem target={num} isActive={props.current == num} onSelect={props.onPaginate}>
          {num}
        </PaginationItem>
      ))}
      <PaginationItem isDisabled={props.current === props.max} target={props.current + 1} onSelect={props.onPaginate}>
        <ArrowUp className="rotate-left" />
      </PaginationItem>
      <PaginationItem isDisabled={props.current === props.max} target={props.max} onSelect={props.onPaginate}>
        <DoubleArrow className="reverse-x"/>
      </PaginationItem>
    </ul>
  );
}

Pagination.propTypes = {
  max: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  onPaginate: PropTypes.func.isRequired,
  nbPagesAround: PropTypes.number,
};

Pagination.defaultProps = {
  nbPagesAround: 2,
};

export default Pagination;
