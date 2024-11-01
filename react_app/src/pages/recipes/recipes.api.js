import JsonApi from "../../utils/api/jsonapi";

export const recipesUrl = "/node/recipe";

export default function getRecipes(sort="-created", count=12, offset=0, activeFilters=[], fieldName="field_categories") {
    const api = new JsonApi();

    api.params.addSort(sort);
    api.params.addPageLimit(count);
    api.params.addPageOffset(offset);
    api.params.addFilter('status', '1');
    api.params.addInclude(['field_image', fieldName]);

    activeFilters.forEach((id, index) => {
        api.params.addGroup(fieldName + '-' + index, 'AND');
        api.params.addFilter(fieldName + '.id', id, 'IN', fieldName + '-' + index);
    })

    return api.get(recipesUrl);
}
