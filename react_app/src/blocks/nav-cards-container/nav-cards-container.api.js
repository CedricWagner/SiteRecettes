import JsonApi from "../../utils/api/jsonapi";

export const navCardsMenuUrl = "/menu_link_content/home-nav-cards";

export default function getNavCardsMenuItems() {
    const api = new JsonApi();
    
    api.params.addSort('weight');
    api.params.addInclude(['field_image']);
    
    return api.get(navCardsMenuUrl);
}