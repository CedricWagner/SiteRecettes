import React, { useEffect, useState } from 'react';
import './recipes.scss';
import getRecipes from './recipes.api';
import { parseRecipe } from '../../utils/api/helpers';
import MultipleLoader from '../../components/multiple-loader/multiple-loader';
import Card from '../../components/card/card';
import FilterGroup from '../../components/filter-group/filter-group';
import { getCategories } from '../../utils/api/common.api';

const Recipes = () => {
  
	const [recipes, setRecipes] = useState([])
	const [page, setPage] = useState(0);
    const [activeFilters, setActiveFilters] = useState([]);
    const [filters, setFilters] = useState([]);
	const count = 12;

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
		getRecipes('-created', count, page*count, activeFilters).then((items) => 
			{
				const newRecipes = items
					.map((item) => {
						return parseRecipe(item);
					}
				)
				if (page === 0) {
					setRecipes([...newRecipes]);
				} else {
					setRecipes([...recipes, ...newRecipes]);
				}
			}
		);
	}, [page, activeFilters])

	function loadMore() {
		setPage(page + 1);
	}

    function onFilterCategories(_activeFilters) {
		setPage(0);
        setActiveFilters([..._activeFilters]);
    }

	return (
		<div className="container recipes">
			<h1>Toutes les recettes</h1>
			<div className="row">
				<div className="col-md-9">
					<div class="dropdown">
						<button class="btn btn-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
							Trier par
						</button>

						<ul class="dropdown-menu">
							<li><button class="dropdown-item">Plus Récent</button></li>
							<li><button class="dropdown-item">Plus Ancien</button></li>
							<li><button class="dropdown-item">Alphabétique</button></li>
						</ul>
					</div>
					<div className="row">
						{recipes.length === 0 && 
							<MultipleLoader count={3} />
						}
						{recipes.map((item, key) => 
							<div className="col-md-4 mb-4" key={key}>
								<Card title={item.title} image={item.image} to={item.to} taxonomies={item.taxonomies}/>						
							</div>
						)}
					</div>
					<div className="list-link">
						<button className="list-link__link btn btn-link" onClick={loadMore}>Voir plus</button>
					</div>
				</div>
				<div className="col-md-3">
					<FilterGroup title="Catégorie" activeFilters={activeFilters} onFilter={onFilterCategories} items={filters} />
				</div>
			</div>
		</div>
)};

export default Recipes;