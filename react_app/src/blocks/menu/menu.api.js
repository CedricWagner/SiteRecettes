import JsonApi from "../../utils/api/jsonapi";

export const mainMenuUrl = "/menu_link_content/main";

export default function getMainMenuItems() {
    const api = new JsonApi();

    api.params.addSort('weight');
    api.params.addInclude('field_picto');

    return api.get(mainMenuUrl);
}
