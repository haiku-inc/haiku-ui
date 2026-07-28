import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';
import { useState } from 'react';
import ErrorIcon from '../../assets/unicons/service/error.svg';

interface Props {
  className?: string;
  isCollapsible?: boolean;
  isCollapsed?: boolean;
}

const Error: FC<PropsWithChildren<Props>> = ({ children, className, isCollapsible, isCollapsed }) => {
  const [collapsed, setCollapsed] = useState(!!isCollapsed);
  const _isCollapsible = isCollapsible || isCollapsed;

  return (
    <div
      className={classNames('text-block-error not-last:mb-2 text-(--text-dimmed) text-[0.85em]', className, {
        'cursor-pointer': _isCollapsible,
        'is-collapsed': collapsed,
      })}
      onClick={_isCollapsible ? () => setCollapsed((prev) => !prev) : undefined}
    >
      <ErrorIcon />
      <div className={classNames('text-block-error-content', { 'line-clamp-1': collapsed })}>{children}</div>
    </div>
  );
};

export default Error;
