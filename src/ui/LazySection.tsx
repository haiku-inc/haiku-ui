import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useInView } from '../hooks/useInView';
import SkeletonBlock from './SkeletonBlock';

interface LazySectionProps {
  children: ReactNode;
  placeholder?: ReactNode;
  rootMargin?: string;
  minHeight?: string | number;
  className?: string;
}

/**
 * Defers rendering children until the section enters (or approaches) the viewport.
 * Reduces parallel API requests on page load by only mounting/fetching when visible.
 * Once loaded, content stays mounted to prevent snapping/glitching when scrolling.
 */
const LazySection: FC<LazySectionProps> = ({
  children,
  placeholder,
  rootMargin = '200px',
  minHeight = '240px',
  className,
}) => {
  const { ref, inView } = useInView({ rootMargin });
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    if (inView && !hasBeenInView) {
      setHasBeenInView(true);
    }
  }, [inView, hasBeenInView]);

  if (!hasBeenInView) {
    return (
      <div
        ref={ref}
        className={className}
        style={{ minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight }}
      >
        {placeholder ?? <SkeletonBlock height={minHeight} className="w-full" />}
      </div>
    );
  }

  return children;
};

export default LazySection;
