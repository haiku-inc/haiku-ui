import SkeletonText from './SkeletonText';
import { defaultBackground } from '../utils/layout';
import type { FC, PropsWithChildren } from 'react';

interface Props {
  url?: string;
  isLoading?: boolean;
  squared?: boolean;
}

const CardImage: FC<PropsWithChildren<Props>> = ({ children, isLoading, squared, url }) => (
  <div
    style={{
      maxHeight: '450px',
      backgroundImage: !isLoading ? `url(${url || defaultBackground()})` : undefined,
      backgroundSize: 'cover',
      aspectRatio: '16/9',
      borderRadius: squared ? '8px' : '16px',
      position: 'relative',
    }}
  >
    {isLoading && <SkeletonText className="h-full! rounded-2xl!" />}
    {!isLoading && children}
  </div>
);

export default CardImage;
