import  {render, fireEvent, screen } from '@testing-library/react';
import SearchInput from "./search-input";

test("it should return the new value when a character is entered", () => {
    let value = "";
    const mockOnChange = (_value) => {
        value = _value;
    }
    render(<SearchInput onChange={mockOnChange} defaultValue="Tomate"/>);

    const valueInput = screen.getByPlaceholderText(/Rechercher/i);
    fireEvent.change(valueInput, { target: {value: "Navet"}})

    expect(value).toBe("Navet");
});

test("it should erase the input value on click on the erase button", async () => {
    let value = "Tomate";
    const mockOnChange = (_value) => {
        value = _value;
    }
    render(<SearchInput onChange={mockOnChange} defaultValue={value} displayEraseButton={true}/>);

    const eraseButton = screen.getAllByRole("button")[0];
    fireEvent.click(eraseButton);

    expect(value).toBe("");
});