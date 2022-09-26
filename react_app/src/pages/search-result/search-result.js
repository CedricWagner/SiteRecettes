import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './search-result.scss';
import SearchBar from '../../components/search-bar/search-bar';
import { useSearchParams } from 'react-router-dom';
import { getSearchResults } from './search-result.api';
import { parseRecipeFromSearchApi } from '../../utils/api/helpers';
import MultipleLoader from '../../components/multiple-loader/multiple-loader';
import Card from '../../components/card/card';

const SearchResult = () => {
    
    const [items, setItems] = useState([]);
    const [searchParams] = useSearchParams();
    const [textSearch, setTextSearch] = useState(searchParams.get("text"))

    function updateTextSearch(value) {
        setTextSearch(value);
    }

    useEffect(() => {
        getSearchResults(textSearch).then((items) => 
            setItems(items
                .map((item) => {
                    return parseRecipeFromSearchApi(item)
                }
            ))
        );
    }, [textSearch])

    return (
        <div className="search-result">
            <div className="container-small mt-5 mb-6">
                <SearchBar value={textSearch} onSearch={updateTextSearch}/>
            </div>
            <div className="container">
                <div className="row">
                    {!items && 
                        <MultipleLoader count={4} />
                    }
                    {items.length === 0 && 
                        <p>Aucun résultat...</p>
                    }
                    {items && items.map((item, key) => 
                        <div className="col-md-3 mb-4" key={key}>
                            <Card title={item.title} image={item.image} to={item.to} taxonomies={item.taxonomies}/>						
                        </div>
                    )}
                </div>

            </div>

        </div>
)};

SearchResult.propTypes = {};

SearchResult.defaultProps = {};

export default SearchResult;
