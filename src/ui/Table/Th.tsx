import Cell from '@/ui/Table/Cell';
import type { TableCellProps } from '@mui/material';
import type { FC, PropsWithChildren } from 'react';

const Th: FC<PropsWithChildren<TableCellProps>> = ({ children, align, ...props }) => {
  return (
    <Cell component="th" align={align} {...props}>
      {children}
    </Cell>
  );
};

export default Th;
