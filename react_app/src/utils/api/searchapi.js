import Api from "./api";

export default class SearchApi extends Api{
    constructor() {
        super();
        this.params = [];
    }

    /**
     * @param {string} ressource - The ressource to fetch 
     * @returns 
     */
    get = (ressource) => {
        return fetch(
            this.api_url + 
            ressource +
            '?_format=json' +
            this.paramsToQueryString()
        ).then(res => res.json());
    };

    addParam(field, value) {
        this.params.push(field + '=' + value);
    }

    paramsToQueryString() {
        return '&' + this.params.join('&');
    }
}