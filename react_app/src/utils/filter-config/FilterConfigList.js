import AbstractFilterConfig from "./AbstractFilterConfig"; // eslint-disable-line no-unused-vars

export default class FilterConfigList {

    constructor() {
        this.filters = [];
    }

    /**
     * 
     * @param {AbstractFilterConfig} filter 
     */
    add(filter) {
        this.filters.push(filter);
    }

    /**
     * 
     * @returns { AbstractFilterConfig[] }
     */
    getFilters() {
        return this.filters;
    }

}