import  {fireEvent, render, screen, waitFor } from '@testing-library/react'
import SearchFilters from "./search-filters";

import {rest} from "msw";
import {setupServer} from "msw/node";
import { mockCategoriesData } from '../menu/menu.data';
import { categoriesUrl, fieldConfigUrl } from '../../utils/api/common.api';
import { cookingTypesUrl } from '../../utils/api/common.api';
import { BrowserRouter } from 'react-router-dom';
import { emptyResponse } from '../../utils/api/mocks/emptyResponse';

// TODO: factorise this (doubloon with menu.test)
const categoriesResponse = rest.get(process.env.REACT_APP_API_ENDPOINT + '/jsonapi' + categoriesUrl, (req, res, ctx) => {
    return res(ctx.json(mockCategoriesData))
})

const cookingTypesResponse = rest.get(process.env.REACT_APP_API_ENDPOINT + '/jsonapi' + cookingTypesUrl, (req, res, ctx) => {
    return res(ctx.json(emptyResponse))
})

const fieldConfigResponse = rest.get(process.env.REACT_APP_API_ENDPOINT + '/jsonapi' + fieldConfigUrl, (req, res, ctx) => {
    return res(ctx.json(emptyResponse))
})

const server = new setupServer(categoriesResponse, cookingTypesResponse, fieldConfigResponse);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("search filter should have 'Sans Gluten' item", async () => {
    render(<BrowserRouter><SearchFilters updateSelectedFilters={jest.fn()} /></BrowserRouter>)

    const sansGlutenItem = await screen.findByText("Sans-Gluten");

    expect(sansGlutenItem).toBeVisible();
})

test("it should call the update function on click on an item", async () => {
    const updateSelectedFilters = jest.fn();
    
    render(<BrowserRouter><SearchFilters updateSelectedFilters={updateSelectedFilters} /></BrowserRouter>)

    const sansGlutenFilter = await screen.findByText('Sans-Gluten');

    fireEvent.click(sansGlutenFilter);

    expect(updateSelectedFilters).toHaveBeenCalledTimes(2); // 2 = init + click
})

test("it should have 2 values selected when 2 values are selected across different filters", async () => {
    let filters = [];
    
    const updateSelectedFilters = (selectedFilters) => {
        filters = selectedFilters
    }
    
    render(<BrowserRouter><SearchFilters updateSelectedFilters={updateSelectedFilters} /></BrowserRouter>)

    const sansGlutenFilter = await screen.findByText('Sans-Gluten');
    const recetteFilter = screen.getByText('Recettes');

    fireEvent.click(sansGlutenFilter);
    fireEvent.click(recetteFilter);

    await waitFor(() => expect(filters).toEqual({
        "category_uuid": ["5d58e163-fd22-4dac-9d2c-bbf649426d55"], 
        "type": ["recipe"]
    }));
})