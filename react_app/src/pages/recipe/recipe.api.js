import JsonApi from "../../utils/api/jsonapi";
import { recipesUrl } from "../recipes/recipes.api";

export default function getRecipeByAlias(alias) {
    const api = new JsonApi();

    api.params.addPageLimit(1);
    api.params.addPageOffset(0);
    api.params.addFilter('field_path', alias);
    api.params.addInclude([
        'field_image', 
        'field_categories', 
        'field_share_type', 
        'field_cooking_types', 
        'field_cooking_types.field_picto',
        'field_ingredient_groups',
        'field_ingredient_groups.field_ingredient_lines',
        'field_ingredient_groups.field_ingredient_lines.field_ingredient',
        'field_ingredient_groups.field_ingredient_lines.field_ingredient.field_picto',
        'field_ingredient_groups.field_ingredient_lines.field_unit',
        'field_tags',
        'field_images',
    ]);

    return api.get(recipesUrl);
}
