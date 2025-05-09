import JsonApi from "../../utils/api/jsonapi";

export const footerMenuUrl = "/menu_link_content/footer";

export default function getFooterMenuItems() {
    const api = new JsonApi();

    api.params.addSort('weight');

    return api.get(footerMenuUrl);
}
