import JsonApi from "../api/jsonapi";
import AbstractFilterConfig from "./AbstractFilterConfig";

export default class TaxonomyFilterConfig extends AbstractFilterConfig {

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
    fetchValues() {
        const api = new JsonApi();
        api.params.addSort('weight')
        api.params.addSort('name')
        return api.get("/taxonomy_term/" + this.ressource).then((items) => 
        {
            this.setValues(items.map((item) => {
                return {
                    title: item.name,
                    id: item.id
                }}
        ))});
    }
}