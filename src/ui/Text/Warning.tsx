import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';
import { useState } from 'react';
import WarningIcon from '../../assets/unicons/service/warning.svg';

interface Props {
  className?: string;
  isCollapsible?: boolean;
  isCollapsed?: boolean;
}

const Warning: FC<PropsWithChildren<Props>> = ({ children, className, isCollapsible, isCollapsed }) => {
  const [collapsed, setCollapsed] = useState(!!isCollapsed);
  const _isCollapsible = isCollapsible || isCollapsed;

  return (
    <div
      className={classNames('text-block-warning not-last:mb-2 text-(--text-dimmed) text-[0.85em]', className, {
        'cursor-pointer': _isCollapsible,
        'is-collapsed': collapsed,
      })}
      onClick={_isCollapsible ? () => setCollapsed((prev) => !prev) : undefined}
    >
      <WarningIcon />
      <div className={classNames('text-block-warning-content', { 'line-clamp-1': collapsed })}>{children}</div>
    </div>
  );
};

export default Warning;
