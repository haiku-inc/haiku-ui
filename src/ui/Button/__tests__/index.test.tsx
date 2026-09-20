import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Button from '../index';

describe('Button Component', () => {
  describe('Base Component Rendering', () => {
    it('renders the text children correctly', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByText('Click me')).toBeTruthy();
    });

    it('renders an icon and children correctly', () => {
      const icon = <span data-testid="icon">Icon</span>;
      render(<Button icon={icon}>Text</Button>);
      expect(screen.getByTestId('icon')).toBeTruthy();
      expect(screen.getByText('Text')).toBeTruthy();
    });

    it('applies the color prop as a CSS variable', () => {
      render(<Button color="red">Color Test</Button>);
      const button = screen.getByRole('button', { name: /Color Test/i });
      expect(button.style.getPropertyValue('--btn-color')).toBe('red');
    });

    it('applies the provided className', () => {
      render(<Button className="custom-class">Class Test</Button>);
      const button = screen.getByRole('button', { name: /Class Test/i });
      expect(button.classList.contains('custom-class')).toBe(true);
    });
  });

  describe('Interactions and State', () => {
    it('calls onClick when clicked', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click Me</Button>);
      const button = screen.getByRole('button', { name: /Click Me/i });
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies "is-active" class when onClick is provided', () => {
      render(<Button onClick={() => {}}>Active Test</Button>);
      const button = screen.getByRole('button', { name: /Active Test/i });
      expect(button.classList.contains('is-active')).toBe(true);
    });

    it('does NOT apply "is-active" class when onClick is NOT provided', () => {
      render(<Button>Inactive Test</Button>);
      const button = screen.getByRole('button', { name: /Inactive Test/i });
      expect(button.classList.contains('is-active')).toBe(false);
    });

    it('handles the disabled state', () => {
      render(<Button disabled>Disabled Test</Button>);
      const button = screen.getByRole('button', { name: /Disabled Test/i });
      expect(button).toBeDisabled();
    });
  });

  describe('Variants', () => {
    it('renders Button.Text correctly', () => {
      render(<Button.Text>Text Variant</Button.Text>);
      const button = screen.getByRole('button', { name: /Text Variant/i });
      expect(button.classList.contains('button-text')).toBe(true);
    });

    it('renders Button.Filled correctly', () => {
      render(<Button.Filled>Filled Variant</Button.Filled>);
      const button = screen.getByRole('button', { name: /Filled Variant/i });
      expect(button.classList.contains('button-filled')).toBe(true);
    });

    it('renders Button.Text.Primary correctly', () => {
      render(<Button.Text.Primary>Text Primary</Button.Text.Primary>);
      const button = screen.getByRole('button', { name: /Text Primary/i });
      expect(button.classList.contains('button-text')).toBe(true);
      expect(button.classList.contains('button-primary')).toBe(true);
    });

    it('renders Button.Filled.Secondary correctly', () => {
      render(<Button.Filled.Secondary>Filled Secondary</Button.Filled.Secondary>);
      const button = screen.getByRole('button', { name: /Filled Secondary/i });
      expect(button.classList.contains('button-filled')).toBe(true);
      expect(button.classList.contains('button-secondary')).toBe(true);
    });

    it('renders Button.Error correctly', () => {
      render(<Button.Error>Error Variant</Button.Error>);
      const button = screen.getByRole('button', { name: /Error Variant/i });
      expect(button.classList.contains('button-error')).toBe(true);
    });

    it('applies additional className to variants', () => {
      render(<Button.Primary className="extra-class">Primary Test</Button.Primary>);
      const button = screen.getByRole('button', { name: /Primary Test/i });
      expect(button.classList.contains('button-primary')).toBe(true);
      expect(button.classList.contains('extra-class')).toBe(true);
    });
  });
});
