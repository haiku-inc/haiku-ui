import classNames from 'classnames';
import {
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type Ref,
  type SelectHTMLAttributes,
} from 'react';
import './styles.scss';

type FieldProps = { label: ReactNode; description?: ReactNode; error?: string; className?: string };
type InputProps = FieldProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'size'> & { ref?: Ref<HTMLInputElement> };

export function InputField({ label, description, error, className, id, ref, ...input }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const describedBy =
    [input['aria-describedby'], description && `${inputId}-help`, error && `${inputId}-error`]
      .filter(Boolean)
      .join(' ') || undefined;
  return (
    <div className={classNames('haiku-field', className)}>
      <label htmlFor={inputId}>{label}</label>
      <input
        {...input}
        ref={ref}
        id={inputId}
        aria-describedby={describedBy}
        aria-invalid={error ? true : input['aria-invalid']}
      />
      {description && <small id={`${inputId}-help`}>{description}</small>}
      {error && (
        <small className="haiku-field__error" id={`${inputId}-error`} role="alert">
          {error}
        </small>
      )}
    </div>
  );
}

type SelectProps = FieldProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className' | 'size' | 'children'> & {
    options: readonly { value: string; label: string; disabled?: boolean }[];
  };
export function SelectField({ label, description, error, className, options, id, ...select }: SelectProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const describedBy =
    [select['aria-describedby'], description && `${inputId}-help`, error && `${inputId}-error`]
      .filter(Boolean)
      .join(' ') || undefined;
  return (
    <div className={classNames('haiku-field', className)}>
      <label htmlFor={inputId}>{label}</label>
      <select
        {...select}
        id={inputId}
        aria-describedby={describedBy}
        aria-invalid={error ? true : select['aria-invalid']}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      {description && <small id={`${inputId}-help`}>{description}</small>}
      {error && (
        <small className="haiku-field__error" id={`${inputId}-error`} role="alert">
          {error}
        </small>
      )}
    </div>
  );
}

type MenuSelectProps = FieldProps & {
  value: string;
  options: readonly { value: string; label: string; disabled?: boolean }[];
  onValueChange: (value: string) => void;
  disabled?: boolean;
  id?: string;
};

