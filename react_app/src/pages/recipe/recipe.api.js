import JsonApi from "../../utils/api/jsonapi";
import { recipesUrl } from "../recipes/recipes.api";

export default function getRecipeByAlias(alias) {
    const api = new JsonApi();

    api.params.addPageLimit(1);
    api.params.addPageOffset(0);
    api.params.addFilter('field_path', alias);
    api.params.addInclude(['field_image', 'field_categories']);

    return api.get(recipesUrl);
}
