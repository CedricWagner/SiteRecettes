import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import IngredientsList from '../../blocks/ingredients-list/ingredients-list';
import RecipeFeaturesList from '../../blocks/recipe-features-list/recipe-features-list';
import CategoryList from '../../components/category-list/category-list';
import Loader from '../../components/loader/loader';
import PhotoGallery from '../../components/photo-gallery/photo-gallery';
import QuantityControl from '../../components/quantity-control/quantity-control';
import Step from '../../components/step/step';
import TagList from '../../components/tag-list/tag-list';
import { parseRecipeDetails } from '../../utils/api/helpers';
import { QuantityContext } from '../../utils/contexts/quantity';
import getRecipeByAlias from './recipe.api';
import './recipe.scss';


const Recipe = () => {
	
	let params = useParams();
	const [recipe, setRecipe] = useState(false);
	const [isNotFound, setNotFound] = useState(false);
	const [quantity, setQuantity] = useState({
		initial: 0,
		current: 0
	});

	function updateQuantity(newValue) {
		setQuantity({
			initial: quantity.initial,
			current: newValue
		});
	}
  
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

	useEffect(() => {
		// init quantity
		const numberOfParts = recipe.numberOfParts ? recipe.numberOfParts : 1;
		setQuantity({
			initial: numberOfParts,
			current: numberOfParts,
		});
	}, [recipe])

	return (
		<div className="container">
			<QuantityContext.Provider value={[quantity, setQuantity]}>
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
								<div className="col-lg-4 col-md-6 text-center">
									<img src={recipe.image} alt={recipe.title} className="recipe__image" />
								</div>
							}
							<div className="recipe__description--mobile" dangerouslySetInnerHTML={{ __html: recipe.description }}></div>
						</div>
						{/* Head --/> */}
						{/* <-- Ingredients & Steps */}
						<div className="row mb-4">
							<div className="col-md-4">
								<div className="row mb-4">
									<div className="col-lg-6 col">
										<h2 className="mb-2">Ingrédients</h2>
									</div>
									<div className="col">
										{quantity.current && 
											<QuantityControl current={quantity.current} unity={recipe.shareType} onUpdateQuantity={updateQuantity}/>
										}
									</div>
								</div>
								<IngredientsList ingredients={recipe.ingredientGroups} />
							</div>
							<div className="col-md-8">
								<h2>Étapes</h2>
								<ol className="recipe__steps">
									{recipe.steps.map((step, key) =>
										<Step key={key} text={step}/>
									)}
								</ol>
							</div>
						</div>
						{/* Ingredients & Steps --/> */}
						{/* <-- Remarks & tags */}
						<div className="row mb-5">
							{recipe.remark && 
								<div className="col-12">
									<h2>Remarques</h2>
									<div dangerouslySetInnerHTML={{ __html: recipe.remark }}></div>
								</div>
							}
							<div className="col-12">
								<TagList tags={recipe.tags}/>
							</div>
						</div>
						{/* Remarks & tags --/> */}
						{/* <-- Photo gallery */}
						{recipe.images && recipe.images.length > 0 &&
							<div className="row">
								<div className="col-12">
									<h2>Galerie photo</h2>
									<PhotoGallery images={recipe.images}/>
								</div>
							</div>
						}
						{/* Photo gallery --/> */}
					</div>
				}
				{!recipe && !isNotFound && 
					<div className="text-center">
						<Loader />
					</div>
				}
				{isNotFound && 
					<p>Recette introuvable... <Link to="/categories">Retourner à la liste des recettes</Link></p>
				}
			</QuantityContext.Provider>
		</div>
)};

export default Recipe;
