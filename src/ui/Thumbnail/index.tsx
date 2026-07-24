import type { CSSProperties, FC, PropsWithChildren } from 'react';
import defaultBadge from '../../assets/images/default-haiku-hex.png';
import Loading from '../Loading';
import SkeletonText from '../SkeletonText';
import Tooltip from '../Tooltip';
import './styles.scss';

interface Props {
  url?: string | null;
  title?: string;
  description?: string;
  badge?: number;
  height?: string;
  contain?: boolean; // Whether to use 'contain' or 'cover' for background-size
  isLoading?: boolean;
  squared?: boolean;
  style?: CSSProperties;
  className?: string;
}

const Thumbnail: FC<PropsWithChildren<Props>> = ({
  isLoading,
  height,
  contain,
  squared,
  url,
  title,
  description,
  badge,
  style = {},
  className,
  children,
}) => {
  const thumb = (
    <div
      className={`aspect-square generic-thumbnail${className ? ` ${className}` : ''}`}
      style={{
        height: height ? height : '100%',
        backgroundSize: contain ? 'contain' : 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: !isLoading ? `url(${url || defaultBadge})` : undefined,
        borderRadius: squared ? '4px' : '8px',
        ...style,
      }}
      data-before={badge}
    >
      {isLoading && <SkeletonText className="w-full! h-full! absolute! rounded-2xl!" />}
      {isLoading && <Loading relative centered />}

      {!isLoading && children && <div className="generic-thumbnail-overlay">{children}</div>}
    </div>
  );
  return (
    <>
      {!!title && (
        <Tooltip title={title} description={description}>
          {thumb}
        </Tooltip>
      )}
      {!title && thumb}
    </>
  );
};

export default Thumbnail;
