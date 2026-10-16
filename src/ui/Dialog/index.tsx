import classNames from 'classnames';
import { useId, useLayoutEffect, useRef, type ReactNode } from 'react';
import Button from '../Button';
import './styles.scss';

export interface DialogProps {
  open: boolean;
  title: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
  onClose: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  descriptionId?: string;
}

/** Native modal top layer: the browser owns focus containment, background inertness and focus return. */
export default function Dialog({
  open,
  title,
  children,
  actions,
  onClose,
  size = 'md',
  className,
  descriptionId,
}: DialogProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const backdropPointer = useRef(false);
  useLayoutEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const restoreFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
    return () => {
      const hadFocus = element.contains(document.activeElement) || document.activeElement === document.body;
      if (element.open) element.close();
      if (hadFocus && restoreFocus?.isConnected) restoreFocus.focus();
    };
  }, [open]);
  const isBackdrop = (event: React.PointerEvent<HTMLDialogElement>) => {
    if (event.target !== event.currentTarget) return false;
    const box = event.currentTarget.getBoundingClientRect();
    return (
      event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom
    );
  };
  return (
    <dialog
      ref={dialog}
      className={classNames('haiku-dialog', `haiku-dialog--${size}`, className)}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      aria-modal="true"
      onKeyDown={(event) => {
        if (event.key === 'Escape') event.stopPropagation();
      }}
      onCancel={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClose();
      }}
      onPointerDown={(event) => {
        backdropPointer.current = isBackdrop(event);
      }}
      onPointerUp={(event) => {
        if (backdropPointer.current && isBackdrop(event)) onClose();
        backdropPointer.current = false;
      }}
    >
      <header className="haiku-dialog__header">
        <h2 id={titleId}>{title}</h2>
        <Button type="button" className="haiku-dialog__close" aria-label="Close dialog" onClick={onClose}>
          <span aria-hidden="true">×</span>
        </Button>
      </header>
      <div className="haiku-dialog__body">{children}</div>
      {actions && <footer className="haiku-dialog__actions">{actions}</footer>}
    </dialog>
  );
}
