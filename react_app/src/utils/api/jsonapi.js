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
}