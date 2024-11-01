export default class Api {
    constructor() {
        this.api_url = process.env.REACT_APP_API_ENDPOINT;
    }
    get = (ressource, addFormat=true) => {
        return fetch(this.api_url + ressource + (addFormat ? "?_format=json" : "")).then(res => res.json());
    };
}
