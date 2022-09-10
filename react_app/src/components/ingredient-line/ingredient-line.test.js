import  {fireEvent, render, screen } from '@testing-library/react'
import IngredientLine from "./ingredient-line";
import PlaceholderPicto from "../../images/showcase-ingredient.png";


test("it should display an image if any", async () => {
    render(
        <>
            <IngredientLine amount='5' name='Sel' details="Gros sel" unit='g'/>
            <IngredientLine amount='1' name='Noix de coco' unit='unité' picto={PlaceholderPicto}/>
        </>
    )

    const ingredientImages = await screen.findAllByRole("img");

    expect(ingredientImages.length).toEqual(1)
});

test("it should not be checked at render", async () => {
    render(<IngredientLine amount='1' name='Noix de coco' unit='unité' picto={PlaceholderPicto}/>)

    const ingredientLine = await screen.findByRole("listitem");

    expect(ingredientLine).not.toHaveClass('ingredient-line--checked'); 
});

test("it should be checked on click", async () => {
    render(<IngredientLine amount='1' name='Noix de coco' unit='unité' picto={PlaceholderPicto}/>)

    const ingredientLine = await screen.findByRole("listitem");

    fireEvent.click(ingredientLine);

    expect(ingredientLine).toHaveClass('ingredient-line--checked'); 
});