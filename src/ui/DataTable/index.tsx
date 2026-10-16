import classNames from 'classnames';
import type { CSSProperties, TableHTMLAttributes } from 'react';
import Button from '../Button';
import { SelectField } from '../FormControls';
import './styles.scss';

/** Native table semantics with a keyboard-scrollable region and sticky column headers. */
export function DataTable({
  label,
  maxHeight,
  children,
  className,
  ...rest
}: TableHTMLAttributes<HTMLTableElement> & { label: string; maxHeight?: CSSProperties['maxHeight'] }) {
  return (
    <div
      className="haiku-data-table"
      style={{ maxHeight }}
      role="region"
      aria-label={`${label} scroll area`}
      tabIndex={0}
    >
      <table {...rest} aria-label={label} className={classNames(className)}>
        {children}
      </table>
    </div>
  );
}

export function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [25, 50, 100],
}: {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions?: readonly number[];
}) {
  const lastPage = Math.max(0, Math.ceil(total / pageSize) - 1);
  const options = [...new Set([...pageSizeOptions, pageSize])].sort((a, b) => a - b);
  return (
    <div className="haiku-pagination">
      <SelectField
        label="Rows per page"
        value={String(pageSize)}
        options={options.map((value) => ({ value: String(value), label: String(value) }))}
        onChange={(event) => onPageSizeChange(Number(event.target.value))}
      />
      <span aria-live="polite">
        {total ? page * pageSize + 1 : 0}–{Math.min(total, (page + 1) * pageSize)} of {total}
      </span>
      <Button type="button" disabled={page <= 0} onClick={() => onPageChange(page - 1)} aria-label="Previous page">
        Previous
      </Button>
      <Button type="button" disabled={page >= lastPage} onClick={() => onPageChange(page + 1)} aria-label="Next page">
        Next
      </Button>
    </div>
  );
}
