import DOMPurify from "dompurify";

import Difficulty1Icon from '../../images/icons/svg/icon_difficulty-1.svg';
import Difficulty2Icon from '../../images/icons/svg/icon_difficulty-2.svg';
import Difficulty3Icon from '../../images/icons/svg/icon_difficulty-3.svg';
import Price1Icon from '../../images/icons/svg/icon_cost-1.svg';
import Price2Icon from '../../images/icons/svg/icon_cost-2.svg';
import Price3Icon from '../../images/icons/svg/icon_cost-3.svg';

/** 
 * Parse the uri returned by drupal into a relative url
 * 
 * @param string linkAttribute
 * @return string
 */
export function parseMenuLink(linkAttribute) {
    return linkAttribute.uri.replace('internal:', '');
}

function purifyHTML (dirtyHTML) {
    return DOMPurify.sanitize(dirtyHTML, {USE_PROFILES: { html: true }})
}

/** 
 * Parse the recipe from the drupal api into an object
 * 
 * @param object item
 * @return object
 */
export function parseRecipe(item) {
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

/** 
 * Parse the recipe from the drupal api into an full object
 * 
 * @param object item
 * @return object
 */
export function parseRecipeDetails(item) {
    let recipe = parseRecipe(item);
    recipe.description = purifyHTML(item.field_description?.processed);
    recipe.numberOfParts = item.field_number_of_parts;
    recipe.shareType = item.field_share_type?.name;
    recipe.preparationTime = item.field_preparation_time;
    recipe.cookingTime = item.field_cooking_time;
    recipe.restingTime = item.field_resting_time;
    if (Array.isArray(item.field_cooking_types)) {
        recipe.cookingTypes = item.field_cooking_types.map(term => { return {
            title: term.name,
            picto: process.env.REACT_APP_API_ENDPOINT + term.field_picto.uri.url
        }});
    }
    recipe.heat = item.field_heat;
    if (item.field_difficulty) {
        switch (item.field_difficulty) {
            case 1:
                recipe.difficulty = {
                    id: 1,
                    title: 'Facile',
                    picto: Difficulty1Icon
                }
                break;
            case 2:
                recipe.difficulty = {
                    id: 2,
                    title: 'Moyen',
                    picto: Difficulty2Icon
                }
                break;
            case 3:
                recipe.difficulty = {
                    id: 3,
                    title: 'Difficile',
                    picto: Difficulty3Icon
                }
                break;
            default:
                break;
        }
    }
    if (item.field_price_indicator) {
        switch (item.field_price_indicator) {
            case 1:
                recipe.priceIndicator = {
                    id: 1,
                    title: 'Économique',
                    picto: Price1Icon
                }
                break;
            case 2:
                recipe.priceIndicator = {
                    id: 2,
                    title: 'Moyen',
                    picto: Price2Icon
                }
                break;
            case 3:
                recipe.priceIndicator = {
                    id: 3,
                    title: 'Cher',
                    picto: Price3Icon
                }
                break;
            default:
                break;
        }
    }
    recipe.ingredientGroups = item.field_ingredient_groups.map(group => {
        return {
            title: group.field_title,
            ingredients: group.field_ingredient_lines.map(ingredientLine => {
                return {
                    name: ingredientLine.field_ingredient.title,
                    picto: ingredientLine.field_ingredient.field_picto.image_style_uri?.thumbnail,
                    amount: ingredientLine.field_amount,
                    details: ingredientLine.field_details,
                    unit: ingredientLine.field_unit.name
                }
            })
        }
    })
    

    return recipe;
}