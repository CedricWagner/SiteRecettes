import  {render, fireEvent, screen } from '@testing-library/react'
import SearchBar from "./search-bar";

test('should trigger "onSearch" function on submit', async () => {
    const onSearch = jest.fn();
    
    render(<SearchBar onSearch={onSearch}/>);
    
    const valueInput = screen.getByPlaceholderText(/Rechercher/i);
    fireEvent.change(valueInput, { target: { value: "Ma recherche" } });
    fireEvent.click(screen.getAllByRole("button")[1])

    expect(onSearch).toHaveBeenCalled();
});

test('should return the correct value on submit', async () => {
    let value = '';

    function onSearch(_value) {
        value = _value
    }
    
    render(<SearchBar onSearch={onSearch}/>);
    
    const valueInput = screen.getByPlaceholderText(/Rechercher/i);
    fireEvent.change(valueInput, { target: { value: "Ma recherche" } });
    fireEvent.click(screen.getAllByRole("button")[1])

    expect(value).toBe("Ma recherche");
});