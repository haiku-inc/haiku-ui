import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DataTable, Pagination } from '..';

describe('native table and pagination', () => {
  it('retains table semantics and makes the overflow region keyboard accessible', () => {
    render(
      <DataTable label="Satellite catalog" maxHeight="20rem">
        <thead>
          <tr>
            <th scope="col">Object</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Demo satellite</td>
          </tr>
        </tbody>
      </DataTable>,
    );
    expect(screen.getByRole('table', { name: 'Satellite catalog' })).toContainElement(
      screen.getByRole('columnheader', { name: 'Object' }),
    );
    expect(screen.getByRole('region')).toHaveAttribute('tabindex', '0');
  });
  it('respects page bounds and includes an authored page size absent from default choices', () => {
    const page = vi.fn(),
      size = vi.fn();
    const { rerender } = render(
      <Pagination page={0} pageSize={75} total={80} onPageChange={page} onPageSizeChange={size} />,
    );
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
    expect(screen.getByText('1–75 of 80')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Rows per page 75' })).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Next page' }));
    expect(page).toHaveBeenCalledExactlyOnceWith(1);
    fireEvent.click(screen.getByRole('button', { name: 'Rows per page 75' }));
    expect(screen.getByRole('option', { name: '75' })).toHaveAttribute('aria-selected', 'true');
    fireEvent.click(screen.getByRole('option', { name: '50' }));
    expect(size).toHaveBeenCalledExactlyOnceWith(50);
    expect(screen.queryByRole('option')).toBeNull();
    rerender(<Pagination page={0} pageSize={75} total={0} onPageChange={page} onPageSizeChange={size} />);
    expect(screen.getByText('0–0 of 0')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
  });
});
