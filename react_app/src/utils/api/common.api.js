import JsonApi from "./jsonapi";

export const categoriesUrl = "/taxonomy_term/recipe_category";
export const cookingTypesUrl = "/taxonomy_term/cooking_type";
export const tagsUrl = "/taxonomy_term/tags";

export function getCategories() {
    const api = new JsonApi();
    api.params.addSort('weight')
    api.params.addSort('name')
    return api.get(categoriesUrl);
}

export function getTags() {
    const api = new JsonApi();
    api.params.addSort('weight')
    api.params.addSort('name')
    return api.get(tagsUrl);
}