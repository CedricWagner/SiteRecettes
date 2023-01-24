import AbstractFilterConfig from "./AbstractFilterConfig";

export default class AbstractAutocompleteFilterConfig extends AbstractFilterConfig {

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
        throw new Error('You must implement this function');
    }

    isAutocomplete() {
        return true;
    }
}