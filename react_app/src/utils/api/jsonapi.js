import Api from "./api";

export default class JsonApi extends Api{
    get = (ressource, options = []) => {
        return fetch(
            this.api_url + 
            '/jsonapi' + 
            ressource +
            (options.map((option, key) => (key=== 0 ? '?' : '&') + option)).join('')
        ).then(res => res.json()).then(res => res.data);
    };
}