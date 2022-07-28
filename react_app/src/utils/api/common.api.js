import JsonApi from "./jsonapi";

export const categoriesUrl = "/taxonomy_term/recipe_category";

export function getCategories() {
    const api = new JsonApi();
    return api.get(categoriesUrl, [
        'sort[sort-weight][path]=weight',
        'sort[sort-name][path]=name',
    ]);
}