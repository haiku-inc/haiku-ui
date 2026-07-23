import type { CSSProperties, FC, MouseEventHandler, PropsWithChildren, ReactNode, Ref } from 'react';

import SkeletonBlock from '@/ui/SkeletonBlock';
import Text from '@/ui/Text';
import classNames from 'classnames';
import './styles.scss';

interface Props {
  id?: string;
  isLoading?: boolean;
  isExternalLink?: boolean;
  isHighlighted?: boolean;
  isActive?: boolean;
  className?: string;
  title?: string | number | ReactNode;
  category?: string | number | ReactNode;
  subtitle?: string | number | ReactNode;
  description?: string | ReactNode;
  ref?: Ref<HTMLDivElement>;
  onClick?: MouseEventHandler<HTMLDivElement>;
  style?: CSSProperties;
}

const Isle: FC<PropsWithChildren<Props>> = ({
  id,
  isExternalLink,
  isHighlighted,
  children,
  isActive,
  isLoading,
  className,
  title,
  subtitle,
  category,
  description,
  ...rest
}) => {
  if (isLoading) {
    return (
      <div
        {...rest}
        className={classNames('isle-box', className, { 'is-active': isActive, 'rounded-xl!': isExternalLink })}
      >
        {isExternalLink && <div className="external-link-marker">↗</div>}
        <SkeletonBlock width="100%" height="100%" />
      </div>
    );
  }
  return (
    <div
      {...rest}
      className={classNames('isle-box p-2 sm:p-4', className, {
        'is-active': isActive,
        'rounded-xl!': isExternalLink,
        'border-highlight-2': isHighlighted,
      })}
    >
      {!!id && <a id={id} />}
      {isExternalLink && <div className="external-link-marker">↗</div>}
      {(subtitle !== undefined || category !== undefined || title !== undefined || description !== undefined) && (
        <div className="flex flex-col">
          {(subtitle !== undefined || category !== undefined) && (
            <div className="flex gap-2 items-baseline">
              {category !== undefined && <span className="caption text-xs">{category}</span>}
              {subtitle !== undefined && <span className="subtitle ">{subtitle}</span>}
            </div>
          )}
          {title !== undefined && <Text.HeadingIsle className="mt-0!">{title}</Text.HeadingIsle>}
          {description !== undefined && (
            <div>
              <span className="description">{description}</span>
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default Isle;
