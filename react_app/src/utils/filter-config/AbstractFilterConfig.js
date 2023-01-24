export default class AbstractFilterConfig {

    /**
     * 
     * @param {string} title 
     * @param {string} slug 
     * @param {state} state 
     */
    constructor(title, slug, state) {
        if (this.constructor === AbstractFilterConfig) {
            throw new TypeError('Abstract class "AbstractConfig" cannot be instantiated directly');
        }
        this.title = title;
        this.slug = slug;
        this.values = state[0];
        this.setValues = state[1]
    }

    fetchValues(){
        throw new Error('You must implement this function');
    }

    isAutocomplete() {
        return false;
    }

}