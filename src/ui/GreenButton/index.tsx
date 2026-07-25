import { Button } from '@mui/material';
import classNames from 'classnames';
import type { FC, MouseEvent, PropsWithChildren } from 'react';

import './styles.scss';

interface GreenButtonProps {
  onClick?: (event: MouseEvent) => void;
  type?: 'button' | 'submit';
  isTrulyGreen?: boolean;
  isHyperactive?: boolean;
  disabled?: boolean;
  className?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: 'text' | 'contained' | 'outlined';
}
const GreenButton: FC<PropsWithChildren<GreenButtonProps>> = ({
  onClick,
  type = 'submit',
  children,
  isTrulyGreen,
  isHyperactive,
  disabled,
  className,
  startIcon,
  endIcon,
  variant = 'contained',
}) => (
  <Button
    className={classNames(
      { 'green-button': isTrulyGreen, 'hyper-active': isHyperactive, 'is-disabled': disabled },
      className,
    )}
    type={type}
    onClick={onClick}
    data-after={children}
    data-before=""
    disabled={disabled}
    startIcon={startIcon}
    endIcon={endIcon}
    variant={variant}
  >
    {children}
  </Button>
);

export default GreenButton;
