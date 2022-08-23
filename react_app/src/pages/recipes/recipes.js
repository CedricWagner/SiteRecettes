import React, { useEffect, useState } from 'react';
import './recipes.scss';
import getRecipes from './recipes.api';
import { parseRecipe } from '../../utils/api/helpers';
import MultipleLoader from '../../components/multiple-loader/multiple-loader';
import Card from '../../components/card/card';
import FilterGroup from '../../components/filter-group/filter-group';
import PropTypes from 'prop-types';
import OrderBySelector from '../../components/order-by-selector/order-by-selector';
import { useSearchParams } from 'react-router-dom';

const Recipes = ({filterTitle, filters, filterField}) => {
  
	const [searchParams, setSearchParams] = useSearchParams();
	const [recipes, setRecipes] = useState(false)
	const [page, setPage] = useState(0);
    const [activeFilters, setActiveFilters] = useState(searchParams.getAll('filters'));
    // const [activeFilters, setActiveFilters] = useState([]);
    const [orderBy, setOrderBy] = useState('-created');
    const [displayLoadMore, setDisplayLoadMore] = useState(true);
	const orderBys = [
		{value: '-created',
		name: 'Plus récent'},
		{value: 'created',
		name: 'Plus ancien'},
		{value: 'title',
		name: 'Alphabétique'},
		{value: '-title',
		name: 'Alphabétique inversé'}
	];
	const count = 12;

	useEffect(() => {
		getRecipes(orderBy, count, page*count, activeFilters, filterField).then((items) => 
			{
				const newRecipes = items
					.map((item) => {
						return parseRecipe(item);
					}
				)
				if (page === 0) {
					setRecipes([...newRecipes]);
				} else {
					const oldRecipes = recipes ? recipes : [];
					setRecipes([...oldRecipes, ...newRecipes]);
				}

				setDisplayLoadMore(newRecipes.length === count);
				setSearchParams({filters: activeFilters});
			}
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, activeFilters, orderBy])

	useEffect(() => {
		setActiveFilters(searchParams.getAll('filters'));
	}, [searchParams])


	function loadMore() {
		setPage(page + 1);
	}

    function onFilter(_activeFilters) {
		setPage(0);
        setActiveFilters([..._activeFilters]);
    }

	function onUpdateOrder(order) {
		setPage(0);
		setOrderBy(order);
	}

	return (
		<div className="container recipes">
			<h1>Toutes les recettes</h1>
			<div className="row">
				<div className="col-md-9">
					<OrderBySelector orderBys={orderBys} orderBy={orderBy} align="right" onChange={onUpdateOrder}/>
					<div className="row">
						{!recipes && 
							<MultipleLoader count={3} />
						}
						{recipes.length === 0 && 
							<p>Aucun résultat...</p>
						}
						{recipes && recipes.map((item, key) => 
							<div className="col-md-4 mb-4" key={key}>
								<Card title={item.title} image={item.image} to={item.to} taxonomies={item.taxonomies}/>						
							</div>
						)}
					</div>
					{displayLoadMore && 
						<div className="list-link">
							<button className="list-link__link btn btn-link" onClick={loadMore}>Voir plus</button>
						</div>
					}
				</div>
				<div className="col-md-3">
					<FilterGroup title={filterTitle} activeFilters={activeFilters} onFilter={onFilter} items={filters} />
				</div>
			</div>
		</div>
)};


Recipes.propTypes = {
	filterTitle: PropTypes.string.isRequired,
	filters: PropTypes.arrayOf(PropTypes.object),
	filterField: PropTypes.string.isRequired
};

export default Recipes;
