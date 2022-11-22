import JsonApi from "../api/jsonapi";
import AbstractAutocompleteFilterConfig from "./AbstractAutocompleteFilterConfig";

export default class AutocompleteTaxonomyFilterConfig extends AbstractAutocompleteFilterConfig {

    /**
     * 
     * @returns {Promise}  
     */
    autocompleteCallback(ressource, text="") {
        const api = new JsonApi();
        api.params.addSort('title')
        api.params.addFilter('title', text, 'STARTS_WITH')
        api.params.addPageLimit(10)
        return api.get("/node/" + ressource).then((items) => 
        {
            return (items.map((item) => {
                return {
                    title: item.title,
                    id: item.id
                }}
        ))});
    }
}