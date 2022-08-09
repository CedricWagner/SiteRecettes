import React from 'react';
import PropTypes from 'prop-types';
import './recipe-features-list.scss';
import RecipeFeature from '../../components/recipe-feature/recipe-feature';

import FlatwareIcon from '../../images/icons/svg/icon_flatware.svg';
import TimerIcon from '../../images/icons/svg/icon_timer.svg';
import CuttingIcon from '../../images/icons/svg/icon_cutting.svg';
import HourglassWaitIcon from '../../images/icons/svg/icon_hourglass-wait.svg';
import HeatIcon from '../../images/icons/svg/icon_heat.svg';

const RecipeFeaturesList = (props) => {
	
	const colClasses = "col-lg-3 col-6";

	return (
		<div className="row recipe__features">
			<div className={colClasses}>
				<RecipeFeature items={[{title: 'Nombre de parts', picto: FlatwareIcon}]} value={props.recipe.numberOfParts + ' ' + props.recipe.shareType} />
			</div>
			{props.recipe.preparationTime.length !== 0 && 
				<div className={colClasses}>
					<RecipeFeature items={[{title: 'Temps de préparation', picto: CuttingIcon}]} value={props.recipe.preparationTime.join('-') + ' min'} />
				</div>
			}
			{props.recipe.cookingTime.length !== 0 && 
				<div className={colClasses}>
					<RecipeFeature items={[{title: 'Temps de cuisson', picto: TimerIcon}]} value={props.recipe.cookingTime.join('-') + ' min'} />
				</div>
			}
			{props.recipe.restingTime.length !== 0 && 
				<div className={colClasses}>
					<RecipeFeature items={[{title: 'Temps de repos', picto: HourglassWaitIcon}]} value={props.recipe.restingTime.join('-') + ' min'} />
				</div>
			}
			{props.recipe.cookingTypes && 
				<div className={colClasses}>
					<RecipeFeature items={props.recipe.cookingTypes} />
				</div>
			}
			{props.recipe.heat && 
				<div className={colClasses}>
					<RecipeFeature items={[{title: 'Température', picto: HeatIcon}]} value={props.recipe.heat + '°C'} />
				</div>
			}
			{props.recipe.difficulty && 
				<div className={colClasses}>
					<RecipeFeature items={[{title: 'Difficultée ' + props.recipe.difficulty.title, picto: props.recipe.difficulty.picto}]} value={props.recipe.difficulty.title} />
				</div>
			}
			{props.recipe.priceIndicator && 
				<div className={colClasses}>
					<RecipeFeature items={[{title: 'Coût ' + props.recipe.priceIndicator.title, picto: props.recipe.priceIndicator.picto}]} value={props.recipe.priceIndicator.title} />
				</div>
			}
		</div>
)};

RecipeFeaturesList.propTypes = {
  	recipe: PropTypes.object.isRequired
};

RecipeFeaturesList.defaultProps = {};

export default RecipeFeaturesList;
