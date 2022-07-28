import Api from "../../utils/api/api";

export const mainMenuUrl = "/api/menu_items/main";

export default function getMenuItems() {
    const api = new Api();
    return api.get(mainMenuUrl);
}