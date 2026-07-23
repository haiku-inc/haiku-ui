import { useState, type ReactNode } from 'react';

/**
 * Minimal fixed-row-height virtualized list — renders only the rows in (and just around) the viewport, so a
 * list of hundreds/thousands stays cheap. No dependency; uses absolute positioning over a tall spacer.
 */
export function WindowedList<T>({
  items,
  rowHeight,
  height,
  overscan = 6,
  renderRow,
  getKey,
}: {
  readonly items: readonly T[];
  /** Fixed height of every row, in px. */
  readonly rowHeight: number;
  /** Height of the scroll viewport, in px. */
  readonly height: number;
  /** Extra rows rendered above/below the viewport to avoid blank edges while scrolling. */
  readonly overscan?: number;
  readonly renderRow: (item: T, index: number) => ReactNode;
  readonly getKey: (item: T, index: number) => string | number;
}) {
  const [scrollTop, setScrollTop] = useState(0);
  const total = items.length;
  const visibleCount = Math.ceil(height / rowHeight);
  const start = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
  const end = Math.min(total, start + visibleCount + overscan * 2);
  const slice = items.slice(start, end);
  return (
    <div style={{ height, overflowY: 'auto' }} onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}>
      <div style={{ height: total * rowHeight, position: 'relative' }}>
        <div style={{ position: 'absolute', top: start * rowHeight, left: 0, right: 0 }}>
          {slice.map((item, i) => (
            <div key={getKey(item, start + i)} style={{ height: rowHeight }}>
              {renderRow(item, start + i)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
