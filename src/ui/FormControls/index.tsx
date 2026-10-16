import classNames from 'classnames';
import {
  useEffect,
  useId,
  useState,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type Ref,
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
