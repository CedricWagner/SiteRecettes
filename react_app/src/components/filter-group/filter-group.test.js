import  {render, fireEvent, screen } from '@testing-library/react'
import FilterGroup from "./filter-group";

const filterItems = [
    {
        id: '531315-5436513',
        title: "De saison",
        children: [
            {id: '53d1315-5436513', title: "Ete"},
            {id: '531315-5436ty5513', title: "Automne", isActive: true}
        ],
    },
    {
        id: '5353553-fez135zfe',
        title: "Salés",
        children: [
            {id: 'zzeffzfzeg57-fzefz', title: "Apéritifs"},
            {id: 'zefzef25-543544556513', title: "Plats"}
        ],
    },
    { id: '35f4z35ef4-36z41ef53', title: "Sucrés" }

]

const activeFilters = ['53d1315-5436513', '5353553-fez135zfe'];


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

    expect(filters).toEqual(['53d1315-5436513', '5353553-fez135zfe', '531315-5436ty5513']);
});

test('should remove the target filter from the list of filters', async () => {
    let filters

    function onFilter(_filters) {
        filters = _filters
    }
    
    render(<FilterGroup title="Catégories" items={filterItems} onFilter={onFilter} activeFilters={activeFilters}/>);
    
    fireEvent.click(screen.getByText("Ete"));

    expect(filters).toEqual(['5353553-fez135zfe']);
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