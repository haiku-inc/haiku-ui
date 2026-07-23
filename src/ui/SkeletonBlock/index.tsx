import { Skeleton } from '@mui/material';
import classNames from 'classnames';
import type { FC, HTMLAttributes, PropsWithChildren, Ref } from 'react';

interface Props extends HTMLAttributes<HTMLSpanElement> {
  width?: string | number;
  height?: string | number;
  className?: string;
  isInner?: boolean;
  ref?: Ref<HTMLSpanElement>;
}

const SkeletonBlock: FC<PropsWithChildren<Props>> = ({ ref, children, className, width, height, isInner, ...rest }) => {
  return (
    <Skeleton
      ref={ref}
      animation="wave"
      variant="rounded"
      width={width || '100%'}
      height={height || '140px'}
      {...rest}
      className={classNames(className, { 'rounded-2xl!': !isInner, 'rounded-xl!': isInner })}
    >
      {children}
    </Skeleton>
  );
};

export default SkeletonBlock;
