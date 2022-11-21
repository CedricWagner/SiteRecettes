import './search-bar.scss'
import {ReactComponent as IconSearch} from '../../images/icons/svg/icon_search.svg';
import { useState } from 'react';
import PropTypes from 'prop-types';
import SearchInput from '../search-input/search-input';

function SearchBar (props) {

    const [value, setValue] = useState(props.value)

    function onSubmit(e) {
        e.preventDefault();
        props.onSearch(value)
    }

    return (
        <form className="searchbar" onSubmit={onSubmit}>
            <SearchInput modifier={"large"} value={value} onChange={setValue}/>
        </form>
    );
}

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
    value: PropTypes.string
};
  
SearchBar.defaultProps = {};

export default SearchBar;