import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './autocomplete-search-filter.scss';
import SelectedFilter from '../selected-filter/selected-filter';
import { updateSearchFilter } from '../search-filter/search-filter';
import AutocompleteResult from '../autocomplete-result/autocomplete-result';
import SearchInput from '../search-input/search-input';

const AutocompleteSearchFilter = ({title, slug, ressource, callback, selectedValues, onChange}) => {
	
	const [autocompleteText, setAutocompleteText] = useState("");
	const [autocompleteResults, setAutocompleteResults] = useState([]);
	const [previouslySelectedValues, setPreviouslySelectedValues] = useState([]);

    function updateFilter(id) {
		const values = updateSearchFilter(id, selectedValues);

		setAutocompleteResults([]);
		setAutocompleteText("");
		
        onChange(slug, values);
		
		// get selected values to display their label
		const _selectedValue = autocompleteResults.filter((item) => item.id === id);
		let _selectedValues = previouslySelectedValues;
		_selectedValues.filter((item) => {
			return selectedValues.filter((_item) => _item === item.id).length >= 1;
		});
		setPreviouslySelectedValues(_selectedValues.concat(_selectedValue));
    }

	function updateAutocompleteText(value) {
		setAutocompleteText(value);
	}

	useEffect(() => {
		if (autocompleteText.length >= 2) {
			callback(ressource, autocompleteText).then((items) => {
				setAutocompleteResults(items);
			}); 
		} else {
			setAutocompleteResults([]);
		}

        // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [autocompleteText])
	
	useEffect(() => {
		let _selectedValues = previouslySelectedValues;
		setPreviouslySelectedValues(_selectedValues.filter((item) => {
			return selectedValues.filter((id) => id === item.id).length >= 1;
		}));
        // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedValues]);

	return (
		<div className="autocomplete-search-filter">
			<h3 className="search-filter__title">{title}</h3>
			<SearchInput onChange={updateAutocompleteText} modifier="small" defaultValue={autocompleteText}/>
			<ul className="autocomplete-search-filter__selected-items" role={"listbox"}>
				{previouslySelectedValues.map((item, index) => 
					<SelectedFilter title={item.title} id={item.id} key={index} onRemove={updateFilter} />
				)}
			</ul>
			<AutocompleteResult onSelect={updateFilter} items={autocompleteResults} />
		</div>
)};

AutocompleteSearchFilter.propTypes = {
	title: PropTypes.string.isRequired,
	slug: PropTypes.string.isRequired,
	ressource: PropTypes.string.isRequired,
	selectedValues: PropTypes.arrayOf(PropTypes.string.isRequired),
	callback: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired
};

AutocompleteSearchFilter.defaultProps = {};

export default AutocompleteSearchFilter;
