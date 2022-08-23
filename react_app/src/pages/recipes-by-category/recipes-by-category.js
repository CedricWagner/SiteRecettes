import React, { useEffect, useState } from 'react';
import './recipes-by-category.scss';
import Recipes from '../recipes/recipes';
import { getCategories } from '../../utils/api/common.api';

const RecipesByCategory = () => {
  
    const [filters, setFilters] = useState([]);

	useEffect(() => {
		getCategories().then((items) => 
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
			filterTitle="Catégories"
			filters={filters}
			filterField="field_categories"
			>
		</Recipes>
)};

RecipesByCategory.propTypes = {};

RecipesByCategory.defaultProps = {};

export default RecipesByCategory;
