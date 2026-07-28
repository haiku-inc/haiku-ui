import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';
import { useState } from 'react';
import InfoIcon from '../../assets/unicons/service/info.svg';

interface Props {
  className?: string;
  isCollapsible?: boolean;
  isCollapsed?: boolean;
}

const Info: FC<PropsWithChildren<Props>> = ({ children, className, isCollapsible, isCollapsed }) => {
  const [collapsed, setCollapsed] = useState(!!isCollapsed);
  const _isCollapsible = isCollapsible || isCollapsed;

  return (
    <div
      className={classNames('text-block-info not-last:mb-2 text-(--text-dimmed) text-[0.85em]', className, {
        'cursor-pointer': _isCollapsible,
        'is-collapsed': collapsed,
      })}
      onClick={_isCollapsible ? () => setCollapsed((prev) => !prev) : undefined}
    >
      <InfoIcon />
      <div className={classNames('text-block-info-content', { 'line-clamp-1': collapsed })}>{children}</div>
    </div>
  );
};

export default Info;
