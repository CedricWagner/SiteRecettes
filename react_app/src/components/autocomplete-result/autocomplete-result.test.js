import  {fireEvent, render, screen } from '@testing-library/react'
import AutocompleteResult from "./autocomplete-result";

const items = [
    {
        id: "item1",
        title: "Item 1"
    },
    {
        id: "item2",
        title: "Item 2"
    },
];

test("it should have the correct count of items", () => {
    render(<AutocompleteResult items={items} onSelect={() => {}}/>);

    const listItems = screen.getAllByRole("listitem");

    expect(listItems.length).toEqual(2);
})

test("it should select the item on click", () => {

    let selectedId = null;
    const mockOnSelect = (id) => {
        selectedId = id;
    }

    render(<AutocompleteResult items={items} onSelect={mockOnSelect}/>);
    
    const item1Button = screen.getByText("Item 2");
    fireEvent.click(item1Button);

    expect(selectedId).toEqual("item2");
})