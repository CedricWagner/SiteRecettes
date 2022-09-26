import SearchApi from "../../utils/api/searchapi";

export const searchUrl = "/api/global-search";

export function getSearchResults(value) {
    const api = new SearchApi();

    api.addParam("search_api_fulltext", value);
    return api.get(searchUrl);
}