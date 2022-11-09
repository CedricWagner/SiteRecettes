import AbstractFilterConfig from "./AbstractFilterConfig";

export default class CustomFilterConfig extends AbstractFilterConfig {

    /**
     * 
     * @param {string} title 
     * @param {string} slug 
     * @param {state} state 
     * @param {function} fetchCallback 
     */
    constructor(title, slug, state, fetchCallback) {
        super(title, slug, state);
        this.fetchCallback = fetchCallback;
    }
    
    /**
     * 
     * @returns {Promise}  
     */
    fetchValues() {
        return this.setValues(this.fetchCallback());
    }
}