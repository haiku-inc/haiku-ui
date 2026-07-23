import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';

interface Props {
  className?: string;
}

const TextComment: FC<PropsWithChildren<Props>> = ({ children, className, ...props }) => {
  return (
    <div {...props} className={classNames('text-block-comment not-last:mb-2', className)}>
      {children}
    </div>
  );
};

export default TextComment;
