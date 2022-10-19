import  {render, fireEvent, screen } from '@testing-library/react';
import SearchFilter from "./search-filter";

const filterItems = [
    {
        id: 'recipe',
        title: "Recettes",
    },
    {
        id: 'article',
        title: "Articles",
    }
]

const selectedValues = ['article'];

test('should have 3 options', async () => {
    const onChange = jest.fn();
    
    render(<SearchFilter slug="type" title="Contenu" items={filterItems} onChange={onChange} selectedValues={selectedValues}/>);

    const options = screen.getAllByRole('option');

    expect(options).toHaveLength(3);
});

test('should trigger onChange on click', async () => {
    const onChange = jest.fn();
    
    render(<SearchFilter slug="type" title="Contenu" items={filterItems} onChange={onChange} selectedValues={selectedValues}/>);

    const options = screen.getAllByRole('option');

    fireEvent.click(options[0]);

    expect(onChange).toHaveBeenCalled();
});

test('should add the new filter to the list of filters', async () => {
    let filters;

    function onChange(slug, _filters) {
        if (slug === 'type') {
            filters = _filters;
        }
    }
    
    render(<SearchFilter slug="type" title="Contenu" items={filterItems} onChange={onChange} selectedValues={selectedValues}/>);

    const itemRecipes = screen.getByText('Recettes');

    fireEvent.click(itemRecipes);

    expect(filters).toEqual(['article', 'recipe']);
});


test('should reset filters on click on the first item', async () => {
    let filters;

    function onChange(slug, _filters) {
        if (slug === 'type') {
            filters = _filters;
        }
    }
    
    render(<SearchFilter slug="type" title="Contenu" items={filterItems} onChange={onChange} selectedValues={selectedValues}/>);

    const items = screen.getAllByRole('option');

    fireEvent.click(items[0]);

    expect(filters).toEqual([]);
});

test('should remove item from selected on click on self', async () => {
    let filters = [];

    function onChange(slug, _filters) {
        if (slug === 'type') {
            filters = _filters;
        }
    }
    
    render(<SearchFilter slug="type" title="Contenu" items={filterItems} onChange={onChange} selectedValues={['article']}/>);

    const item = screen.getByText('Articles');

    fireEvent.click(item);

    expect(filters).toEqual([]);
});