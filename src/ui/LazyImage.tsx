import classNames from 'classnames';
import type { FC } from 'react';
import { useState } from 'react';

interface Props {
  url: string;
  placeholder: string;
  width?: number;
  height?: number;
  className?: string;
}
const LazyImage: FC<Props> = ({ url, placeholder, width, height, className }) => {
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);

  return (
    <img
      src={url}
      className={classNames('z-1', { 'bg-none!': isLogoLoaded }, className)}
      style={{
        backgroundImage: `url(${placeholder})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
      }}
      onLoad={() => setIsLogoLoaded(true)}
    />
  );
};

export default LazyImage;
