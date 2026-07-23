import SectionHeader from '@/ui/SectionHeader';
import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';

interface Props {
  title?: string;
  subtitle?: string;
  /** Wider column (~1320px) for data-dense HADES views (Dashboard, threat actor detail). */
  wide?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const PageContainer: FC<PropsWithChildren<Props>> = ({ children, title, subtitle, wide, fullWidth, className }) => {
  return (
    <div
      className={classNames(
        'flex flex-col gap-5 w-full mx-auto',
        { 'max-w-330  min-w-270': wide, 'max-w-5xl': !wide && !fullWidth, 'w-full': fullWidth },
        className,
      )}
    >
      {!!title && <SectionHeader title={title} subtitle={subtitle} />}
      {children}
    </div>
  );
};

export default PageContainer;
