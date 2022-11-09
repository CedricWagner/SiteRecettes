import { fieldConfigUrl } from "../api/common.api";
import JsonApi from "../api/jsonapi";
import AbstractFilterConfig from "./AbstractFilterConfig";

export default class ValueListFilterConfig extends AbstractFilterConfig {

    /**
     * 
     * @returns {Promise}  
     */
    fetchValues() {
        const api = new JsonApi();
        api.params.addFilter('field_name', this.slug)
        return api.get(fieldConfigUrl).then((res) => 
        {
            if (res.length !== 1) {
                return [];
            }
            const allowedValues = res[0].settings.allowed_values
            this.setValues(Object.keys(allowedValues).map((key) => {
                return {
                    title: allowedValues[key],
                    id: key
                }}
        ))});
    }
}