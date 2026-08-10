import type { TableCellProps } from '@mui/material';
import classNames from 'classnames';
import type { FC } from 'react';
import Cell from './Cell';

interface Props extends TableCellProps {
  value: boolean;
}
const BooleanCell: FC<Props> = ({ value, align, ...props }) => {
  return (
    <Cell
      align={align}
      {...props}
      className={classNames('font-(family-name:--font-oxanium)!', {
        'text-(--error-text)!': !value,
        'text-(--success-text)!': !!value,
      })}
    >
      {value ? '✓' : '✗'}
    </Cell>
  );
};

export default BooleanCell;
