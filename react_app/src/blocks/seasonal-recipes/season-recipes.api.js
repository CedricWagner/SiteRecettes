import JsonApi from "../../utils/api/jsonapi";

export const seasonalRecipesUrl = "/node/recipe";

export default function getSeasonalRecipes(monthNumber, count) {
    const api = new JsonApi();
    return api.get(seasonalRecipesUrl, [
        // filter by season
        'filter[season][condition][path]=field_seasons.field_months.field_number',
        'filter[season][condition][operator]=%3D', // encoded "="
        'filter[season][condition][value]=' + monthNumber,
        // filter status
        'filter[status][value]=1',
        // limit
        'page[limit]=' + count,
        // includes
        'include=field_image,field_categories',
    ]);
}