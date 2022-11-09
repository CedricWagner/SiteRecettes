import AbstractFilterConfig from "./AbstractFilterConfig"; 

export default class FilterConfigList {

    constructor() {
        this.filters = [];
    }

    /**
     * 
     * @param {AbstractFilterConfig} filter 
     */
    add(filter) {
        if (filter instanceof AbstractFilterConfig === true) {
            this.filters.push(filter);
        } else {
            throw new TypeError("Filter should be an instance of AbstractFilterConfig");
        }
    }

    /**
     * 
     * @returns { AbstractFilterConfig[] }
     */
    getFilters() {
        return this.filters;
    }

}