import classNames from 'classnames';
import type { ButtonHTMLAttributes, CSSProperties, FC, PropsWithChildren, ReactNode } from 'react';
import './index.scss';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  color?: string;
  bg?: string;
  bgHover?: string;
  size?: string;
  type?: 'button' | 'submit' | 'reset';
}

const IconButton: FC<PropsWithChildren<IconButtonProps>> = ({
  children,
  className,
  type = 'button',
  size,
  bg,
  bgHover,
  color,
  disabled,
  onClick,
  ...props
}) => {
  const style = {
    '--icon-size': size,
    '--icon-color': color,
    '--icon-bg': bg,
    '--icon-bg-hover': bgHover,
  } as CSSProperties;
  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      className={classNames('haiku-ui-icon-button', className, { 'is-disabled': disabled })}
      {...props}
      style={style}
    >
      {children}
    </button>
  );
};

IconButton.displayName = 'IconButton';

export default IconButton;
