import type { TableBodyProps } from '@mui/material';
import { TableBody, styled, tableBodyClasses } from '@mui/material';
import type { FC, PropsWithChildren } from 'react';

const StyledTableBody = styled(TableBody)(() => ({
  [`&.${tableBodyClasses.root}`]: {
    backgroundColor: 'var(--table-body)',
  },
}));

const Body: FC<PropsWithChildren<TableBodyProps>> = ({ children, ...props }) => {
  return <StyledTableBody {...props}>{children}</StyledTableBody>;
};

export default Body;
