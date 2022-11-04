import React, { useEffect, useState } from 'react';
import './search-filters.scss';
import SearchFilter from '../../components/search-filter/search-filter';
import FilterConfigList from '../../utils/filter-config/FilterConfigList';
import TaxonomyFilterConfig from '../../utils/filter-config/TaxonomyFilterConfig';
import CustomFilterConfig from '../../utils/filter-config/CustomFilterConfig';
import ValueListFilterConfig from '../../utils/filter-config/ValueListFilterConfig';

const SearchFilters = ({updateSelectedFilters}) => {
    
    let filterList = new FilterConfigList();
    filterList.add(new CustomFilterConfig("Contenu", "type", useState([]), () => {
        return (
            [{id: 'recipe', title: "Recettes"},
            {id: 'article', title: "Articles"}]
        )                        
    }))
    filterList.add(new TaxonomyFilterConfig("Catégories", "category_uuid", useState([]), "recipe_category"))
    filterList.add(new TaxonomyFilterConfig("Types de cuisson", "cooking_type_uuid", useState([]), "cooking_type"))
    filterList.add(new ValueListFilterConfig("Difficulté", "field_difficulty", useState([])))
    filterList.add(new ValueListFilterConfig("Prix", "field_price_indicator", useState([])))
    filterList.add(new TaxonomyFilterConfig("Saison", "season_uuid", useState([]), "season"))

    const [selectedValues, setSelectedValues] = useState([]); 
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
        filterList.getFilters().map((filter) => {
            return filter.fetchValues();
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        updateSelectedFilters(selectedValues);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedValues]);

    return (
        <div className="search-filters">
            <div className="row">
                {filterList.getFilters().map((filter, key) => 
                    <div className={colClasses} key={key}>
                        <SearchFilter title={filter.title} slug={filter.slug} selectedValues={getFilterSelectedValuesBySlug(filter.slug)} items={filter.values} onChange={setFilterSelectedValues} />
                    </div>
                )}
            </div>
        </div>
)};

export default SearchFilters;
