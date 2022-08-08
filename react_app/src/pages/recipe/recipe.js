import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
			if (items.length != 1) {
				setNotFound(true);
				setRecipe(false);
				return false;
			}
			setRecipe(parseRecipeDetails(items[0]));
		});
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
