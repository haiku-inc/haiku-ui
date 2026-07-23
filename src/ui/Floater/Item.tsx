import classNames from 'classnames';
import type { FC, HTMLAttributes, MouseEvent, PropsWithChildren, Ref } from 'react';
import './styles.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  isHighlighted?: boolean;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  ref?: Ref<HTMLDivElement>;
}

const FloaterItem: FC<PropsWithChildren<Props>> = ({ children, isHighlighted, className, onClick, ...rest }) => (
  <div
    {...rest}
    className={classNames('floater-item', className, { 'has-action': !!onClick, 'is-highlighted': isHighlighted })}
    onClick={onClick}
  >
    {children}
  </div>
);

export default FloaterItem;
