import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';

interface Props {
  className?: string;
}
const HeadingPage: FC<PropsWithChildren<Props>> = ({ children, className, ...props }) => {
  return (
    <h3 {...props} className={classNames('text-block-h3', className)}>
      {children}
    </h3>
  );
};

export default HeadingPage;
