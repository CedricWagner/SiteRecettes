import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import IngredientsList from '../../blocks/ingredients-list/ingredients-list';
import RecipeFeaturesList from '../../blocks/recipe-features-list/recipe-features-list';
import CategoryList from '../../components/category-list/category-list';
import Loader from '../../components/loader/loader';
import { parseRecipeDetails } from '../../utils/api/helpers';
import getRecipeByAlias from './recipe.api';
import './recipe.scss';


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
					{/* <-- Head */}
					<div className="row recipe__head">
						<div className="col">
							<CategoryList categories={recipe.taxonomies} />
							<h1 className="recipe__title text-center">{recipe.title}</h1>

							<div className="recipe__description" dangerouslySetInnerHTML={{ __html: recipe.description }}></div>

							<RecipeFeaturesList recipe={recipe}/>
						</div>
						{recipe.image && 
							<div className="col-md-4">
								<img src={recipe.image} alt={recipe.title} className="recipe__image" />
							</div>
						}
					</div>
					{/* Head --/> */}
					{/* <-- Ingredients & Steps */}
					<div className="row">
						<div className="col-md-4">
							<h2>Ingrédients</h2>
							<IngredientsList ingredients={recipe.ingredientGroups} />
						</div>
						<div className="col-md-8"></div>
					</div>
					{/* Ingredients & Steps --/> */}
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
