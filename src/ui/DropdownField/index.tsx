import { useEffect, useId, useRef, useState } from 'react';
import Button from '../Button';
import './styles.scss';

export interface DropdownFieldOption {
  value: string;
  label: string;
  disabled?: boolean;
}
interface Props {
  label: string;
  options: readonly DropdownFieldOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  description?: string;
  error?: string;
  className?: string;
}

/** Haiku selection menu using the browser top layer, without a UI framework adapter. */
export default function DropdownField({
  label,
  options,
  value,
  onChange,
  disabled,
  description,
  error,
  className = '',
}: Props) {
  const id = useId();
  const anchor = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const selected = options.findIndex((option) => option.value === value);
  const enabled = options.flatMap((option, index) => (option.disabled ? [] : [index]));
  const close = (restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) anchor.current?.querySelector('button')?.focus();
  };
  const show = (last = false) => {
    if (disabled || !enabled.length) return;
    setActive(last ? enabled.at(-1)! : enabled.includes(selected) ? selected : enabled[0]);
    setOpen(true);
  };
  useEffect(() => {
    if (!open || !panel.current) return;
    const element = panel.current;
    const position = () => {
      if (!anchor.current) return;
      const bounds = anchor.current.getBoundingClientRect();
      const width = Math.min(Math.max(bounds.width, 200), innerWidth - 16);
      const below = innerHeight - bounds.bottom - 12;
      const above = bounds.top - 12;
      const useAbove = below < 220 && above > below;
      Object.assign(element.style, {
        width: `${width}px`,
        left: `${Math.max(8, Math.min(bounds.left, innerWidth - width - 8))}px`,
        top: useAbove ? 'auto' : `${bounds.bottom + 4}px`,
        bottom: useAbove ? `${innerHeight - bounds.top + 4}px` : 'auto',
        maxHeight: `${Math.max(80, Math.min(360, useAbove ? above : below))}px`,
      });
    };
    element.showPopover?.();
    position();
    element.querySelector<HTMLElement>('[tabindex="0"]')?.focus();
    window.addEventListener('resize', position);
    window.addEventListener('scroll', position, true);
    return () => {
      if (element.isConnected) element.hidePopover?.();
      window.removeEventListener('resize', position);
      window.removeEventListener('scroll', position, true);
    };
  }, [open]);
  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);
  return (
    <div className={`haiku-dropdown ${className}`}>
      <span id={`${id}-label`} className="haiku-dropdown__label">
        {label}
      </span>
      <div ref={anchor}>
        <Button.Primary
          type="button"
          className="haiku-dropdown__trigger"
          disabled={disabled}
          role="combobox"
          aria-label={label}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={open ? `${id}-list` : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={description || error ? `${id}-help` : undefined}
          onClick={() => (open ? close() : show())}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
              event.preventDefault();
              show(event.key === 'ArrowUp');
            }
          }}
        >
          <span>{options[selected]?.label ?? 'Choose an option'}</span>
          <span aria-hidden="true">▾</span>
        </Button.Primary>
      </div>
      {open && (
        <div
          ref={panel}
          popover="auto"
          role="listbox"
          id={`${id}-list`}
          aria-labelledby={`${id}-label`}
          className="haiku-dropdown__menu"
          onToggle={(event) => {
            if (event.newState === 'closed') setOpen(false);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              event.preventDefault();
              close();
            } else if (event.key === 'Tab') close(false);
            else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
              event.preventDefault();
              const offset = Math.max(0, enabled.indexOf(active));
              const next =
                event.key === 'Home'
                  ? enabled[0]
                  : event.key === 'End'
                    ? enabled.at(-1)!
                    : enabled[(offset + (event.key === 'ArrowDown' ? 1 : -1) + enabled.length) % enabled.length];
              setActive(next);
              document.getElementById(`${id}-option-${next}`)?.focus();
            }
          }}
        >
          {options.map((option, index) => (
            <button
              type="button"
              role="option"
              key={option.value}
              id={`${id}-option-${index}`}
              aria-selected={value === option.value}
              aria-disabled={option.disabled || undefined}
              disabled={option.disabled}
              tabIndex={active === index ? 0 : -1}
              onFocus={() => setActive(index)}
              onClick={() => {
                if (!option.disabled) {
                  onChange(option.value);
                  close();
                }
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
      {(description || error) && (
        <small id={`${id}-help`} role={error ? 'alert' : undefined}>
          {error || description}
        </small>
      )}
    </div>
  );
}
