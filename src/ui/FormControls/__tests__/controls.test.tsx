import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CheckboxField, Disclosure, InputField, Notice, UtcDateTimeField } from '..';

describe('native form controls', () => {
  it('associates labels, help and validation with the input while preserving native form attributes', () => {
    render(
      <InputField
        label="Position X (km)"
        description="In the declared frame"
        error="Outside the data domain"
        required
        inputMode="decimal"
        value=""
        onChange={() => {}}
      />,
    );
    const input = screen.getByRole('textbox', { name: 'Position X (km)' });
    expect(input).toBeRequired();
    expect(input).toHaveAccessibleDescription('In the declared frame Outside the data domain');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('inputmode', 'decimal');
    expect(screen.getByRole('alert')).toHaveTextContent('Outside the data domain');
  });
  it('uses native checkbox change events with disabled controls preserved', () => {
    const check = vi.fn();
    render(
      <>
        <CheckboxField label="Moon gravity" checked={false} onChange={(event) => check(event.target.checked)} />
        <CheckboxField label="Unavailable body" disabled />
      </>,
    );
    fireEvent.click(screen.getByRole('checkbox', { name: 'Moon gravity' }));
    expect(check).toHaveBeenCalledWith(true);
    expect(screen.getByRole('checkbox', { name: 'Unavailable body' })).toBeDisabled();
  });
  it('keeps UTC independent of the host timezone and accepts an externally updated clock', () => {
    const change = vi.fn();
    const { rerender } = render(
      <UtcDateTimeField label="Scene start (UTC)" value="2026-11-01T05:30:00.000Z" onValueChange={change} />,
    );
    const input = screen.getByLabelText('Scene start (UTC)');
    expect(input).toHaveValue('2026-11-01T05:30');
    fireEvent.change(input, { target: { value: '2026-11-01T06:30:00' } });
    expect(change).toHaveBeenLastCalledWith('2026-11-01T06:30:00.000Z');
    fireEvent.change(input, { target: { value: '' } });
    expect(change).toHaveBeenLastCalledWith('');
    rerender(<UtcDateTimeField label="Scene start (UTC)" value="2026-10-15T12:00:00.000Z" onValueChange={change} />);
    expect(input).toHaveValue('2026-10-15T12:00');
  });
  it('shows required UTC validation without guessing a replacement time', () => {
    const change = vi.fn();
    render(<UtcDateTimeField label="Start (UTC)" value="2026-10-15T12:00:00Z" required onValueChange={change} />);
    fireEvent.change(screen.getByLabelText('Start (UTC)'), { target: { value: '' } });
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a complete UTC date and time.');
    expect(change).toHaveBeenCalledExactlyOnceWith('');
  });
  it('announces errors and uses a native disclosure without a nested control library', () => {
    render(
      <>
        <Notice tone="error">Unsupported frame</Notice>
        <Disclosure heading="Advanced orbital elements">
          <InputField label="RAAN" />
        </Disclosure>
      </>,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Unsupported frame');
    expect(screen.getByText('Advanced orbital elements').closest('details')).not.toHaveAttribute('open');
  });
});
