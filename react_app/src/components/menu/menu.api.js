import JsonApi from "../../utils/api/jsonapi";

export const mainMenuUrl = "/menu_link_content/main";

export default function getMainMenuItems() {
    const api = new JsonApi();
    return api.get(mainMenuUrl, ['sort=weight']);
}
