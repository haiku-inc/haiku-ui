import { Chip } from '@mui/material';
import classNames from 'classnames';
import type { FC, HTMLAttributes, JSX, ReactNode } from 'react';
import SkeletonBlock from '../SkeletonBlock';
import './styles.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean;
  label?: string;
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  textColor?: string;
  bgColor?: string;
  variant?: 'filled' | 'outlined';
  icon?: JSX.Element;
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
}

const Pill: FC<Props> = ({
  isLoading,
  icon,
  className,
  label,
  color,
  textColor,
  bgColor,
  variant = 'filled',
  onClick,
  children,
  ...rest
}) => {
  if (isLoading) {
    return (
      <div {...rest} className={classNames('pill-tag p-0!', className)}>
        <SkeletonBlock width="150px" height="100%" />
      </div>
    );
  }

  if (color && ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'].includes(color)) {
    return (
      <Chip
        icon={icon}
        label={label}
        color={color}
        className={classNames('text-xs! font-bold!', { 'cursor-pointer': !!onClick }, className)}
        variant={variant}
        onClick={onClick}
      />
    );
  }

  return (
    <div
      {...rest}
      className={classNames(
        'pill-tag text-xs font-bold',
        { 'cursor-pointer hover:opacity-80 active:outline active:outline-(--primary)': !!onClick },
        className,
      )}
      style={{
        color: textColor || 'oklch(from var(--text-primary) l c h / 0.6)',
        backgroundColor: bgColor || 'oklch(from var(--text-primary) l c h / 0.1)',
      }}
      onClick={onClick}
    >
      {icon} {label}
      {children}
    </div>
  );
};

export default Pill;
