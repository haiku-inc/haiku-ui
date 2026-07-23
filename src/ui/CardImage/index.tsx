import SkeletonText from '@/ui/SkeletonText';
import { defaultBackground } from '@/utils/layout';
import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';
import './styles.scss';

interface Props {
  url?: string;
  isLoading?: boolean;
  squared?: boolean;
  isRightTopScoop?: boolean;
}

const CardImage: FC<PropsWithChildren<Props>> = ({ children, isLoading, squared, url, isRightTopScoop }) => (
  <div
    style={{
      backgroundImage: !isLoading ? `url(${url || defaultBackground()})` : undefined,
      borderRadius: squared ? '8px' : undefined,
    }}
    className={classNames('card-image-container', { 'is-squared': squared, 'rt-scoop': isRightTopScoop })}
  >
    {isLoading && <SkeletonText className="h-full! rounded-2xl!" />}
    {!isLoading && children}
  </div>
);

export default CardImage;
