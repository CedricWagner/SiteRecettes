import Api from "./api";
import {DrupalJsonApiParams} from 'drupal-jsonapi-params';

export default class JsonApi extends Api{
    constructor() {
        super();
        this.params = new DrupalJsonApiParams();
    }

    /**
     * @param {string} ressource - The ressource to fetch 
     * @returns 
     */
    get = (ressource) => {
        return fetch(
            this.api_url + 
            '/jsonapi' + 
            ressource +
            '?' +
            this.params.getQueryString() +
            '&jsonapi_include=1'
        ).then(res => res.json()).then(res => res.data);
    };

    /**
     * @param {string} ressource - The ressource to fetch 
     * @returns 
     */
    fetch = (ressource) => {
        return fetch(
            this.api_url + 
            '/jsonapi' + 
            ressource +
            '?' +
            this.params.getQueryString() +
            '&jsonapi_include=1'
        ).then(res => res.json());
    };

    /**
     * 
     * @param {string} key - the key of the field to query 
     * @param {string[]} values - the values as array
     * @param {string} group - the parent group
     */
    addAndFilterParam (key, values, group) {
        values.map((value, index) => {
            const subGroup = 'grp_' + key + '--' + index;
            this.params.addGroup(subGroup, 'AND', group);
            this.params.addFilter(key, value, '=', subGroup);
            return true;
        })
    }
    
    /**
     * 
     * @param {string} key - the key of the field to query 
     * @param {string[]} values - the values as array
     * @param {string} group - the parent group
     */
    addOrFilterParam (key, values, group) {
        this.params.addFilter(key, values, 'IN', group);
    }
}