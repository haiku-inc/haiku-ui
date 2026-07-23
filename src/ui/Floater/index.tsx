import { ClickAwayListener, Popper } from '@mui/material';
import classNames from 'classnames';
import type { FC, HTMLAttributes, PropsWithChildren, ReactElement } from 'react';
import { useRef, useState } from 'react';
import Item from './Item';
import './styles.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  onClose?: () => void;
  isOpen?: boolean;
  button?: ReactElement;
  isSelfControlled?: boolean;
}

const Floater: FC<PropsWithChildren<Props>> = ({ children, button, isOpen, className, isSelfControlled, ...rest }) => {
  const anchorRef = useRef<HTMLDivElement>(null);

  const [isSelfOpen, setIsSelfOpen] = useState(false);

  const handleClose = () => {
    if (isSelfControlled) {
      setIsSelfOpen(false);
    }
    rest.onClose?.();
  };

  return (
    <>
      <div
        ref={anchorRef}
        className="leading-0"
        onClick={!isSelfControlled ? undefined : () => setIsSelfOpen((prev) => !prev)}
      >
        {button}
      </div>
      <Popper
        open={isOpen || isSelfOpen}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        className="z-1399"
      >
        <ClickAwayListener onClickAway={handleClose}>
          <div
            {...rest}
            className={classNames('floater-box max-h-[60vh] overflow-auto', className)}
            onClick={!isSelfControlled ? undefined : () => setIsSelfOpen((prev) => !prev)}
          >
            {children}
          </div>
        </ClickAwayListener>
      </Popper>
    </>
  );
};

interface ICompound extends FC<PropsWithChildren<Props>> {
  Item: typeof Item;
}

(Floater as ICompound).Item = Item;

export default Floater as ICompound;
