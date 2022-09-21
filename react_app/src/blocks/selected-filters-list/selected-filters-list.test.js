import  {fireEvent, render, screen } from '@testing-library/react';
import SelectedFiltersList from './selected-filters-list';

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

];

const activeFilters = ['ete', 'sales'];


test('should have exactly 3 buttons', async () => {
  const onFilter = jest.fn();
  
  render(<SelectedFiltersList items={filterItems} onFilter={onFilter} activeFilters={activeFilters}/>);
  
  const buttons = await screen.findAllByRole('button');

  expect(buttons.length).toBe(3);
});

test('should trigger "onFilter" function on click', async () => {
  const onFilter = jest.fn();
  
  render(<SelectedFiltersList items={filterItems} onFilter={onFilter} activeFilters={activeFilters}/>);
  
  fireEvent.click(screen.getByText("Salés"));

  expect(onFilter).toHaveBeenCalled();
});

test('should reset filter', async () => {
  let filters;

  function onFilter(_filters) {
      filters = _filters;
  }
  
  render(<SelectedFiltersList items={filterItems} onFilter={onFilter} activeFilters={activeFilters}/>);
  
  const resetButton = await screen.findByText('Réinitialiser');

  fireEvent.click(resetButton);

  expect(filters.length).toBe(0);
});

test('should remove an item on click', async () => {
  let filters;

  function onFilter(_filters) {
      filters = _filters;
  }
  
  render(<SelectedFiltersList items={filterItems} onFilter={onFilter} activeFilters={activeFilters}/>);
  
  const filterButton = await screen.findByText('Salés');

  fireEvent.click(filterButton);

  expect(filters.length).toBe(1);
});