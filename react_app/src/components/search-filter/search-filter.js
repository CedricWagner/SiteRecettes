import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './search-filter.scss';
import { capitalizeFirstLetter } from '../../utils/helpers/text';
import {ReactComponent as IconArrow} from '../../images/icons/svg/icon_arrow-up.svg';

const SearchFilter = ({title, slug, items, selectedValues, onChange}) => {

    const [isOpen, setIsOpen] = useState(false);
    // const isOpen = false;

    function clearFilter() {
        onChange(slug, []);
    }

    function updateFilter(e) {
        const id = e.target.dataset.id;
        
        const values = updateSearchFilter(id, selectedValues);

        onChange(slug, values);
    }

    function toggleOpenState() {
        setIsOpen(!isOpen);
    }

    return (
        <div className="search-filter">
            <h3 className="search-filter__title">{title}</h3>
            <div className={"search-filter__box-container search-filter--" + (isOpen ? "open" : "closed")}>
                <span 
                    role={"button"} 
                    className={"search-filter__caret search-filter__caret--" + (isOpen ? "open" : "closed")}
                    onClick={toggleOpenState}
                    >
                    <IconArrow />
                </span>
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
        </div>
)};

export function updateSearchFilter(id, selectedValues) {
    let values = selectedValues;
    if (selectedValues.includes(id)) {
        values = selectedValues.filter((item) => item !== id);
    } else {
        values.push(id);
    }

    return values;
}

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
