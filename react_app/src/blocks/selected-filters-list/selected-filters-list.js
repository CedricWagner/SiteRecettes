import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './selected-filters-list.scss';
import SelectedFilter from '../../components/selected-filter/selected-filter';

const SelectedFiltersList = ({activeFilters, items, onFilter}) => {
  
  function removeFilter(id) {
    const arr = activeFilters.filter((item) => item !== id);
    onFilter(arr);
  }

  function reinitFilters() {
    onFilter([]);
  }
  
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
        {
          return <SelectedFilter title={item.title} id={item.id} key={index} onRemove={removeFilter} />
        }
      )}
      {activeFilters.length > 0 && 
        <button onClick={reinitFilters} className="btn btn-link">Réinitialiser</button>
      }
    </div>
)};

SelectedFiltersList.propTypes = {};

SelectedFiltersList.defaultProps = {};

export default SelectedFiltersList;
