import classNames from 'classnames';
import type { FC, PropsWithChildren, ReactNode } from 'react';
import Isle from '../Isle';

interface Props {
  title: ReactNode;
  progress?: number;
  isLoading?: boolean;
  noWrap?: boolean;
  className?: string;
}

const SectionPill: FC<PropsWithChildren<Props>> = ({ isLoading, title, progress, className, noWrap }) => (
  <Isle
    isLoading={isLoading}
    className={classNames(
      'inverted-text-shadow w-auto! min-h-5 py-0! flex items-center font-(family-name:--font-orbitron) font-medium text-xs border-(--primary)/40! rounded-full px-3! bg-clip-padding!',
      { 'whitespace-nowrap': noWrap },
      className,
    )}
    style={
      !progress
        ? undefined
        : {
            background: `var(--background-card) linear-gradient(to right, color-mix(in oklab, var(--primary) 25%, transparent) 0%, color-mix(in oklab, var(--primary) 80%, transparent) ${progress}%, transparent ${progress}%, transparent 100%)`,
          }
    }
  >
    {title}
  </Isle>
);

export default SectionPill;
