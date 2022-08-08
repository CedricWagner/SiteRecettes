import JsonApi from "./jsonapi";

export const categoriesUrl = "/taxonomy_term/recipe_category";

export function getCategories() {
    const api = new JsonApi();
    api.params.addSort('weight')
    api.params.addSort('name')
    return api.get(categoriesUrl);
}