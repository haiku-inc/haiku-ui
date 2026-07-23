import type { TableHeadProps } from '@mui/material';
import { TableHead, styled, tableHeadClasses } from '@mui/material';
import type { FC, PropsWithChildren } from 'react';

const StyledTableHead = styled(TableHead)(() => ({
  [`&.${tableHeadClasses.root}`]: {
    backgroundColor: 'var(--table-head)',
  },
}));

const Head: FC<PropsWithChildren<TableHeadProps>> = ({ children, ...props }) => {
  return <StyledTableHead {...props}>{children}</StyledTableHead>;
};

export default Head;
