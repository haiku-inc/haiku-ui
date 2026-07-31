import classNames from 'classnames';
import type { FC, HTMLAttributes, MouseEvent, PropsWithChildren, Ref } from 'react';
import './styles.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  isHighlighted?: boolean;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  ref?: Ref<HTMLDivElement>;
  disabled?: boolean;
}

const FloaterItem: FC<PropsWithChildren<Props>> = ({ children, isHighlighted, className, onClick, disabled, ...rest }) => (
  <div
    {...rest}
    className={classNames('floater-item', className, { 'disabled': disabled, 'has-action': !!onClick, 'is-highlighted': isHighlighted })}
    onClick={!disabled ? onClick : (e) => e.stopPropagation()}
  >
    {children}
  </div>
);

export default FloaterItem;
