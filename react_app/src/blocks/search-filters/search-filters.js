import React, { useEffect, useState } from 'react';
import './search-filters.scss';
import SearchFilter from '../../components/search-filter/search-filter';
import { getCategories } from '../../utils/api/common.api';

const SearchFilters = ({updateSelectedFilters}) => {
    
    const [selectedValues, setSelectedValues] = useState([]); 
    const [categoryFilters, setCategoryFilters] = useState([]); 
    const colClasses = "col-md-2 col-sm-3 col mb-4";
    
    function getFilterSelectedValuesBySlug(slug) {
        return typeof selectedValues[slug] === 'undefined' ? [] : selectedValues[slug];
    }

    function setFilterSelectedValues(filterSlug, values) {
        let _values = {...selectedValues};
        _values[filterSlug] = values;
        setSelectedValues(_values);
    }

    useEffect(() => {
        getCategories().then((items) => 
            {
                setCategoryFilters(items.map((item) => {
                    return {
                        title: item.name,
                        id: item.id
                    }}
            ))}
        );
    }, []);

    useEffect(() => {
        updateSelectedFilters(selectedValues);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedValues]);

    return (
        <div className="search-filters">
            <div className="row">
                <div className={colClasses}>
                    <SearchFilter title='Contenu' slug='type' selectedValues={getFilterSelectedValuesBySlug('type')} items={[
                        {id: 'recipe', title: "Recettes"},
                        {id: 'article', title: "Articles"}
                    ]} onChange={setFilterSelectedValues} />
                </div>
                <div className={colClasses}>
                    <SearchFilter title='Catégories' slug='category_uuid' selectedValues={getFilterSelectedValuesBySlug('category_uuid')} items={categoryFilters} onChange={setFilterSelectedValues} />
                </div>
            </div>
        </div>
)};

export default SearchFilters;
