import { random25to60, random5to25 } from '../../utils/general';
import { Skeleton } from '@mui/material';
import classNames from 'classnames';
import type { FC, HTMLAttributes, PropsWithChildren, Ref } from 'react';
import './styles.scss';

interface Props extends HTMLAttributes<HTMLSpanElement> {
  width?: string | number;
  className?: string;
  isHeader?: boolean;
  isNarrow?: boolean;
  ref?: Ref<HTMLSpanElement>;
}

const SkeletonText: FC<PropsWithChildren<Props>> = ({ ref, className, width, isHeader, isNarrow, ...rest }) => {
  return (
    <Skeleton
      ref={ref}
      animation="wave"
      variant="text"
      width={width || `${isNarrow ? random5to25() : random25to60()}%`}
      {...rest}
      className={classNames('skeleton-text', className, { 'is-header': isHeader })}
    />
  );
};

export default SkeletonText;
