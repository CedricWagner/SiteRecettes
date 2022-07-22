import  {render, fireEvent, screen } from '@testing-library/react'
import QuantityControl from './quantity-control';

test('should trigger "onUpdateQuantity" function on click', async () => {
    const onUpdate = jest.fn();
    
    render(<QuantityControl current="12" onUpdateQuantity={onUpdate}/>);
    
    fireEvent.click(screen.getByTitle("Plus"));

    expect(onUpdate).toHaveBeenCalled();
});

test('should increase current value on click increase button', async () => {
    
    let value = 12;
    
    const onUpdate = (_value) => value = _value;
    
    render(<QuantityControl current={value} onUpdateQuantity={onUpdate}/>);
    
    fireEvent.click(screen.getByTitle("Plus"));

    expect(value).toEqual(13);
});

test('should decrease current value on click decrease button', async () => {
    
    let value = 12;
    
    const onUpdate = (_value) => value = _value;
    
    render(<QuantityControl current={value} onUpdateQuantity={onUpdate}/>);
    
    fireEvent.click(screen.getByTitle("Moins"));

    expect(value).toEqual(11);
});