import PropTypes from 'prop-types';
import './search-input.scss';
import {ReactComponent as IconSearch} from '../../images/icons/svg/icon_search.svg';
import {ReactComponent as IconCross} from '../../images/icons/svg/icon_cross.svg';
import { useRef } from 'react';

const SearchInput = ({defaultValue, modifier, onChange, displayEraseButton}) => {

	const inputElement = useRef(null); 

    function changeValue(_value) {
        onChange(_value);
    }

	function eraseValue() {
		onChange("");
		inputElement.current.focus();
	}

	return (
		<div className="search-input__container">
			<input 
				type="text" 
				value={defaultValue}
				className={"search-input search-input--" + modifier} 
				placeholder="Rechercher" 
				onChange={(e) => changeValue(e.target.value)}
				ref={inputElement}
				/>
			{displayEraseButton && defaultValue.length > 0 && 
				<span role={"button"} className={"search-input__icon search-input__icon--erase search-input__icon--" + modifier} onClick={eraseValue}><IconCross /></span>
			}
			<button type='submit' className={"search-input__icon search-input__icon--search search-input__icon--" + modifier}><IconSearch /></button>
		</div>
)};

SearchInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    defaultValue: PropTypes.string,
    modifier: PropTypes.string,
    displayEraseButton: PropTypes.bool,
};

SearchInput.defaultProps = {
    defaultValue: "",
    modifier: "default",
    displayEraseButton: false,
};

export default SearchInput;
