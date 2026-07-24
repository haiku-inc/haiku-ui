import type { FC } from 'react';
import SkeletonText from '../SkeletonText';

const SkeletonFraction: FC = () => {
  return (
    <div className="flex items-center justify-end">
      <SkeletonText width={15} />
      <span className="mx-1">/</span>
      <SkeletonText width={15} />
    </div>
  );
};

export default SkeletonFraction;
