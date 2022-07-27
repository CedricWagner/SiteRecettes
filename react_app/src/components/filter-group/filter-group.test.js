import  {render, fireEvent, screen } from '@testing-library/react'
import FilterGroup from "./filter-group";

const filterItems = [
    {
        id: 1,
        title: "De saison",
        children: [
            {id: 4, title: "Ete"},
            {id: 5, title: "Automne"}
        ],
    },
    {
        id: 2,
        title: "Salés",
        children: [
            {id: 6, title: "Apéritifs"},
            {id: 7, title: "Plats"}
        ],
    },
    { id: 3, title: "Sucrés" }

]

const activeFilters = [4, 2];


test('should trigger "onFilter" function on select', async () => {
    const onFilter = jest.fn();
    
    render(<FilterGroup title="Catégories" items={filterItems} onFilter={onFilter} activeFilters={activeFilters}/>);
    
    fireEvent.click(screen.getByText("Automne"));

    expect(onFilter).toHaveBeenCalled();
});

test('should add the new filter to the list of filters', async () => {
    let filters

    function onFilter(_filters) {
        filters = _filters
    }
    
    render(<FilterGroup title="Catégories" items={filterItems} onFilter={onFilter} activeFilters={activeFilters}/>);
    
    fireEvent.click(screen.getByText("Automne"));

    expect(filters).toEqual([4,2,5]);
});

test('should remove the target filter from the list of filters', async () => {
    let filters

    function onFilter(_filters) {
        filters = _filters
    }
    
    render(<FilterGroup title="Catégories" items={filterItems} onFilter={onFilter} activeFilters={activeFilters}/>);
    
    fireEvent.click(screen.getByText("Ete"));

    expect(filters).toEqual([2]);
});

test('should remove all filters on select "All"', async () => {
    let filters

    function onFilter(_filters) {
        filters = _filters
    }
    
    render(<FilterGroup title="Catégories" items={filterItems} onFilter={onFilter} activeFilters={activeFilters} />);
    
    fireEvent.click(screen.getByText("Toutes"));

    expect(filters).toEqual([]);
});