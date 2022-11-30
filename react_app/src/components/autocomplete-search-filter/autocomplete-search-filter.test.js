import  {fireEvent, render, screen } from '@testing-library/react';
import AutocompleteSearchFilter from './autocomplete-search-filter';

test("should trigger onChange on select", async () => {
	const onChange = jest.fn();
	const mockCallback = async () => {
		return [
			{
				id: "f64487f4-577b-4abd-8d12-a2d655c173bb",
				title: "salade"
			},
			{
				id: "edfbe87d-6fbc-47c8-8b93-8b3240960760",
				title: "sauce"
			}
	]};
	render(<AutocompleteSearchFilter callback={mockCallback} onChange={onChange} ressource="tags" slug="field_tags" title="An interesting title" selectedValues={[]} />);

	const valueInput = screen.getByPlaceholderText(/Rechercher/i);
	fireEvent.change(valueInput, {target: {value: "sa"}});
	const items = await screen.findAllByRole("listitem");
	fireEvent.click(items[0]);
	
	expect(onChange).toBeCalled();
});