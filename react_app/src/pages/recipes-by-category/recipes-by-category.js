import React, { useEffect, useState } from 'react';
import './recipes-by-category.scss';
import Recipes from '../recipes/recipes';
import { getCategories } from '../../utils/api/common.api';
import { usePageTitle } from '../../utils/hooks/usePageTitle';

const RecipesByCategory = () => {
  
    const [filters, setFilters] = useState([]);
	const setPageTitle = usePageTitle();

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

	useEffect(() => {
		setPageTitle("Toutes les recettes par catégories");
	}, [filters, setPageTitle]);

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
