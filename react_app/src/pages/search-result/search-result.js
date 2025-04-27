import React, { useEffect, useState } from 'react';
import './search-result.scss';
import { useSearchParams } from 'react-router-dom';
import { getSearchResults } from './search-result.api';
import { parseRecipe } from '../../utils/api/helpers';
import ListWrapper from '../../blocks/list-wrapper/list-wrapper';
import SearchBar from '../../components/search-bar/search-bar';
import SearchFilters from '../../blocks/search-filters/search-filters';
import { usePageTitle } from '../../utils/hooks/usePageTitle';
import Pagination from '../../components/pagination/pagination';

const SearchResult = () => {
    
	const countByPage = 20;
    const [items, setItems] = useState(false);
    const [searchParams] = useSearchParams();
    const [page, setPage] = useState(1);
    const [resultCount, setResultCount] = useState(false);
    const [textSearch, setTextSearch] = useState(searchParams.get("text") ? searchParams.get("text") : '');
    const [selectedFilters, setSelectedFilters] = useState();
    const setPageTitle = usePageTitle();

    function updateTextSearch(value) {
        setTextSearch(value);
    }

    useEffect(() => {
        getSearchResults(textSearch, selectedFilters, countByPage, (page - 1) * countByPage).then((res) => {
            setItems(res.data
                .map((item) => {
                    return parseRecipe(item)
                }
            ));
            setResultCount(res.meta.count);
        }
        );
        setPageTitle("Recherche");
    }, [page, textSearch, selectedFilters, setPageTitle]);

    function changePagination(pageNum) {
		setPage(pageNum);
	}

	const numberOfPages = Math.ceil(resultCount / countByPage);

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
            {numberOfPages > 1 && 
                <div className="row">
                    <div className="col mt-5">
                        <Pagination current={page} max={numberOfPages} onPaginate={changePagination} />
                    </div>
                </div>
            }
        </div>
)};

export default SearchResult;