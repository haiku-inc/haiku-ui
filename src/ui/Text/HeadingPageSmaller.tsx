import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';

interface Props {
  className?: string;
}
const HeadingPageSmaller: FC<PropsWithChildren<Props>> = ({ children, className, ...props }) => {
  return (
    <h4 {...props} className={classNames('text-block-h4', className)}>
      {children}
    </h4>
  );
};

export default HeadingPageSmaller;
