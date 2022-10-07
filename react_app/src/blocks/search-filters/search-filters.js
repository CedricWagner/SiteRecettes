import React, { useState } from 'react';
import './search-filters.scss';
import SearchFilter from '../../components/search-filter/search-filter';

const SearchFilters = () => {
    
    const [selectedValues, setSelectedValues] = useState([]); 
    const colClasses = "col-md-2 col-sm-3 col mb-4";
    
    function getFilterSelectedValues(filterSlug) {
        return typeof selectedValues[filterSlug] === 'undefined' ? [] : selectedValues[filterSlug];
    }

    function setFilterSelectedValues(filterSlug, values) {
        let _values = [...selectedValues];
        _values[filterSlug] = values;
        setSelectedValues(_values);
    }

    return (
        <div className="search-filters">
            <div className="row">
                <div className={colClasses}>
                    <SearchFilter title='Contenu' slug='type' selectedValues={getFilterSelectedValues('type')} items={[
                        {id: 'recipe', title: "Recettes"},
                        {id: 'article', title: "Articles"}
                    ]} onChange={setFilterSelectedValues} />
                </div>
            </div>
        </div>
)};

export default SearchFilters;
