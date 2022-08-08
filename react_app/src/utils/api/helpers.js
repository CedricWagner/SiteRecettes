import DOMPurify from "dompurify";

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
    

    return recipe;
}