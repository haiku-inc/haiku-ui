import type { TableCellProps } from '@mui/material';
import { TableCell, styled, tableCellClasses, tableRowClasses } from '@mui/material';
import type { FC, MouseEvent, PropsWithChildren } from 'react';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'var(--table-head)',
    borderColor: 'var(--border)',
  },
  [`.${tableRowClasses.root}:last-child &.${tableCellClasses.body}`]: {
    borderBottom: 'none',
  },
  [`&.${tableCellClasses.body}`]: {
    borderColor: 'var(--border)',
  },
  [`&.${tableCellClasses.body}:is(th)`]: {
    backgroundColor: 'var(--table-th)',
  },
  [`&.${tableCellClasses.body}:not(:is(th))`]: {
    backgroundColor: 'color-mix(in oklab, var(--tertiary) 10%, transparent)',
  },
}));

const Cell: FC<PropsWithChildren<TableCellProps>> = ({ children, align, ...props }) => {
  return (
    <StyledTableCell align={align ? align : 'right'} {...props} onClick={(e: MouseEvent) => e.preventDefault()}>
      {children}
    </StyledTableCell>
  );
};

export default Cell;
