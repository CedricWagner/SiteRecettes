import React, { useEffect, useState } from 'react';
import './recipes.scss';
import getRecipes from './recipes.api';
import { parseRecipe } from '../../utils/api/helpers';
import FilterGroup from '../../components/filter-group/filter-group';
import PropTypes from 'prop-types';
import OrderBySelector from '../../components/order-by-selector/order-by-selector';
import { useSearchParams } from 'react-router-dom';
import SelectedFiltersList from '../../blocks/selected-filters-list/selected-filters-list';
import ListWrapper from '../../blocks/list-wrapper/list-wrapper';
import { usePageTitle } from '../../utils/hooks/usePageTitle';
import Pagination from '../../components/pagination/pagination';

const Recipes = ({filterTitle, filters, filterField}) => {
  
	const [searchParams, setSearchParams] = useSearchParams();
	const [recipes, setRecipes] = useState(false);
	const [page, setPage] = useState(1);
	const [resultCount, setResultCount] = useState(false);
    const [activeFilters, setActiveFilters] = useState(searchParams.getAll('filters'));
    const [orderBy, setOrderBy] = useState('-created');
    const setPageTitle = usePageTitle();
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
	const countByPage = 20;

	useEffect(() => {
		getRecipes(orderBy, countByPage, (page - 1)*countByPage, activeFilters, filterField).then((res) => 
			{
				const newRecipes = res.data
					.map((item) => {
						return parseRecipe(item);
					}
				)
				setRecipes([...newRecipes]);
				setResultCount(res.meta.count);
				setSearchParams({filters: activeFilters});
			}
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, activeFilters, orderBy])

	useEffect(() => {
		setActiveFilters(searchParams.getAll('filters'));
		setPageTitle("Toutes les recettes");
	}, [searchParams, setPageTitle])

    function onFilter(_activeFilters) {
		setPage(1);
        setActiveFilters([..._activeFilters]);
    }

	function onUpdateOrder(order) {
		setPage(1);
		setOrderBy(order);
	}

	function changePagination(pageNum) {
		setPage(pageNum);
	}

	const numberOfPages = Math.ceil(resultCount / countByPage);

	return (
		<div className="container recipes">
			<h1>Toutes les recettes</h1>
			<div className="row">
				<div className="col-lg-9 recipes__items-column">
					<div className="row">
						<div className="col">
							<SelectedFiltersList activeFilters={activeFilters} onFilter={onFilter} items={filters} />
						</div>
						<div className="col-auto">
							<OrderBySelector orderBys={orderBys} orderBy={orderBy} align="right" onChange={onUpdateOrder}/>
						</div>
					</div>
					<ListWrapper items={recipes} />
				</div>
				<div className="col-lg-3 recipes__filters-column">
					<div className="recipes__filters-toggle">
						<button className="btn btn-link" 
							type="button" data-bs-toggle="collapse" data-bs-target="#filtersCollapse" aria-expanded="false" aria-controls="filtersCollapse">
							Filtres
						</button>
					</div>
					<div className="recipes__filters-container collapse" id="filtersCollapse">
						<FilterGroup title={filterTitle} activeFilters={activeFilters} onFilter={onFilter} items={filters} />
					</div>
				</div>
			</div>
			{numberOfPages > 1 && 
				<div className="row">
					<div className="col mt-5">
						<Pagination current={page} max={numberOfPages} onPaginate={changePagination} />
					</div>
				</div>
			}
		</div>
)};


Recipes.propTypes = {
	filterTitle: PropTypes.string.isRequired,
	filters: PropTypes.arrayOf(PropTypes.object),
	filterField: PropTypes.string.isRequired
};

export default Recipes;
