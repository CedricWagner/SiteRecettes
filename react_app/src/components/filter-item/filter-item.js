import React from 'react';
import PropTypes from 'prop-types';
import './filter-item.scss';

const FilterItem = (props) => {
  
  const isActive = props.activeFilters.includes(props.id)
  const activeChildren = (props.children && props.children.length > 0) && props.children.filter((item) => props.activeFilters.includes(item.id)).length > 0

  function selectItem(e) {
    let filters = [...props.activeFilters, parseInt(e.target.dataset.id)]
    props.onSelect(filters)
  }

  function unselectItem(e) {
    let filters = [...props.activeFilters]
    props.onSelect(filters.filter((id) => id !== parseInt(e.target.dataset.id)))
  }

  return (
    <div className={`filter-item ${isActive ? "filter-item--active" : ""} ${props.children ? "filter-item--parent" : ""} ${activeChildren || isActive ? "filter-item--open" : ""}`}  key={props.id}>
      <div className="filter-item__title" data-id={props.id} role="button" onClick={isActive ? unselectItem : selectItem}>
        {props.title}
      </div>
      {props.children && (
        <div className="filter-item__children">
          {props.children.map((item) => 
            <FilterItem key={item.id} id={item.id} title={item.title} children={item.children} activeFilters={props.activeFilters} onSelect={props.onSelect}/>
          )}
        </div>
      )}
    </div>
);}

FilterItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    isActive: PropTypes.bool
  })),
  activeFilters: PropTypes.arrayOf(PropTypes.number.isRequired),
  onSelect: PropTypes.func.isRequired
};

FilterItem.defaultProps = {};

export default FilterItem;
