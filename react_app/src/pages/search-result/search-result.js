import React, { useEffect, useState } from 'react';
import './search-result.scss';
import { useSearchParams } from 'react-router-dom';
import { getSearchResults } from './search-result.api';
import { parseRecipe } from '../../utils/api/helpers';
import ListWrapper from '../../blocks/list-wrapper/list-wrapper';
import SearchBar from '../../components/search-bar/search-bar';
import SearchFilters from '../../blocks/search-filters/search-filters';

const SearchResult = () => {
    
    const [items, setItems] = useState(false);
    const [searchParams] = useSearchParams();
    const [textSearch, setTextSearch] = useState(searchParams.get("text") ? searchParams.get("text") : '');
    const [selectedFilters, setSelectedFilters] = useState();

    function updateTextSearch(value) {
        setTextSearch(value);
    }

    useEffect(() => {
        getSearchResults(textSearch, selectedFilters).then((items) => 
            setItems(items
                .map((item) => {
                    return parseRecipe(item)
                }
            ))
        );
    }, [textSearch, selectedFilters]);

    return (    
        <div className="search-result">
            <div className="container-small mt-5 mb-6">
                <SearchBar value={textSearch} onSearch={updateTextSearch}/>
            </div>
            <div className="container">
                <SearchFilters updateSelectedFilters={setSelectedFilters}/>
            </div>
            <div className="container">
                <ListWrapper displaySearchBar={true} textSearch={textSearch} updateTextSearch={updateTextSearch} items={items} />
            </div>
        </div>
)};

export default SearchResult;