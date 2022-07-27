import Api from "../../utils/api";

export default function getMenuItems() {
    const api = new Api();
    return api.get("/api/menu_items/main");
}