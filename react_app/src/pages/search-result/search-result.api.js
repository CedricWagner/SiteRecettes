// import SearchApi from "../../utils/api/searchapi";
import JsonApi from "../../utils/api/jsonapi";
import { filtersConfig } from "./search-result.config";

export const searchUrl = "/index/full_search";

export function getSearchResults(text, filters, count=20, offset=0) {
    const api = new JsonApi();
    
    api.params.addFilter('fulltext', text);
    api.params.addPageLimit(count);
    api.params.addPageOffset(offset);
    api.params.addInclude(['field_image']);

    if (filters) {
        for (const [key, values] of Object.entries(filters)) {
            if (values.length) {
                const group = 'grp_' + key;
                api.params.addGroup(group, 'AND');
                if (filtersConfig[key].operator === 'OR') {
                    api.addOrFilterParam(key, values, group);
                } else {
                    api.addAndFilterParam(key, values, group)
                }
            }
        }
    }
    
    return api.fetch(searchUrl);
}