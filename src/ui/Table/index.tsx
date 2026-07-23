import type { TableProps } from '@mui/material';
import { Table as MUITable } from '@mui/material';
import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';
import Body from './Body';
import BooleanCell from './BooleanCell';
import Cell from './Cell';
import type { HeadCell } from './EnhancedHead';
import EnhancedHead from './EnhancedHead';
import Head from './Head';
import Pagination from './Pagination';
import Row from './Row';
import Th from './Th';
interface Props extends TableProps {
  className?: string;
  hasPagination?: boolean;
  isSmall?: boolean;
}

const Table: FC<PropsWithChildren<Props>> = ({ children, className, hasPagination, isSmall, ...rest }) => {
  return (
    <div className={classNames('rounded-xl overflow-auto', className, { 'rounded-br-none': hasPagination })}>
      <MUITable {...rest} size={!isSmall ? 'medium' : 'small'}>
        {children}
      </MUITable>
    </div>
  );
};

interface ICompound extends FC<PropsWithChildren<Props>> {
  Th: typeof Th;
  Cell: typeof Cell;
  BooleanCell: typeof BooleanCell;
  Row: typeof Row;
  Body: typeof Body;
  Head: typeof Head;
  EnhancedHead: typeof EnhancedHead;
  Pagination: typeof Pagination;
}

(Table as ICompound).Cell = Cell;
(Table as ICompound).Th = Th;
(Table as ICompound).BooleanCell = BooleanCell;
(Table as ICompound).Row = Row;
(Table as ICompound).Body = Body;
(Table as ICompound).Head = Head;
(Table as ICompound).EnhancedHead = EnhancedHead;
(Table as ICompound).Pagination = Pagination;

export default Table as ICompound;
export type { HeadCell };
