import JsonApi from "../../utils/api/jsonapi";

export const recipesUrl = "/node/recipe";

export default function getRecipes(sort="-created", count=12, offset=0, activeFilters=[]) {
    const api = new JsonApi();

    api.params.addSort(sort);
    api.params.addPageLimit(count);
    api.params.addPageOffset(offset);
    api.params.addFilter('status', '1');
    api.params.addInclude(['field_image', 'field_categories']);

    activeFilters.forEach((id, index) => {
        api.params.addGroup('category-' + index, 'AND');
        api.params.addFilter('field_categories.id', id, 'IN', 'category-' + index);
    })

    return api.get(recipesUrl);
}
