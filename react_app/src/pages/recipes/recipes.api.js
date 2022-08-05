import JsonApi from "../../utils/api/jsonapi";

export const recipesUrl = "/node/recipe";

export default function getRecipes(sort="-created", count=12, offset=0, activeFilters=[]) {
    const api = new JsonApi();
    const filters = [
        'sort=' + sort,
        'page[limit]=' + count,
        'page[offset]=' + offset,
        'filter[status][value]=1',
        // includes
        'include=field_image,field_categories',
    ];
    if (activeFilters.length > 0) {
        filters.push('filter[season][condition][path]=field_categories.id');
        filters.push('filter[season][condition][operator]=IN');
    }
    activeFilters.forEach(id => {
        filters.push('filter[season][condition][value][]=' + id)
    })
    
    return api.get(recipesUrl, filters);
}
