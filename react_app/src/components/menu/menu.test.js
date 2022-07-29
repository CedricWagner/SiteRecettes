import  {render, screen } from '@testing-library/react'
import Menu from "./menu";

import {rest} from "msw";
import {setupServer} from "msw/node";
import { BrowserRouter } from 'react-router-dom';
import { mainMenuUrl } from './menu.api';
import { mockCategoriesData, mockMenuData } from './menu.data';
import { categoriesUrl } from '../../utils/api/common.api';

const menuResponse = rest.get(process.env.REACT_APP_API_ENDPOINT + '/jsonapi' + mainMenuUrl, (req, res, ctx) => {
    return res(ctx.json(mockMenuData))
})

const categoriesResponse = rest.get(process.env.REACT_APP_API_ENDPOINT + '/jsonapi' + categoriesUrl, (req, res, ctx) => {
    return res(ctx.json(mockCategoriesData))
})

const server = new setupServer(menuResponse, categoriesResponse);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("it should have the \"Recette\" menu item", async () => {
    render(<BrowserRouter><Menu /></BrowserRouter>)

    const recetteItem = await screen.findByText("Les Articles");

    expect(recetteItem).toBeVisible();
})

test("it should not render disabled items", async () => {
    render(<BrowserRouter><Menu /></BrowserRouter>)

    const links = await screen.findAllByRole('link');

    expect(links).toHaveLength(5)
})

test("it should have the \"Sans-Gluten\" submenu item", async () => {
    render(<BrowserRouter><Menu /></BrowserRouter>)

    const sansGlutenItem = await screen.findByText("Sans-Gluten");

    expect(sansGlutenItem).toBeVisible();
})
