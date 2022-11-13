import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pill } from './Pill';

const baseProps = {
  label: 'Pill label',
  isActive: false,
  onClick: jest.fn(),
};

describe('Pill', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render pill with proper text', () => {
    const props = baseProps;
    render(<Pill {...props} />);
    const pill = screen.getByTestId(`pill-${props.label}`);

    expect(pill).toHaveTextContent(props.label);
    expect(pill).not.toBeNull();
  });

  it('should handle click if it is not clickable', async () => {
    const props = baseProps;
    render(<Pill {...props} />);
    const pill = screen.getByTestId(`pill-${props.label}`);

    expect(props.onClick).not.toHaveBeenCalled();
    await fireEvent.click(pill)
    expect(props.onClick).toHaveBeenCalledTimes(1);
  });


  it('should not fire onClick if it is active', async () => {
    const props = {...baseProps, isActive: true };
    render(<Pill {...props} />);
    const pill = screen.getByTestId(`pill-${props.label}`);

    expect(props.onClick).not.toHaveBeenCalled();
    await fireEvent.click(pill)
    expect(props.onClick).not.toHaveBeenCalled();
  });

  it('should change colors if colorsInfo is provided', () => {
    const props = {
      ...baseProps,
      colorsInfo: {
        default: 'red',
        active: 'green',
      },
    };
    render(<Pill {...props} />);
    const pill = screen.getByTestId(`pill-${props.label}`);

    expect(pill).toHaveStyle({ borderColor: props.colorsInfo.default });
  });

  it('should change active colors if colorsInfo is provided', () => {
    const props = {
      ...baseProps,
      isActive: true,
      colorsInfo: {
        default: 'red',
        active: 'green',
      },
    };
    render(<Pill {...props} />);
    const pill = screen.getByTestId(`pill-${props.label}`);

    expect(pill).toHaveStyle({
      backgroundColor: props.colorsInfo.active,
      borderColor: props.colorsInfo.active
    });
  });
});