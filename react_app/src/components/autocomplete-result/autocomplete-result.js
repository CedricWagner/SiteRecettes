import React from 'react';
import PropTypes from 'prop-types';
import './autocomplete-result.scss';

const AutocompleteResult = ({items, onSelect}) => {
  
  function handleClick(e) {
    onSelect(e.target.dataset.id);
  }

  return (
    <>
      {items && items.length > 0 && 
        <ul className="autocomplete-result">
          {items.map((item, key) => 
            <li className="autocomplete-result__item" key={key} data-id={item.id} onClick={handleClick}>
              {item.title}
            </li>
          )}
        </ul>
      }
    </>
)};

AutocompleteResult.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ // @TODO: factorize this
    title: PropTypes.string.isRequired,  
    id: PropTypes.string.isRequired,
  }))
};

AutocompleteResult.defaultProps = {};

export default AutocompleteResult;
