import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './seasonal-recipes.scss';
import getSeasonalRecipes from './season-recipes.api';
import Card from '../../components/card/card';
import MultipleLoader from '../../components/multiple-loader/multiple-loader';
import { parseRecipe } from '../../utils/api/helpers';

const SeasonalRecipes = (props) => {
  
	const [recipes, setRecipes] = useState([]);

	useEffect(() => {
		getSeasonalRecipes(8, props.count).then((items) => 
			setRecipes(items
				.filter(item => item.status)
				.map((item) => {
					return parseRecipe(item)
				}
			))
		);
	}, [props.count])

	return (
		<div className="seasonal-recipes row">
			{recipes.length === 0 && 
				<MultipleLoader count={props.count}/>
			}
			{recipes && recipes.map((item, key) => 
				<div className="col-lg-3 col-md-6" key={key}>
					<Card title={item.title} image={item.image} to={item.to} taxonomies={item.taxonomies}></Card>
				</div>
			)}
		</div>
)};

SeasonalRecipes.propTypes = {
  	count: PropTypes.number,
};

SeasonalRecipes.defaultProps = {
  	count: 4
};

export default SeasonalRecipes;
