import Button from '@mui/material/Button';
import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';

export interface Props {
  id: string | number;
  className?: string;
  onClick?(value: string | number): void;
  onChange?(value: string | number): void;
  disabled?: boolean;
  isActive?: boolean;
}

const Tab: FC<PropsWithChildren<Props>> = ({ id, onClick, onChange, className, children, disabled, isActive }) => {
  return (
    <Button
      className={classNames('tab', className, { 'is-active': isActive })}
      size="small"
      variant="text"
      color="inherit"
      disabled={disabled}
      onClick={() => {
        onChange?.(id);
        onClick?.(id);
      }}
    >
      {children}
    </Button>
  );
};

export default Tab;
