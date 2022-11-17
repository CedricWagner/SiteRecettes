import JsonApi from "../api/jsonapi";
import AbstractFilterConfig from "./AbstractFilterConfig";

export default class AutocompleteTaxonomyFilterConfig extends AbstractFilterConfig {

    /**
     * 
     * @param {string} title 
     * @param {string} slug 
     * @param {state} state 
     * @param {string} ressource 
     */
    constructor(title, slug, state, ressource) {
        super(title, slug, state);
        this.ressource = ressource;
    }

    /**
     * 
     * @returns {Promise}  
     */
    autocompleteCallback(ressource, text="") {
        const api = new JsonApi();
        api.params.addSort('weight')
        api.params.addSort('name')
        api.params.addFilter('name', text, 'STARTS_WITH')
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

    isAutocomplete() {
        return true;
    }
}