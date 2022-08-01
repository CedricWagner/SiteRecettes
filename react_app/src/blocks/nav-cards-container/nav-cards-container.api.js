import JsonApi from "../../utils/api/jsonapi";

export const navCardsMenuUrl = "/menu_link_content/home-nav-cards";

export default function getNavCardsMenuItems() {
    const api = new JsonApi();
    return api.get(navCardsMenuUrl, ['sort=weight', 'include=field_image']);
}