import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import DropdownField from '..';

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, 'showPopover', {
    configurable: true,
    value: function () {
      this.style.display = 'block';
    },
  });
  Object.defineProperty(HTMLElement.prototype, 'hidePopover', {
    configurable: true,
    value: function () {
      this.style.display = 'none';
    },
  });
});
afterAll(() => {
  delete (HTMLElement.prototype as unknown as Record<string, unknown>).showPopover;
  delete (HTMLElement.prototype as unknown as Record<string, unknown>).hidePopover;
});
afterEach(cleanup);
const options = [
  { value: 'cyber', label: 'Cyber' },
  { value: 'unavailable', label: 'Unavailable edition', disabled: true },
  { value: 'all', label: 'Full' },
];
describe('Haiku dropdown', () => {
  it('skips disabled options with the keyboard and restores focus after selection', () => {
    const change = vi.fn();
    render(<DropdownField label="Access" value="cyber" options={options} onChange={change} />);
    const trigger = screen.getByRole('combobox', { name: 'Access' });
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    expect(screen.getByRole('option', { name: 'Cyber' })).toHaveFocus();
    fireEvent.keyDown(screen.getByRole('option', { name: 'Cyber' }), { key: 'ArrowDown' });
    const full = screen.getByRole('option', { name: 'Full' });
    expect(full).toHaveFocus();
    fireEvent.click(full);
    expect(change).toHaveBeenCalledExactlyOnceWith('all');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
  it('keeps disabled controls closed and supports Escape without changing the value', () => {
    const change = vi.fn();
    const { rerender } = render(
      <DropdownField label="Access" value="all" options={options} onChange={change} disabled />,
    );
    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    rerender(<DropdownField label="Access" value="all" options={options} onChange={change} />);
    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.keyDown(screen.getByRole('option', { name: 'Full' }), { key: 'Escape' });
    expect(change).not.toHaveBeenCalled();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
