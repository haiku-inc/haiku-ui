import { Backdrop, Popper } from '@mui/material';
import classNames from 'classnames';
import type { FC, HTMLAttributes, MouseEvent, PropsWithChildren, ReactElement } from 'react';
import { useRef, useState } from 'react';
import Item from './Item';
import './styles.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  menuClassName?: string;
  onClose?: () => void;
  isOpen?: boolean;
  button?: ReactElement;
  isSelfControlled?: boolean;
  disabled?: boolean;
}

const Floater: FC<PropsWithChildren<Props>> = ({
  children,
  button,
  isOpen,
  className,
  menuClassName,
  isSelfControlled,
  onClose,
  disabled,
  ...rest
}) => {
  const anchorRef = useRef<HTMLDivElement>(null);

  const [isSelfOpen, setIsSelfOpen] = useState(false);

  const handleClose = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    if (isSelfControlled) {
      setIsSelfOpen(false);
    }
    onClose?.();
  };

  return (
    <>
      <div
        ref={anchorRef}
        className={classNames('floater-anchor', className, {disabled})}
        onClick={(e) => {
          e.stopPropagation();
          if (!disabled && isSelfControlled) {
            setIsSelfOpen((prev) => !prev);
          }
        }}
      >
        {button}
      </div>
      <Backdrop
        open={isOpen || isSelfOpen}
        onClick={handleClose}
        sx={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'transparent', // Fully invisible
          zIndex: 1398, // Sits right behind the popper content
        }}
      />
      <Popper
        open={isOpen || isSelfOpen}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        className="z-1399"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          {...rest}
          className={classNames('floater-box max-h-[60vh] overflow-auto', menuClassName)}
          onClick={!isSelfControlled ? undefined : handleClose}
        >
          {children}
        </div>
      </Popper>
    </>
  );
};

interface ICompound extends FC<PropsWithChildren<Props>> {
  Item: typeof Item;
}

(Floater as ICompound).Item = Item;

export default Floater as ICompound;
