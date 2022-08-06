import  {render, fireEvent, screen } from '@testing-library/react'
import FilterGroup from "./filter-group";

const filterItems = [
    {
        id: 'de-saison',
        title: "De saison",
        children: [
            {id: 'ete', title: "Ete"},
            {id: 'automne', title: "Automne", isActive: true}
        ],
    },
    {
        id: 'sales',
        title: "Salés",
        children: [
            {id: 'aperitifs', title: "Apéritifs"},
            {id: 'plats', title: "Plats"}
        ],
    },
    { id: 'sucres', title: "Sucrés" }

]

const activeFilters = ['ete', 'sales'];


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

    expect(filters).toEqual(['ete', 'sales', 'automne']);
});

test('should remove the target filter from the list of filters', async () => {
    let filters

    function onFilter(_filters) {
        filters = _filters
    }
    
    render(<FilterGroup title="Catégories" items={filterItems} onFilter={onFilter} activeFilters={activeFilters}/>);
    
    fireEvent.click(screen.getByText("Ete"));

    expect(filters).toEqual(['sales']);
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