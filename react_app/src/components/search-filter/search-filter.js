import React from 'react';
import PropTypes from 'prop-types';
import './search-filter.scss';
import { capitalizeFirstLetter } from '../../utils/helpers/text';

const SearchFilter = ({title, slug, items, selectedValues, onChange}) => {

    function clearFilter() {
        onChange(slug, []);
    }

    function updateFilter(e) {
        const id = e.target.dataset.id;
        let values = selectedValues;
        if (selectedValues.includes(id)) {
            values = selectedValues.filter((item) => item !== id);
        } else {
            values.push(id);
        }

        onChange(slug, values);
    }

    return (
        <div className="search-filter">
            <h3 className="search-filter__title">{title}</h3>
            <ul className="search-filter__box" role={"listbox"}>
                <li className={"search-filter__item " + (selectedValues.length === 0 ? "search-filter__item--selected" : "")} role={"option"} aria-selected={selectedValues.length === 0} onClick={clearFilter}>
                    Indifférent
                </li>
                {items && items.map((item, key) => 
                    <li key={key} className={"search-filter__item " + (selectedValues.includes(item.id) ? "search-filter__item--selected" : "")} data-id={item.id} role={"option"} aria-selected={selectedValues.includes(item.id)} onClick={updateFilter}>
                        {capitalizeFirstLetter(item.title)}
                    </li>
                )}
            </ul>
        </div>
)};

SearchFilter.propTypes = {
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired, 
    items: PropTypes.arrayOf(PropTypes.shape(
        {
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired
        }
    )),
    selectedValues: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func.isRequired
};

SearchFilter.defaultProps = {};

export default SearchFilter;
