import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './search-input.scss';
import {ReactComponent as IconSearch} from '../../images/icons/svg/icon_search.svg';

const SearchInput = ({defaultValue, modifier, onChange}) => {

    function changeValue(_value) {
        onChange(_value)
    }

	return (
		<div className="search-input__container">
			<input 
				type="text" 
				value={defaultValue}
				className={"search-input search-input--" + modifier} 
				placeholder="Rechercher" 
				required
				onChange={(e) => changeValue(e.target.value)}
				/>
			<button type='submit' className={"search-input__icon search-input__icon--" + modifier}><IconSearch /></button>
		</div>
)};

SearchInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    defaultValue: PropTypes.string,
    modifier: PropTypes.string,
};

SearchInput.defaultProps = {
    modifier: "default"
};

export default SearchInput;