/** A themed listbox that stays above a native modal dialog using the browser popover top layer. */
export function MenuSelectField({
  label,
  description,
  error,
  className,
  value,
  options,
  onValueChange,
  disabled = false,
  id,
}: MenuSelectProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const items = useRef<Array<HTMLButtonElement | null>>([]);
  const [open, setOpen] = useState(false);
  const selected = options.findIndex((option) => option.value === value);
  const [active, setActive] = useState(Math.max(0, selected));
  const available = options.map((option, index) => (!option.disabled ? index : -1)).filter((index) => index >= 0);
  const focusItem = (index: number) => {
    if (!available.includes(index)) return;
    setActive(index);
    items.current[index]?.focus();
  };
  const place = () => {
    if (!trigger.current || !menu.current) return;
    const rect = trigger.current.getBoundingClientRect();
    const height = Math.min(280, options.length * 44 + 12);
    const top = window.innerHeight - rect.bottom >= height + 8 ? rect.bottom + 4 : Math.max(8, rect.top - height - 4);
    menu.current.style.top = `${top}px`;
    menu.current.style.left = `${Math.max(8, Math.min(rect.left, window.innerWidth - rect.width - 8))}px`;
    menu.current.style.width = `${Math.min(rect.width, window.innerWidth - 16)}px`;
  };
  const close = (restoreFocus = false) => {
    if (menu.current?.matches(':popover-open')) menu.current.hidePopover();
    setOpen(false);
    if (restoreFocus) trigger.current?.focus();
  };
  const show = (index = selected >= 0 && available.includes(selected) ? selected : available[0]) => {
    if (disabled || index === undefined) return;
    place();
    menu.current?.showPopover();
    setOpen(true);
    setActive(index);
    requestAnimationFrame(() => items.current[index]?.focus());
  };
  useEffect(() => {
    if (!open) return;
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    return () => {
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
    };
  }, [open, options.length]);
  return (
    <div className={classNames('haiku-field haiku-menu-select', className)}>
      <label id={`${inputId}-label`} htmlFor={inputId}>
        {label}
      </label>
      <button
        ref={trigger}
        id={inputId}
        type="button"
        className="haiku-menu-select__trigger"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${inputId}-options`}
        aria-describedby={description ? `${inputId}-help` : undefined}
        aria-invalid={error ? true : undefined}
        onClick={() => (open ? close(true) : show())}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            show(event.key === 'ArrowUp' ? available.at(-1) : undefined);
          }
        }}
      >
        <span>{options[selected]?.label ?? 'Choose an option'}</span>
        <span aria-hidden="true">▾</span>
      </button>
      <div
        ref={menu}
        id={`${inputId}-options`}
        className="haiku-menu-select__menu"
        popover="auto"
        role="listbox"
        aria-labelledby={`${inputId}-label`}
        onToggle={(event) => {
          const isOpen = event.currentTarget.matches(':popover-open');
          setOpen(isOpen);
          if (!isOpen && !event.currentTarget.contains(document.activeElement)) trigger.current?.focus();
        }}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.preventDefault();
            event.stopPropagation();
            close(true);
          } else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
            event.preventDefault();
            const position = Math.max(0, available.indexOf(active));
            const next =
              event.key === 'Home'
                ? available[0]
                : event.key === 'End'
                  ? available.at(-1)
                  : available[(position + (event.key === 'ArrowDown' ? 1 : -1) + available.length) % available.length];
            if (next !== undefined) focusItem(next);
          }
        }}
      >
        {options.map((option, index) => (
          <button
            key={option.value}
            ref={(element) => {
              items.current[index] = element;
            }}
            type="button"
            role="option"
            className="haiku-menu-select__option"
            disabled={option.disabled}
            aria-selected={option.value === value}
            tabIndex={index === active ? 0 : -1}
            onFocus={() => setActive(index)}
            onClick={() => {
              onValueChange(option.value);
              close(true);
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
      {description && <small id={`${inputId}-help`}>{description}</small>}
      {error && (
        <small className="haiku-field__error" role="alert">
          {error}
        </small>
      )}
    </div>
  );
}

export function CheckboxField({ label, description, className, id, ...input }: Omit<InputProps, 'type' | 'error'>) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <div className={classNames('haiku-field haiku-field--checkbox', className)}>
      <label htmlFor={inputId}>
        <input
          {...input}
          type="checkbox"
          id={inputId}
          aria-describedby={
            [input['aria-describedby'], description && `${inputId}-help`].filter(Boolean).join(' ') || undefined
          }
        />
        <span>{label}</span>
      </label>
      {description && <small id={`${inputId}-help`}>{description}</small>}
    </div>
  );
}

export function Notice({
  tone = 'info',
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { tone?: 'info' | 'success' | 'warning' | 'error' }) {
  return (
    <div
      role={tone === 'error' ? 'alert' : undefined}
      {...rest}
      className={classNames('haiku-notice', `haiku-notice--${tone}`, className)}
    >
      {children}
    </div>
  );
}

/** Native date/time editing with an explicitly UTC value contract. Never interprets a local timezone. */
export function UtcDateTimeField({
  value,
  onValueChange,
  label,
  required,
  ...rest
}: Omit<InputProps, 'type' | 'value' | 'onChange' | 'defaultValue'> & {
  value: string;
  onValueChange: (utc: string) => void;
}) {
  const toInput = (utc: string) => (utc.endsWith('Z') ? utc.slice(0, -1) : '');
  const [draft, setDraft] = useState(() => toInput(value));
  const [error, setError] = useState('');
  useEffect(() => {
    setDraft(toInput(value));
    setError('');
  }, [value]);
  return (
    <InputField
      {...rest}
      label={label}
      required={required}
      type="datetime-local"
      step={rest.step ?? 'any'}
      value={draft}
      error={error || rest.error}
      onChange={(event) => {
        const text = event.currentTarget.value;
        setDraft(text);
        if (!text) {
          setError(required || event.currentTarget.validity.badInput ? 'Enter a complete UTC date and time.' : '');
          if (!event.currentTarget.validity.badInput) onValueChange('');
          return;
        }
        const utc = `${text}Z`;
        const millis = Date.parse(utc);
        if (!Number.isFinite(millis) || new Date(millis).toISOString().slice(0, 16) !== text.slice(0, 16)) {
          setError('Enter a valid UTC date and time.');
          return;
        }
        setError('');
        onValueChange(new Date(millis).toISOString());
      }}
    />
  );
}

export function Disclosure({
  heading,
  children,
  className,
  ...rest
}: Omit<React.DetailsHTMLAttributes<HTMLDetailsElement>, 'title'> & { heading: ReactNode }) {
  return (
    <details {...rest} className={classNames('haiku-disclosure', className)}>
      <summary>{heading}</summary>
      <div className="haiku-disclosure__body">{children}</div>
    </details>
  );
}
