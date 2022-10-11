import SearchApi from "../../utils/api/searchapi";

export const searchUrl = "/api/global-search";

export function getSearchResults(text, filters) {
    const api = new SearchApi();
    
    api.addParam("search_api_fulltext", text);
    
    if (filters) {
        for (const [key, value] of Object.entries(filters)) {
            if (value && value.length) {
                api.addParam(key, value);
            }
        }
    }
    
    
    return api.get(searchUrl);
}