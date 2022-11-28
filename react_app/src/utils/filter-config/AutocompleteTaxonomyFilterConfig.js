import JsonApi from "../api/jsonapi";
import AbstractAutocompleteFilterConfig from "./AbstractAutocompleteFilterConfig";

export default class AutocompleteTaxonomyFilterConfig extends AbstractAutocompleteFilterConfig {
    /**
     * 
     * @returns {Promise}  
     */
    autocompleteCallback(ressource, text="") {
        const api = new JsonApi();
        api.params.addSort('weight')
        api.params.addSort('name')
        api.params.addFilter('name', text, 'CONTAINS')
        api.params.addPageLimit(10)
        return api.get("/taxonomy_term/" + ressource).then((items) => 
        {
            return (items.map((item) => {
                return {
                    title: item.name,
                    id: item.id
                }}
        ))});
    }
}