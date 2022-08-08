import JsonApi from "../../utils/api/jsonapi";

export const seasonalRecipesUrl = "/node/recipe";

export default function getSeasonalRecipes(monthNumber, count) {
    const api = new JsonApi();

    api.params.addFilter('status', '1');
    api.params.addFilter('field_seasons.field_months.field_number', monthNumber, '=');
    api.params.addPageLimit(count);
    api.params.addInclude(['field_image', 'field_categories']);

    return api.get(seasonalRecipesUrl);
}