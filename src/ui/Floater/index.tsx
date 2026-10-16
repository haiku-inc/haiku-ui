import { Backdrop, Popper } from '@mui/material';
import classNames from 'classnames';
import type { FC, HTMLAttributes, MouseEvent, PropsWithChildren, ReactElement } from 'react';
import { useState } from 'react';
import Item from './Item';
import './styles.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  menuClassName?: string;
  onClose?: () => void;
  onSearchChange?: (value: string) => void;
  onSearchEnter?: (value: string) => void;
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
  onSearchChange,
  onSearchEnter,
  disabled,
  ...rest
}) => {
  // State rather than a ref, so a menu that is open on first render re-renders once its anchor exists.
  const [anchor, setAnchor] = useState<HTMLDivElement | null>(null);

  const [isSelfOpen, setIsSelfOpen] = useState(false);

  const handleClose = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    if (isSelfControlled) {
      setIsSelfOpen(false);
    }
    onClose?.();
  };

  const open = Boolean(isOpen || isSelfOpen);
  // A native modal <dialog> sits in the browser's top layer and makes the rest of the page inert, so a
  // menu portalled to <body> would be drawn underneath it and could not be clicked. Opened from inside
  // one, the menu renders into that dialog instead, positioned `fixed` so the dialog's overflow does
  // not clip it.
  const dialog = open ? (anchor?.closest('dialog') ?? undefined) : undefined;

  return (
    <>
      <div
        ref={setAnchor}
        className={classNames('floater-anchor', className, { disabled })}
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
        open={open}
        onClick={handleClose}
        sx={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'transparent', // Fully invisible
          zIndex: 1398, // Sits right behind the popper content
        }}
      />
      <Popper
        open={open}
        anchorEl={anchor}
        container={dialog}
        popperOptions={dialog ? { strategy: 'fixed' } : undefined}
        role={undefined}
        placement="bottom-start"
        className="z-1399"
        onClick={(e) => e.stopPropagation()}
      >
        {!!onSearchChange && (
          <div className="floater-search-box">
            <input
              type="text"
              autoFocus
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSearchEnter?.(e.currentTarget.value);
                  setIsSelfOpen(false);
                }
                if (e.key === 'Escape' && isSelfControlled) {
                  setIsSelfOpen(false);
                }
              }}
              placeholder="Search..."
            />
          </div>
        )}
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
