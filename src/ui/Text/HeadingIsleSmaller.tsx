import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';

interface Props {
  className?: string;
  inline?: boolean;
}
const HeadingIsleSmaller: FC<PropsWithChildren<Props>> = ({ children, className, inline, ...props }) => {
  return (
    <h6 {...props} className={classNames('text-block-h6', className, { inline: inline })}>
      {children}
    </h6>
  );
};

export default HeadingIsleSmaller;
