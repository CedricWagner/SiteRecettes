import  {render, screen } from '@testing-library/react'
import Menu from "./menu";

import {rest} from "msw";
import {setupServer} from "msw/node";
import { BrowserRouter } from 'react-router-dom';
import { mainMenuUrl } from './menu.api';
import { mockMenuData } from './menu.data';

const menuResponse = rest.get(process.env.REACT_APP_API_ENDPOINT + mainMenuUrl, (req, res, ctx) => {
    return res(ctx.json(mockMenuData))
})

const server = new setupServer(menuResponse);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("it should have the \"Recette\" menu item", async () => {
    render(<BrowserRouter><Menu /></BrowserRouter>)

    const recetteItem = await screen.findByText("Nos Recettes");

    expect(recetteItem).toBeVisible();
})
