import PropTypes from 'prop-types';
import './pagination.scss';
import ArrowLeft from '../../images/icons/svg/icon_arrow-left.svg';
import ArrowRight from '../../images/icons/svg/icon_arrow-right.svg';
import DoubleArrowLeft from '../../images/icons/svg/icon_double-arrow-left.svg';
import DoubleArrowRight from '../../images/icons/svg/icon_double-arrow-right.svg';
import PaginationItem from '../pagination-item/pagination-item';

const Pagination = (props) => {

  return (
    <ul className="pagination">
      <PaginationItem isDisabled={props.current === 1} target={1} onSelect={props.onPaginate}>
        <img src={DoubleArrowLeft} alt="Première page" />
      </PaginationItem>
      <PaginationItem isDisabled={props.current === 1} target={props.current - 1} onSelect={props.onPaginate}>
        <img src={ArrowLeft} alt="Page précédente" />
      </PaginationItem>
      {Array.from({length: props.max}, (_, i) => i + 1).map((num) => (
        <PaginationItem target={num} isActive={props.current === num} onSelect={props.onPaginate}>
          {num}
        </PaginationItem>
      ))}
      <PaginationItem isDisabled={props.current === props.max} target={props.current + 1} onSelect={props.onPaginate}>
        <img src={ArrowRight} alt="Page suivante" />
      </PaginationItem>
      <PaginationItem isDisabled={props.current === props.max} target={props.max} onSelect={props.onPaginate}>
        <img src={DoubleArrowRight} alt="Dernière page" />
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
