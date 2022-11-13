import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { Card } from './Card';

const baseProps = {
  card: {
    code: '1',
    quantity: 2
  },
  showQuantity: false,
};

describe('Card', () => {
  it('should render card with image', () => {
    const props = baseProps;
    render(<Card {...props} />);
    const card = screen.getByTestId(`card-${props.card.code}`);

    expect(card).not.toBeNull();
    expect(card).not.toHaveClass('Horizontal');
    expect(within(card).getByRole('img')).not.toBeNull();
  });

  it('should have horizontal className', () => {
    const props = {...baseProps, card: { ...baseProps.card, type_code: 'main_scheme' }};
    render(<Card {...props} />);
    const card = screen.getByTestId(`card-${props.card.code}`);

    expect(card).not.toBeNull();
    expect(card).toHaveClass('Horizontal');
  });

  it('should not render quantity', () => {
    const props = baseProps;
    render(<Card {...props} />);
    const card = screen.getByTestId(`card-${props.card.code}`);
    expect(within(card).queryByText(`x${props.card.quantity}`)).toBeNull();
  });

  it('should render quantity', () => {
    const props = { ...baseProps, showQuantity: true };
    render(<Card {...props} />);
    const card = screen.getByTestId(`card-${props.card.code}`);
    expect(within(card).getByText(`x${props.card.quantity}`)).not.toBeNull();
  });
});