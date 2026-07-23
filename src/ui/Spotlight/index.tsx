import type { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { useEffect, useRef, useState } from 'react';

import './styles.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean;
  className?: string;
}

const Spotlight: FC<PropsWithChildren<Props>> = ({ children }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Partial<DOMRect>>();

  useEffect(() => {
    if (overlayRef.current) {
      resizeOverlayWindow();
      window.addEventListener('resize', () => {
        resizeOverlayWindow();
      });
    }
  }, [overlayRef]);

  const resizeOverlayWindow = () => {
    const { top, left, width, height, bottom, right, x, y } = overlayRef.current!.getBoundingClientRect();
    window.scrollTo(top, 0);
    setPosition({ top, left, width, height, bottom, right, x, y });
  };

  return (
    <>
      {!!position && (
        <div
          className="spotlight-overlay"
          style={{
            clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0, ${position.left}px 0, ${position.left}px ${position.bottom}px, ${position.right}px ${position.bottom}px, ${position.right}px ${position.top}px, ${position.left}px ${position.top}px)`,
          }}
        />
      )}

      <div ref={overlayRef}>{children}</div>
    </>
  );
};

export default Spotlight;
