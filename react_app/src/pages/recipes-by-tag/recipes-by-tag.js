import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './recipes-by-tag.scss';
import { getTags } from '../../utils/api/common.api';
import Recipes from '../recipes/recipes';

const RecipesByTag = () => {
  
  const [filters, setFilters] = useState([]);

	useEffect(() => {
		getTags().then((items) => 
			{
				setFilters(items.map(item =>
					{
						return {
							id: item.id,
							title: item.name
						}
					}
				))
			}
		);
	}, [])

	return (
		<Recipes 
			filterTitle="Tags"
			filters={filters}
			filterField="field_tags"
			>
		</Recipes>
)};

RecipesByTag.propTypes = {};

RecipesByTag.defaultProps = {};

export default RecipesByTag;
