import { searchUrl } from "../../pages/search-result/search-result.api";
import JsonApi from "../../utils/api/jsonapi";

export default function getSeasonalRecipes(monthNumber, count) {
    const api = new JsonApi();

    api.params.addFilter('field_season_months_number', monthNumber, '=');
    api.params.addPageLimit(count);
    api.params.addInclude(['field_image', 'field_categories']);

    return api.get(searchUrl);
}