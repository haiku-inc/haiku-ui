import { useCallback, useEffect, useState } from 'react';

interface UseInViewOptions {
  rootMargin?: string;
  threshold?: number;
}

/**
 * Hook that returns whether an element is in (or near) the viewport.
 * Uses IntersectionObserver. Attach ref to a sentinel element.
 */
export function useInView(options: UseInViewOptions = {}) {
  const { rootMargin = '200px', threshold = 0 } = options;
  const [inView, setInView] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  const setRefCallback = useCallback((node: HTMLElement | null) => {
    setRef(node);
  }, []);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setInView(entry.isIntersecting);
        });
      },
      { rootMargin, threshold },
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, rootMargin, threshold]);

  return { ref: setRefCallback, inView };
}
