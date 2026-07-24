import Table from '../Table';
import Checkbox from '@mui/material/Checkbox';
import type { FC } from 'react';

type HeadCell = {
  id: string;
  align?: 'center' | 'left' | 'right' | 'justify' | 'inherit';
  disablePadding?: boolean;
  label: string;
};

interface EnhancedHeadProps {
  onSelectAllClick?: () => void;
  numSelected: number;
  rowCount: number;
  headCells: readonly HeadCell[];
}

const EnhancedHead: FC<EnhancedHeadProps> = ({ onSelectAllClick, numSelected, rowCount, headCells }) => (
  <Table.Head>
    <Table.Row onClick={onSelectAllClick}>
      {!!onSelectAllClick && (
        <Table.Cell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
          />
        </Table.Cell>
      )}
      {headCells.map((headCell, index) => (
        <Table.Cell
          key={headCell.id}
          align={headCell.align ? headCell.align : 'right'}
          padding={headCell.disablePadding ? 'none' : 'normal'}
          sx={index === headCells.length - 1 ? { width: '100px', maxWidth: '100px' } : {}}
        >
          {headCell.label}
        </Table.Cell>
      ))}
    </Table.Row>
  </Table.Head>
);

export default EnhancedHead;
export type { HeadCell };
