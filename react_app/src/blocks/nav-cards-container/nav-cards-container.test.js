import  {render, screen } from '@testing-library/react'
import NavCardsContainer from "./nav-cards-container";

import {rest} from "msw";
import {setupServer} from "msw/node";
import { BrowserRouter } from 'react-router-dom';
import { mockNavCardsMenuData } from './nav-cards-container.data';
import { navCardsMenuUrl } from './nav-cards-container.api';

const menuResponse = rest.get(process.env.REACT_APP_API_ENDPOINT + '/jsonapi' + navCardsMenuUrl, (req, res, ctx) => {
    return res(ctx.json(mockNavCardsMenuData))
})

const server = setupServer(menuResponse);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("it should have the \"Nos Recettes\" menu item", async () => {
    render(<BrowserRouter><NavCardsContainer /></BrowserRouter>)

    const recetteItem = await screen.findByText("Nos Recettes");

    expect(recetteItem).toBeVisible();
})

test("it should not render disabled items", async () => {
    render(<BrowserRouter><NavCardsContainer /></BrowserRouter>)

    const links = await screen.findAllByRole('link');

    expect(links).toHaveLength(3)
})