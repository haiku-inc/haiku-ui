import SkeletonBlock from '@/ui/SkeletonBlock';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import classNames from 'classnames';
import type { FC, HTMLAttributes, JSX, KeyboardEvent, PropsWithChildren, Ref } from 'react';
import { useState } from 'react';
import './styles.scss';

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: string | JSX.Element;
  subtitle?: string;
  isLoading?: boolean;
  isFoldable?: boolean;
  isDefaultExpanded?: boolean;
  isActive?: boolean;
  isSelected?: boolean;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

const SubIsle: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  subtitle,
  isActive,
  isSelected,
  isLoading,
  isFoldable,
  isDefaultExpanded = false,
  className,
  ...rest
}) => {
  const [expanded, setExpanded] = useState(isDefaultExpanded);

  const toggleExpanded = () => {
    if (isFoldable) {
      setExpanded((prev) => !prev);
    }
  };

  const handleTitleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleExpanded();
    }
  };

  if (isLoading) {
    return (
      <div
        {...rest}
        className={classNames('sub-isle-box p-0!', className, {
          'is-selected': isSelected,
          'is-active': isActive || !!rest.onClick,
        })}
      >
        <SkeletonBlock width="100%" height="100%" />
      </div>
    );
  }

  return (
    <div
      {...rest}
      className={classNames('sub-isle-box', className, {
        'is-selected': isSelected,
        'is-active': isActive || !!rest.onClick,
        'is-foldable': isFoldable,
        'is-collapsed': isFoldable && !expanded,
        'is-expanded': expanded,
      })}
    >
      {title && (
        <div
          className="sub-isle-title"
          onClick={isFoldable ? toggleExpanded : undefined}
          onKeyDown={isFoldable ? handleTitleKeyDown : undefined}
          role={isFoldable ? 'button' : undefined}
          tabIndex={isFoldable ? 0 : undefined}
        >
          {title}
          {isFoldable && <ExpandMore className="sub-isle-expand-icon" />}
        </div>
      )}
      {subtitle && (
        <div
          className={classNames('sub-isle-subtitle', {
            'cursor-pointer': isFoldable,
          })}
          onClick={isFoldable ? toggleExpanded : undefined}
        >
          {subtitle}
        </div>
      )}
      {isFoldable ? <Collapse in={expanded}>{children}</Collapse> : children}
    </div>
  );
};

export default SubIsle;
