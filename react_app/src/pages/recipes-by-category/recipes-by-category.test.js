import  {render, screen } from '@testing-library/react';

import {rest} from "msw";
import {setupServer} from "msw/node";
import { BrowserRouter } from 'react-router-dom';
import { recipesUrl } from '../recipes/recipes.api';
import { mockRecipesData } from './recipes-by-category.data';
import { mockCategoriesData } from '../../blocks/menu/menu.data';
import { categoriesUrl } from '../../utils/api/common.api';
import RecipesByCategory from './recipes-by-category';


const recipesResponse = rest.get(process.env.REACT_APP_API_ENDPOINT + '/jsonapi' + recipesUrl, (req, res, ctx) => {
    return res(ctx.json(mockRecipesData));
});

const categoriesResponse = rest.get(process.env.REACT_APP_API_ENDPOINT + '/jsonapi' + categoriesUrl, (req, res, ctx) => {
    return res(ctx.json(mockCategoriesData))
})

const server = new setupServer(recipesResponse, categoriesResponse);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('should display the 9 items', async () => {
    render(<BrowserRouter><RecipesByCategory /></BrowserRouter>);

    const recipes = await screen.findAllByRole("article");

    expect(recipes).toHaveLength(9);
});

test('should have a "Sauce salsa roja !" item', async () => {
    render(<BrowserRouter><RecipesByCategory /></BrowserRouter>);

    const recipeItem = await screen.findByText("Sauce salsa roja !");

    expect(recipeItem).toBeVisible();
});