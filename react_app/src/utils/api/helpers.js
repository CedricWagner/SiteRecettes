/** 
 * Parse the uri returned by drupal into a relative url
 * 
 * @param string linkAttribute
 * @return string
 */
export function parseMenuLink(linkAttribute) {
    return linkAttribute.uri.replace('internal:', '');
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