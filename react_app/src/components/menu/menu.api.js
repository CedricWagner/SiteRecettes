import JsonApi from "../../utils/api/jsonapi";

export const mainMenuUrl = "/menu_link_content/main";

export default function getMainMenuItems() {
    const api = new JsonApi();
    return api.get(mainMenuUrl, ['sort=weight']);
}

/** 
 * Parse the uri returned by drupal into a relative url
 * 
 * @param string linkAttribute
 * @return string
 */
export function parseMenuLink(linkAttribute) {
    return linkAttribute.uri.replace('internal:', '');
}