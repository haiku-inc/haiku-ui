import classNames from 'classnames';
import { useId, useState, type CSSProperties, type TableHTMLAttributes } from 'react';
import Button from '../Button';
import Floater from '../Floater';
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
  const [sizeOpen, setSizeOpen] = useState(false);
  const id = useId();
  const choose = (size: number) => {
    setSizeOpen(false);
    if (size !== pageSize) onPageSizeChange(size);
  };
  return (
    <div className="haiku-pagination">
      <div className="haiku-pagination__size">
        <span id={`${id}-label`}>Rows per page</span>
        <Floater
          isOpen={sizeOpen}
          onClose={() => setSizeOpen(false)}
          role="listbox"
          aria-labelledby={`${id}-label`}
          button={
            <Button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={sizeOpen}
              aria-labelledby={`${id}-label ${id}-value`}
              onClick={() => setSizeOpen((open) => !open)}
            >
              <span id={`${id}-value`}>{pageSize}</span> <span aria-hidden="true">▾</span>
            </Button>
          }
        >
          {options.map((size) => (
            <Floater.Item
              key={size}
              role="option"
              tabIndex={0}
              aria-selected={size === pageSize}
              isHighlighted={size === pageSize}
              onClick={() => choose(size)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  choose(size);
                }
              }}
            >
              {size}
            </Floater.Item>
          ))}
        </Floater>
      </div>
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
