import SkeletonBlock from '../SkeletonBlock';
import classNames from 'classnames';
import type { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { useEffect, useRef } from 'react';
import InputDebouncedSearch from './InputDebouncedSearch';
import PeriodSelector from './PeriodSelector';
import ResetButton from './ResetButton';
import './styles.scss';

const LAYOUT_NAV_HEADER_SCROLLED_HIGHT = 32; //px

interface Props extends HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean;
  isSticky?: boolean;
  className?: string;
  topStickyMargin?: number;
}

const FilterIsle: FC<PropsWithChildren<Props>> = ({
  children,
  isLoading,
  isSticky,
  topStickyMargin = 0,
  className,
  ...rest
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isSticky || !elementRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.toggleAttribute('data-stuck', entry.intersectionRatio < 1);
        });
      },
      { threshold: [1], rootMargin: `-${LAYOUT_NAV_HEADER_SCROLLED_HIGHT + topStickyMargin}px 0px 0px 0px` },
    );

    observer.observe(elementRef.current);

    return () => {
      if (!elementRef.current) return;
      observer.unobserve(elementRef.current);
    };
  }, [elementRef.current, isSticky]);

  if (isLoading) {
    return (
      <div {...rest} className={`filter-isle-box ${className || ''}`}>
        <SkeletonBlock isInner width={200} height="100%" />
        <SkeletonBlock isInner width={200} height="100%" />
        <SkeletonBlock isInner width={200} height="100%" />
        <SkeletonBlock isInner width={200} height="100%" />
      </div>
    );
  }
  return (
    // Then update the return statement:
    <div
      ref={elementRef}
      {...rest}
      className={classNames('filter-isle-box', className, { 'sticky z-1201': isSticky })}
      style={!isSticky ? undefined : { top: `${LAYOUT_NAV_HEADER_SCROLLED_HIGHT - 1}px` }}
    >
      {children}
    </div>
  );
};

interface ICompound extends FC<PropsWithChildren<Props>> {
  Search: typeof InputDebouncedSearch;
  ResetButton: typeof ResetButton;
  PeriodSelector: typeof PeriodSelector;
}

(FilterIsle as ICompound).Search = InputDebouncedSearch;
(FilterIsle as ICompound).ResetButton = ResetButton;
(FilterIsle as ICompound).PeriodSelector = PeriodSelector;

export default FilterIsle as ICompound;
