import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CategoryList from '../../components/category-list/category-list';
import Loader from '../../components/loader/loader';
import RecipeFeature from '../../components/recipe-feature/recipe-feature';
import { parseRecipeDetails } from '../../utils/api/helpers';
import getRecipeByAlias from './recipe.api';
import './recipe.scss';

import FlatwareIcon from '../../images/icons/svg/icon_flatware.svg';
import TimerIcon from '../../images/icons/svg/icon_timer.svg';
import CuttingIcon from '../../images/icons/svg/icon_cutting.svg';
import HourglassWaitIcon from '../../images/icons/svg/icon_hourglass-wait.svg';
import HeatIcon from '../../images/icons/svg/icon_heat.svg';

const Recipe = () => {
	
	let params = useParams();
	const [recipe, setRecipe] = useState(false);
	const [isNotFound, setNotFound] = useState(false);
  
	useEffect(() => {
		getRecipeByAlias('/recette/' + params.recipeSlug).then((items) => {
			if (items.length !== 1) {
				setNotFound(true);
				setRecipe(false);
				return false;
			}
			setRecipe(parseRecipeDetails(items[0]));
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className="container">
			{recipe && 
				<div className="recipe">
					<div className="row">
						<div className="col">
							<CategoryList categories={recipe.taxonomies} />
							<h1 className="recipe__title text-center">{recipe.title}</h1>

							<p className="recipe__description" dangerouslySetInnerHTML={{ __html: recipe.description }}></p>

							<div className="row recipe__features">
                        		<div className="col-md-3">
									<RecipeFeature items={[{title: 'Nombre de parts', picto: FlatwareIcon}]} value={recipe.numberOfParts + ' ' + recipe.shareType} />
								</div>
                        		<div className="col-md-3">
									<RecipeFeature items={[{title: 'Temps de préparation', picto: CuttingIcon}]} value={recipe.preparationTime.join('-') + ' min'} />
								</div>
                        		<div className="col-md-3">
									<RecipeFeature items={[{title: 'Temps de cuisson', picto: TimerIcon}]} value={recipe.cookingTime.join('-') + ' min'} />
								</div>
                        		<div className="col-md-3">
									<RecipeFeature items={[{title: 'Temps de repos', picto: HourglassWaitIcon}]} value={recipe.restingTime.join('-') + ' min'} />
								</div>
								{recipe.cookingTypes && 
									<div className="col-md-3">
										<RecipeFeature items={recipe.cookingTypes} />
									</div>
								}
                        		{recipe.heat && 
									<div className="col-md-3">
										<RecipeFeature items={[{title: 'Température', picto: HeatIcon}]} value={recipe.heat + '°C'} />
									</div>
								}
							</div>
						</div>
						{recipe.image && 
							<div className="col-md-4">
								<img src={recipe.image} alt={recipe.title} className="recipe__image" />
							</div>
						}
					</div>
				</div>
			}
			{!recipe && !isNotFound && 
				<div className="text-center">
					<Loader />
				</div>
			}
			{isNotFound && 
				<p>Recette introuvable... <Link to="/recettes">Retourner à la liste des recettes</Link></p>
			}
		</div>
)};

export default Recipe;
