import JsonApi from "../../utils/api/jsonapi";

export const mainMenuUrl = "/menu_link_content/main";

export default function getMainMenuItems() {
    const api = new JsonApi();

    api.params.addSort('weight');

    return api.get(mainMenuUrl);
}
