import React, { useEffect, useState } from 'react';
import './recipes-by-tag.scss';
import { getTags } from '../../utils/api/common.api';
import Recipes from '../recipes/recipes';
import { usePageTitle } from '../../utils/hooks/usePageTitle';

const RecipesByTag = () => {
  
  const [filters, setFilters] = useState([]);
const setPageTitle = usePageTitle();

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

	useEffect(() => {
		setPageTitle("Toutes les recettes par tags");
	}, [filters, setPageTitle]);

	return (
		<Recipes 
			filterTitle="Tags"
			filters={filters}
			filterField="field_tags"
			>
		</Recipes>
)};

export default RecipesByTag;
