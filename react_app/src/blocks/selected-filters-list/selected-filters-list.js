import React from 'react';
import PropTypes from 'prop-types';
import './selected-filters-list.scss';
import SelectedFilter from '../../components/selected-filter/selected-filter';
import FilterGroup from '../../components/filter-group/filter-group';

const SelectedFiltersList = ({activeFilters, items, onFilter}) => {
  
  function removeFilter(id) {
    const arr = activeFilters.filter((item) => item !== id);
    onFilter(arr);
  }

  function resetFilters() {
    onFilter([]);
  }
  
  
  // add all items and their children into an unique filter
  let allFilters = [];
  
  items.map(item => {
    allFilters.push(item);
    if (item.children) {
      item.children.map(item => {
        allFilters.push(item);
        return item;    
      })
    }
    return item;
  });

  return (
    <div className="selected-filters-list">
      {allFilters.filter(item => activeFilters.includes(item.id)).map((item, index) => 
        <SelectedFilter title={item.title} id={item.id} key={index} onRemove={removeFilter} />
      )}
      {activeFilters.length > 0 && 
        <button onClick={resetFilters} className="btn btn-link">Réinitialiser</button>
      }
    </div>
)};

SelectedFiltersList.propTypes = {
  activeFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
  items: FilterGroup.propTypes.items,
  onFilter: PropTypes.func.isRequired
};

SelectedFiltersList.defaultProps = {};

export default SelectedFiltersList;
