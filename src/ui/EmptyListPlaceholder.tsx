import classNames from 'classnames';
import type { FC, HTMLAttributes, PropsWithChildren } from 'react';
import Text from './Text';

interface Props extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  subdescription?: string;
  className?: string;
  isError?: boolean;
  isConfirm?: boolean;
  inner?: boolean;
}

const EmptyListPlaceholder: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  isError,
  isConfirm,
  inner,
  style,
  title,
  description,
  subdescription,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={classNames('flex flex-col justify-center items-center p-5 w-full', className)}
      style={{
        backgroundColor: 'var(--background-sidebar)',
        border: '1px solid var(--border)',
        borderRadius: inner ? '8px' : '16px',
        color: isError ? 'var(--text-error)' : isConfirm ? 'var(--text-success)' : 'var(--text-primary)',
        ...style,
      }}
    >
      {!!title && (
        <div className="flex justify-center">
          <Text.HeadingIsle className={!!description || !!subdescription ? 'mb-[0.35em]' : undefined}>
            {title}
          </Text.HeadingIsle>
        </div>
      )}

      {!!description && (
        <div className="flex justify-center">
          <Text>{description}</Text>
        </div>
      )}
      {!!subdescription && (
        <div className="flex justify-center">
          <Text>{subdescription}</Text>
        </div>
      )}
      {children}
    </div>
  );
};

export default EmptyListPlaceholder;
