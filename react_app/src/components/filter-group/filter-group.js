import React from 'react';
import PropTypes from 'prop-types';
import './filter-group.scss';
import FilterItem from '../filter-item/filter-item';

const FilterGroup = (props) => {
  
  function selectAll() {
    props.onFilter([])
  }

  return (
    <div className="filter-group">
      <div className="filter-group__title">
      {props.title}
    </div>
    <div className="filter-group__content">
      <div className={`filter-item filter-item--all ${props.activeFilters.length === 0 ? "filter-item--active" : ""}`}>
        <div className="filter-item__title" role="button" onClick={selectAll}>
          Toutes
        </div>
      </div>
      {props.items.map((item) => 
        <FilterItem key={item.id} id={item.id} title={item.title} children={item.children} activeFilters={props.activeFilters} onSelect={props.onFilter}/>
      )}
    </div>
  </div>
)};

FilterGroup.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
    }))
  })),
  activeFilters: PropTypes.arrayOf(PropTypes.number.isRequired),
  onFilter: PropTypes.func.isRequired
};

FilterGroup.defaultProps = {};

export default FilterGroup;
