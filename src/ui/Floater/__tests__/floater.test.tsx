import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Floater from '..';

const menu = (
  <Floater isOpen button={<button type="button">Gravity</button>} role="listbox" aria-label="Gravity options">
    <Floater.Item role="option">Central gravity</Floater.Item>
  </Floater>
);

describe('Floater', () => {
  it('renders its menu on the page body when opened outside a dialog', () => {
    render(menu);
    expect(screen.getByRole('listbox', { name: 'Gravity options' }).closest('dialog')).toBeNull();
  });

  it('renders its menu inside a native dialog it is opened from, so the top layer cannot hide it', () => {
    render(<dialog open>{menu}</dialog>);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toContainElement(screen.getByRole('listbox', { name: 'Gravity options' }));
  });
});
