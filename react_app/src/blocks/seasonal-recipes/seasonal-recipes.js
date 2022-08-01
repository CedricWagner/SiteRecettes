import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './seasonal-recipes.scss';
import { parseMenuLink } from '../../utils/api/helpers';
import getSeasonalRecipes from './season-recipes.api';
import Card from '../../components/card/card';

const SeasonalRecipes = (props) => {
  
	const [recipes, setRecipes] = useState([]);

	useEffect(() => {
		getSeasonalRecipes(8, props.count).then((items) => 
			setRecipes(items
				.filter(item => item.status)
				.map((item) => {
					return {
						title: item.title,
						image: item.field_image.image_style_uri ? item.field_image.image_style_uri.card : null,
						to: item.path.alias,
						taxonomies: item.field_categories.filter(term => term.status).map((term) => {
							return {
								title: term.name,
								to: term.path.alias ? term.path.alias : '/categories/' + term.id
							}
						})
					}
				}
			))
		);
	}, [props.count])

	return (
		<div className="seasonal-recipes row">
			{recipes.map((item, key) => 
				<div className="col-md-3" key={key}>
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
