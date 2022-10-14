// import SearchApi from "../../utils/api/searchapi";
import JsonApi from "../../utils/api/jsonapi";

export const searchUrl = "/index/full_search";

export function getSearchResults(text, filters) {
    const api = new JsonApi();
    
    api.params.addFilter('fulltext', text);
    api.params.addInclude(['field_image']);

    if (filters) {
        for (const [key, values] of Object.entries(filters)) {
            if (values.length) {
                api.params.addFilter(key, values, 'IN');
            }
        }
    }
    
    
    return api.get(searchUrl);
}