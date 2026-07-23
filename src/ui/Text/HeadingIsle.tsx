import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}
const HeadingIsle: FC<PropsWithChildren<Props>> = ({ children, className, ...props }) => {
  return (
    <h5 {...props} className={classNames('text-block-h5', className)}>
      {children}
    </h5>
  );
};

export default HeadingIsle;
