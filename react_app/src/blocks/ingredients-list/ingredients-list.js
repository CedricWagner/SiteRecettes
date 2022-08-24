import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './ingredients-list.scss';
import IngredientLine from '../../components/ingredient-line/ingredient-line';
import { QuantityContext } from '../../utils/contexts/quantity';
import { qtyWithRatio } from '../../utils/api/helpers';

const IngredientsList = ({ingredients}) => {
	
	const [quantity] = useContext(QuantityContext);
	
	return (
		<div className="ingredients-list">
			{ingredients.map((group, key) => 
				<div className="ingredients-list__group" key={key}>
					{group.title !== "" &&
						<h3 className="ingredients-list__group-title">
							{group.title}
						</h3>
					}
					{group.ingredients.map((ingredient, key) => 
						<IngredientLine name={ingredient.name} amount={String(qtyWithRatio(ingredient.amount, quantity.initial, quantity.current))} details={ingredient.details} picto={ingredient.picto} unit={ingredient.unit} key={key} />
					)}
				</div>
			)}
		</div>
)};

IngredientsList.propTypes = {
	ingredients: PropTypes.arrayOf(PropTypes.object)
};

IngredientsList.defaultProps = {};

export default IngredientsList;
