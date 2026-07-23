import type { TableRowProps } from '@mui/material';
import { TableRow, styled, tableBodyClasses, tableRowClasses } from '@mui/material';
import classNames from 'classnames';
import type { FC, MouseEvent, PropsWithChildren } from 'react';

const StyledTableRow = styled(TableRow)(() => ({
  [`.${tableBodyClasses.root} &.${tableRowClasses.root}:not(.no-hover):hover`]: {
    backgroundColor: 'var(--table-hover)',
  },
  [`&.${tableRowClasses.selected}`]: {
    backgroundColor: 'var(--table-selected)',
  },
  [`.${tableBodyClasses.root} &.${tableRowClasses.hover}:hover:has(th)`]: {
    backgroundColor: 'var(--table-hover)',
  },
}));

interface Props extends TableRowProps {
  noHover?: boolean;
}

const Row: FC<PropsWithChildren<Props>> = ({ children, className, noHover, ...props }) => {
  return (
    <StyledTableRow
      {...props}
      selected={props.selected}
      onClick={(event: MouseEvent<HTMLTableRowElement>) => {
        if (props.onClick) {
          props.onClick(event);
        }
      }}
      className={classNames(className, { 'cursor-pointer': !!props.onClick, 'no-hover': noHover })}
    >
      {children}
    </StyledTableRow>
  );
};

export default Row;
