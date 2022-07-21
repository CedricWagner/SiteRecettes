import './search-bar.scss'
import {ReactComponent as IconSearch} from '../../images/icons/svg/icon_search.svg';
import { useState } from 'react';
import PropTypes from 'prop-types';

function SearchBar (props) {

    const [value, setValue] = useState('')

    function changeValue(_value) {
        setValue(_value)
    }

    function onSubmit(e) {
        e.preventDefault();
        props.onSearch(value)
    }

    return (
        <form className="searchbar" onSubmit={onSubmit}>
            <input 
                type="text" 
                value={value} 
                className="searchbar__input" 
                name="value" 
                placeholder="Rechercher" 
                required
                onChange={(e) => changeValue(e.target.value)}
                />
            <button type='submit' className="searchbar__icon"><IconSearch /></button>
        </form>
    );
}

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired
};
  
SearchBar.defaultProps = {};

export default SearchBar;