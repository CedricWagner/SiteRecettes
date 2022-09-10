import  {fireEvent, render, screen } from '@testing-library/react'
import Step from "./step";

test("it should not be checked at render", async () => {
    render(<Step text='Boil some water' />);

    const stepLine = await screen.findByRole("listitem");

    expect(stepLine).not.toHaveClass('step--checked'); 
});

test("it should be checked on click", async () => {
    render(<Step text='Boil some water' />);

    const stepLine = await screen.findByRole("listitem");

    fireEvent.click(stepLine);

    expect(stepLine).toHaveClass('step--checked'); 
});